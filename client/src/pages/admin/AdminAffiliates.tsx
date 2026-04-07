/**
 * AdminAffiliates — /admin/affiliates — Affiliate partner management
 */
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";

export default function AdminAffiliates() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Affiliate Partners
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage affiliate partnerships and track referrals</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">Affiliate system coming soon</p>
            <p className="text-gray-400 text-sm mt-1">This feature will be available after Stripe integration</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
