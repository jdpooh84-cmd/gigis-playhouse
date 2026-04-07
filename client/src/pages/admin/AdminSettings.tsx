/**
 * AdminSettings — /admin/settings — Feature flags editable with 60s cascade
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, RefreshCw, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { useAdminStore } from "@/lib/admin-store";
import { toast } from "sonner";

export default function AdminSettings() {
  const settings = useAdminStore((s) => s.settings);
  const updateSetting = useAdminStore((s) => s.updateSetting);
  const addAuditLog = useAdminStore((s) => s.addAuditLog);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const getEditValue = (key: string) => editValues[key] ?? settings.find((s) => s.key === key)?.value ?? "";

  const handleSave = (key: string) => {
    const newValue = editValues[key];
    if (newValue !== undefined) {
      updateSetting(key, newValue);
      addAuditLog("setting_changed", `Setting ${key} changed to ${newValue}`);
      setEditValues((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      toast.success(`Setting "${key}" updated. Changes apply within 60 seconds.`);
    }
  };

  const isBooleanSetting = (value: string) => value === "true" || value === "false";
  const isDangerSetting = (key: string) =>
    ["maintenance_mode", "new_signups_enabled", "trial_duration_days"].includes(key);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Feature Flags & Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Changes take effect within 60 seconds across all active sessions
          </p>
        </div>

        <Card className="border-0 shadow-sm border-l-4 border-l-amber-400">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-sm text-gray-600">
              Feature flags control live application behavior. Changes are logged to the audit trail.
              Dangerous settings are highlighted in red.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {settings.map((setting, i) => {
            const isBool = isBooleanSetting(setting.value);
            const isDanger = isDangerSetting(setting.key);
            const currentValue = getEditValue(setting.key);
            const hasChanged = editValues[setting.key] !== undefined;

            return (
              <motion.div
                key={setting.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className={`border-0 shadow-sm ${isDanger ? "ring-1 ring-red-200" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                            {setting.key}
                          </code>
                          {isDanger && (
                            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded font-medium">
                              Sensitive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{setting.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Last updated: {new Date(setting.updated_at).toLocaleString()}
                          {setting.updated_by && ` by ${setting.updated_by}`}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isBool ? (
                          <button
                            onClick={() => {
                              const newVal = currentValue === "true" ? "false" : "true";
                              setEditValues((prev) => ({ ...prev, [setting.key]: newVal }));
                            }}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              currentValue === "true" ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                currentValue === "true" ? "translate-x-6" : "translate-x-0.5"
                              }`}
                            />
                          </button>
                        ) : (
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => setEditValues((prev) => ({ ...prev, [setting.key]: e.target.value }))}
                            className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 text-right"
                          />
                        )}

                        {hasChanged && (
                          <Button
                            size="sm"
                            onClick={() => handleSave(setting.key)}
                            className="gap-1 bg-purple-600 hover:bg-purple-700 text-white h-8"
                          >
                            <Save className="w-3.5 h-3.5" /> Save
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
