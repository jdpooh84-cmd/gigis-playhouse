/**
 * AffiliateLink — Displays affiliate partner links with FTC disclosure
 * Placed in: parent_dashboard, upgrade_page, about_page
 * COPPA-compliant: only shown to parents, never in child views
 */
import { ExternalLink, Info } from "lucide-react";
import { useAdminStore, type AffiliatePartner } from "@/lib/admin-store";
import { useMemo, useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AffiliateLinkProps {
  /** Which page this is being placed on */
  placement: string;
  /** Max number of affiliate links to show */
  maxLinks?: number;
  /** Compact mode for sidebar/footer placement */
  compact?: boolean;
}

export default function AffiliateLink({ placement, maxLinks = 2, compact = false }: AffiliateLinkProps) {
  const affiliates = useAdminStore((s) => s.affiliates);
  const incrementClicks = useAdminStore((s) => s.incrementAffiliateClicks);
  const settingsEnabled = useAdminStore((s) => s.settings.find((st) => st.key === "affiliate_links_enabled")?.value === "true");

  const eligibleAffiliates = useMemo(
    () =>
      affiliates
        .filter((a) => a.status === "active" && a.placement_location.includes(placement))
        .slice(0, maxLinks),
    [affiliates, placement, maxLinks]
  );

  const handleClick = useCallback(
    (af: AffiliatePartner) => {
      incrementClicks(af.id);
      window.open(af.affiliate_link, "_blank", "noopener,noreferrer");
    },
    [incrementClicks]
  );

  if (!settingsEnabled || eligibleAffiliates.length === 0) return null;

  if (compact) {
    return (
      <div className="space-y-2">
        {eligibleAffiliates.map((af) => (
          <button
            key={af.id}
            onClick={() => handleClick(af)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors group"
          >
            <ExternalLink className="w-3 h-3 shrink-0" />
            <span className="truncate">{af.display_text}</span>
          </button>
        ))}
        <p className="text-[10px] text-gray-400 italic">
          Affiliate links — we may earn a commission at no cost to you.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Recommended Resources
        </h4>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-3.5 h-3.5 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs max-w-[200px]">
              These are affiliate links. Gigi's Playhouse may earn a small commission if you make a purchase, at no extra cost to you.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      {eligibleAffiliates.map((af) => (
        <button
          key={af.id}
          onClick={() => handleClick(af)}
          className="w-full flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-purple-600">
              {af.partner_name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
              {af.display_text}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{af.description}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 shrink-0 mt-1" />
        </button>
      ))}

      <p className="text-[10px] text-gray-400 italic text-center">
        Affiliate disclosure: We may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
