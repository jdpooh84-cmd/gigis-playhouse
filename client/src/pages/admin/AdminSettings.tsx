/**
 * AdminSettings — /admin/settings — Feature flags and system settings
 */
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { data: flags = [] } = trpc.admin.listFeatureFlags.useQuery();
  const upsertFlag = trpc.admin.upsertFeatureFlag.useMutation();
  const utils = trpc.useUtils();

  const handleToggle = async (key: string, currentEnabled: boolean) => {
    try {
      await upsertFlag.mutateAsync({ key, enabled: !currentEnabled });
      await utils.admin.listFeatureFlags.invalidate();
      toast.success(`Feature flag "${key}" ${!currentEnabled ? "enabled" : "disabled"}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update flag");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            System Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">Feature flags and platform configuration</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" /> Feature Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            {flags.length === 0 ? (
              <div className="text-center py-8">
                <Settings className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No feature flags configured yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {flags.map((flag) => (
                  <div key={flag.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{flag.key}</p>
                      {flag.description && <p className="text-xs text-gray-500 mt-0.5">{flag.description}</p>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleToggle(flag.key, flag.enabled)} className="gap-2">
                      {flag.enabled ? (
                        <><ToggleRight className="w-5 h-5 text-green-500" /> <span className="text-green-600 text-xs font-medium">ON</span></>
                      ) : (
                        <><ToggleLeft className="w-5 h-5 text-gray-400" /> <span className="text-gray-500 text-xs font-medium">OFF</span></>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
