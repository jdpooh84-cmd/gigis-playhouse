/**
 * AdminUsers — /admin/users — User management with search, filter, actions
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search, Filter, MoreHorizontal, UserX, Clock,
  Mail, Shield, Trash2, Eye, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";

interface MockUser {
  id: string;
  email: string;
  name: string;
  plan: "free" | "gold_monthly" | "gold_annual" | "family";
  is_in_trial: boolean;
  trial_expired: boolean;
  children_count: number;
  signup_date: string;
  last_active: string;
  is_suspended: boolean;
}

const MOCK_USERS: MockUser[] = [
  { id: "u1", email: "sarah@family.com", name: "Sarah Johnson", plan: "gold_annual", is_in_trial: false, trial_expired: false, children_count: 2, signup_date: "2026-01-15", last_active: "2026-04-07", is_suspended: false },
  { id: "u2", email: "mike@home.com", name: "Mike Chen", plan: "gold_monthly", is_in_trial: false, trial_expired: false, children_count: 1, signup_date: "2026-02-20", last_active: "2026-04-06", is_suspended: false },
  { id: "u3", email: "jane@test.com", name: "Jane Williams", plan: "free", is_in_trial: true, trial_expired: false, children_count: 1, signup_date: "2026-04-01", last_active: "2026-04-07", is_suspended: false },
  { id: "u4", email: "tom@example.com", name: "Tom Davis", plan: "free", is_in_trial: false, trial_expired: true, children_count: 1, signup_date: "2026-03-01", last_active: "2026-03-20", is_suspended: false },
  { id: "u5", email: "lisa@school.com", name: "Lisa Brown", plan: "family", is_in_trial: false, trial_expired: false, children_count: 4, signup_date: "2026-01-05", last_active: "2026-04-07", is_suspended: false },
  { id: "u6", email: "david@mail.com", name: "David Wilson", plan: "gold_monthly", is_in_trial: false, trial_expired: false, children_count: 1, signup_date: "2026-03-10", last_active: "2026-04-05", is_suspended: true },
  { id: "u7", email: "emma@parent.com", name: "Emma Taylor", plan: "free", is_in_trial: true, trial_expired: false, children_count: 1, signup_date: "2026-04-03", last_active: "2026-04-07", is_suspended: false },
  { id: "u8", email: "chris@home.com", name: "Chris Martinez", plan: "gold_annual", is_in_trial: false, trial_expired: false, children_count: 3, signup_date: "2026-02-01", last_active: "2026-04-06", is_suspended: false },
];

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  gold_monthly: "Gold Monthly",
  gold_annual: "Gold Annual",
  family: "Family",
};

const PLAN_COLORS: Record<string, string> = {
  free: "bg-gray-100 text-gray-600",
  gold_monthly: "bg-amber-100 text-amber-700",
  gold_annual: "bg-amber-100 text-amber-700",
  family: "bg-purple-100 text-purple-700",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterTrial, setFilterTrial] = useState("all");
  const [page, setPage] = useState(1);
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const perPage = 50;

  const filtered = useMemo(() => {
    return MOCK_USERS.filter((u) => {
      const matchSearch = !search || u.email.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase());
      const matchPlan = filterPlan === "all" || u.plan === filterPlan;
      const matchTrial = filterTrial === "all" ||
        (filterTrial === "in_trial" && u.is_in_trial) ||
        (filterTrial === "expired" && u.trial_expired);
      return matchSearch && matchPlan && matchTrial;
    });
  }, [search, filterPlan, filterTrial]);

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">{MOCK_USERS.length} total users</p>
        </div>

        {/* Search & Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                >
                  <option value="all">All Plans</option>
                  <option value="free">Free</option>
                  <option value="gold_monthly">Gold Monthly</option>
                  <option value="gold_annual">Gold Annual</option>
                  <option value="family">Family</option>
                </select>
                <select
                  value={filterTrial}
                  onChange={(e) => setFilterTrial(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                >
                  <option value="all">All Trial Status</option>
                  <option value="in_trial">In Trial</option>
                  <option value="expired">Trial Expired</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Plan</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Trial</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Children</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Signup</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Last Active</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 ${user.is_suspended ? "opacity-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PLAN_COLORS[user.plan]}`}>
                        {PLAN_LABELS[user.plan]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.is_in_trial && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">In Trial</span>
                      )}
                      {user.trial_expired && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600">Expired</span>
                      )}
                      {!user.is_in_trial && !user.trial_expired && (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{user.children_count}</td>
                    <td className="px-4 py-3 text-gray-600">{user.signup_date}</td>
                    <td className="px-4 py-3 text-gray-600">{user.last_active}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative inline-block">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                        {actionMenu === user.id && (
                          <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                            <button onClick={() => { toast.info("View profile — feature coming soon"); setActionMenu(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                              <Eye className="w-3.5 h-3.5" /> View Profile
                            </button>
                            <button onClick={() => { toast.info("Password reset email sent"); setActionMenu(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5" /> Reset Password
                            </button>
                            <button onClick={() => { toast.info("Trial extended by 7 days"); setActionMenu(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" /> Extend Trial (+7 days)
                            </button>
                            <button onClick={() => { toast.info(user.is_suspended ? "Account unsuspended" : "Account suspended"); setActionMenu(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-amber-600">
                              <Shield className="w-3.5 h-3.5" /> {user.is_suspended ? "Unsuspend" : "Suspend"} Account
                            </button>
                            <button onClick={() => { toast.info("Account scheduled for deletion (30-day COPPA)"); setActionMenu(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                              <Trash2 className="w-3.5 h-3.5" /> Delete Account
                            </button>
                            <button onClick={() => { toast.info("Upgrade/downgrade — feature coming soon"); setActionMenu(null); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                              <UserX className="w-3.5 h-3.5" /> Change Plan
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
