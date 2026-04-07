/**
 * AffiliateLink — Displays affiliate partner links with FTC disclosure
 * Placed in: parent_dashboard, upgrade_page, about_page
 * COPPA-compliant: only shown to parents, never in child views
 * 
 * Currently a no-op placeholder — affiliate system not yet wired to backend.
 */

interface AffiliateLinkProps {
  placement: string;
  maxLinks?: number;
  compact?: boolean;
}

export default function AffiliateLink(_props: AffiliateLinkProps) {
  // Affiliate system not yet wired to backend — render nothing
  return null;
}
