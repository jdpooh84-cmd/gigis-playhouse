/**
 * AdminAlerts — /admin/alerts — System alerts
 */
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";

export default function AdminAlerts() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            System Alerts
          </h1>
          <p className="text-sm text-gray-500 mt-1">Monitor system events and notifications</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No alerts</p>
            <p className="text-gray-400 text-sm mt-1">System is running smoothly</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
