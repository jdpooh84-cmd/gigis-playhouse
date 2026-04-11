/**
 * AdminLayout — Persistent sidebar layout for admin panel
 * Design: Clean, professional, data-focused
 */
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  Handshake,
  DollarSign,
  Bell,
  Settings,
  BookOpen,
  ArrowLeft,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/sponsors", label: "Sponsors", icon: Megaphone },
  { path: "/admin/affiliates", label: "Affiliates", icon: Handshake },
  { path: "/admin/revenue", label: "Revenue", icon: DollarSign },
  { path: "/admin/alerts", label: "Alerts", icon: Bell },
  { path: "/admin/settings", label: "Settings", icon: Settings },
  { path: "/admin/curriculum", label: "Learning Content", icon: BookOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
        {/* Logo area */}
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Admin Panel
              </h2>
              <p className="text-[11px] text-gray-400">Gigi's Playhouse</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path || (item.path !== "/admin" && location.startsWith(item.path));
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-4.5 h-4.5" />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Back to app */}
        <div className="p-3 border-t border-gray-700">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4" />
              Back to App
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
