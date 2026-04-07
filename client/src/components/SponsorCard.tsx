/**
 * SponsorCard — Appears in YouTube Channel Hub only
 * Shows every 6th card position. COPPA-compliant: no tracking, no behavioral targeting.
 * Clearly labeled "Sponsored" with parent-facing CTA.
 */
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useMemo, useCallback } from "react";

interface SponsorCardProps {
  /** Position index in the channel grid (0-based) */
  position: number;
}

export default function SponsorCard({ position }: SponsorCardProps) {
  const { data: sponsors = [] } = trpc.admin.listSponsors.useQuery(undefined, {
    retry: false,
    // Silently fail if user is not admin
  });

  const eligibleSponsors = useMemo(
    () => sponsors.filter((s) => s.status === "active"),
    [sponsors]
  );

  const sponsor = useMemo(() => {
    if (eligibleSponsors.length === 0) return null;
    return eligibleSponsors[position % eligibleSponsors.length];
  }, [eligibleSponsors, position]);

  const handleClick = useCallback(() => {
    if (sponsor?.ctaUrl) {
      window.open(sponsor.ctaUrl, "_blank", "noopener,noreferrer");
    }
  }, [sponsor]);

  if (!sponsor) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-2xl overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
          <Star className="w-2.5 h-2.5" /> Sponsored
        </span>
      </div>

      <div className="p-5">
        <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center mb-3">
          <span className="text-lg font-black text-amber-700" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {sponsor.companyName.charAt(0)}
          </span>
        </div>

        <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {sponsor.companyName}
        </h4>

        {sponsor.tagline && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: "'Lexend', sans-serif" }}>
            {sponsor.tagline}
          </p>
        )}

        <div className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold">
          <span>{sponsor.ctaLabel || "Learn More"}</span>
          <ExternalLink className="w-3 h-3" />
        </div>
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
