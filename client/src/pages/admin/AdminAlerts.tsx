/**
 * AdminAlerts — /admin/alerts — System alerts with read/unread/archive
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Bell, CreditCard, Clock, Megaphone, Shield, BookOpen,
  Handshake, AlertTriangle, Check, Archive, Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useAdminStore, type AlertType } from "@/lib/admin-store";

const ALERT_ICONS: Record<AlertType, React.ElementType> = {
  payment_failed: CreditCard,
  trial_expired_no_upgrade: Clock,
  sponsor_cap_reached: Megaphone,
  sponsor_invoice_overdue: Megaphone,
  new_sponsor_application: Megaphone,
  coppa_deletion_request: Shield,
  high_quiz_fail_rate: BookOpen,
  new_affiliate_click_milestone: Handshake,
};

const ALERT_COLORS: Record<AlertType, string> = {
  payment_failed: "text-red-500 bg-red-50",
  trial_expired_no_upgrade: "text-amber-500 bg-amber-50",
  sponsor_cap_reached: "text-blue-500 bg-blue-50",
  sponsor_invoice_overdue: "text-red-500 bg-red-50",
  new_sponsor_application: "text-purple-500 bg-purple-50",
  coppa_deletion_request: "text-red-600 bg-red-50",
  high_quiz_fail_rate: "text-amber-600 bg-amber-50",
  new_affiliate_click_milestone: "text-green-500 bg-green-50",
};

export default function AdminAlerts() {
  const alerts = useAdminStore((s) => s.alerts);
  const markAlertRead = useAdminStore((s) => s.markAlertRead);
  const archiveAlert = useAdminStore((s) => s.archiveAlert);

  const activeAlerts = useMemo(() => alerts.filter((a) => !a.is_archived), [alerts]);
  const unreadCount = useMemo(() => activeAlerts.filter((a) => !a.is_read).length, [activeAlerts]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              System Alerts
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {activeAlerts.length} alerts — {unreadCount} unread
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => activeAlerts.filter((a) => !a.is_read).forEach((a) => markAlertRead(a.id))}
              className="gap-2"
            >
              <Check className="w-4 h-4" /> Mark All Read
            </Button>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {activeAlerts.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No active alerts</p>
                <p className="text-sm text-gray-400 mt-1">All clear! System is running smoothly.</p>
              </CardContent>
            </Card>
          ) : (
            activeAlerts.map((alert, i) => {
              const Icon = ALERT_ICONS[alert.type] || AlertTriangle;
              const colorClass = ALERT_COLORS[alert.type] || "text-gray-500 bg-gray-50";
              const [textColor, bgColor] = colorClass.split(" ");

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`border-0 shadow-sm transition-colors ${!alert.is_read ? "ring-1 ring-amber-200 bg-amber-50/30" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgColor}`}>
                          <Icon className={`w-5 h-5 ${textColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-semibold text-sm ${!alert.is_read ? "text-gray-900" : "text-gray-700"}`}>
                              {alert.title}
                            </h4>
                            {!alert.is_read && (
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">{alert.description}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(alert.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {!alert.is_read && (
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => markAlertRead(alert.id)} title="Mark as read">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => archiveAlert(alert.id)} title="Archive">
                            <Archive className="w-4 h-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
