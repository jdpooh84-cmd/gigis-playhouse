/**
 * SponsorCard — Appears in YouTube Channel Hub and lesson loading screens.
 * COPPA-compliant: no tracking, no behavioral targeting.
 * Clearly labeled "Sponsored" — links only visible to parents.
 */
import { motion } from "framer-motion";
import { ExternalLink, Star, Award, Heart } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useMemo, useCallback } from "react";

const TIER_CONFIG = {
  "TIER-FRIEND": { label: "Friend", color: "amber", icon: Heart },
  "TIER-SUPPORTER": { label: "Supporter", color: "blue", icon: Star },
  "TIER-CHAMPION": { label: "Champion", color: "purple", icon: Award },
} as const;

interface SponsorCardProps {
  /** Position index in the channel grid (0-based) */
  position: number;
}

export default function SponsorCard({ position }: SponsorCardProps) {
  const { data: sponsors = [] } = trpc.sponsor.listActive.useQuery(undefined, {
    retry: false,
    staleTime: 60_000,
  });

  const sponsor = useMemo(() => {
    if (sponsors.length === 0) return null;
    return sponsors[position % sponsors.length];
  }, [sponsors, position]);

  const handleClick = useCallback(() => {
    if (sponsor?.companyWebsite) {
      window.open(sponsor.companyWebsite, "_blank", "noopener,noreferrer");
    }
  }, [sponsor]);

  if (!sponsor) return null;

  const tierCfg = TIER_CONFIG[sponsor.tierId as keyof typeof TIER_CONFIG] || TIER_CONFIG["TIER-FRIEND"];
  const TierIcon = tierCfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-2xl overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
          <TierIcon className="w-2.5 h-2.5" /> Sponsored
        </span>
      </div>

      <div className="p-5">
        {sponsor.logoUrl ? (
          <img src={sponsor.logoUrl} alt={sponsor.companyName} className="w-12 h-12 rounded-xl object-contain mb-3" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center mb-3">
            <span className="text-lg font-black text-amber-700" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {sponsor.companyName.charAt(0)}
            </span>
          </div>
        )}

        <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {sponsor.companyName}
        </h4>

        {sponsor.shortDescription && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: "'Lexend', sans-serif" }}>
            {sponsor.shortDescription}
          </p>
        )}

        {sponsor.companyWebsite && (
          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold">
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Helper: Should a sponsor card appear at this grid position?
 * Rule: Every 6th position (index 5, 11, 17, ...) shows a sponsor card.
 */
export function shouldShowSponsorCard(index: number): boolean {
  return (index + 1) % 6 === 0;
}
