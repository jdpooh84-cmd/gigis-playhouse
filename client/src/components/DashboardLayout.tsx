import { Link, useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { Home, Users, Tv, BarChart3, FileText, Bell, Settings, LogOut, Play, Crown } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/channels', icon: Tv, label: 'Channels' },
  { href: '/dashboard/compliance', icon: FileText, label: 'Compliance' },
  { href: '/dashboard/alerts', icon: Bell, label: 'Alerts' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const [location] = useLocation();
  const profile = useStore((s) => s.currentProfile);
  const alerts = useStore((s) => s.alerts);
  const childList = useStore((s) => s.children);
  const logout = useStore((s) => s.logout);
  const unreadAlerts = alerts.filter((a) => !a.read).length;

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#E5E5E0]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🐱</span>
            <span className="font-black text-lg text-[#7C3AED] hidden sm:inline" style={{ fontFamily: 'var(--font-display)' }}>Gigi's Playhouse</span>
          </Link>
          <div className="flex items-center gap-3">
            {profile?.plan_type === 'free' && (
              <Link href="/dashboard/upgrade" className="hidden sm:inline-flex items-center gap-1.5 bg-[#FBBF24] text-[#1C1B2E] rounded-full px-3 py-1.5 text-xs font-black" style={{ fontFamily: 'var(--font-display)' }}>
                <Crown className="w-3.5 h-3.5" /> Upgrade
              </Link>
            )}
            {childList.length > 0 && (
              <Link href={`/learn/${childList[0].id}`} className="inline-flex items-center gap-1.5 bg-[#7C3AED] text-white rounded-full px-3 py-1.5 text-xs font-bold">
                <Play className="w-3.5 h-3.5" /> Learn
              </Link>
            )}
            <Link href="/dashboard/alerts" className="relative p-2">
              <Bell className="w-5 h-5 text-[#555]" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#F72585] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{unreadAlerts}</span>
              )}
            </Link>
            <button onClick={() => { logout(); window.location.href = '/'; }} className="p-2 text-[#888] hover:text-[#555]" title="Log out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - desktop */}
        <aside className="hidden md:flex flex-col w-56 bg-white border-r-2 border-[#E5E5E0] min-h-[calc(100vh-56px)] sticky top-14 p-4 gap-1">
          {NAV_ITEMS.map((item) => {
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'text-[#555] hover:bg-[#F5F5F0]'}`}>
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.label === 'Alerts' && unreadAlerts > 0 && (
                  <span className="ml-auto bg-[#F72585] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{unreadAlerts}</span>
                )}
              </Link>
            );
          })}
          <div className="mt-auto pt-4 border-t border-[#E5E5E0]">
            <div className="text-xs text-[#888] px-3">
              <p className="font-bold capitalize">{profile?.plan_type} Plan</p>
              <p>{profile?.email}</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 max-w-5xl">
          {title && (
            <h1 className="text-2xl md:text-3xl font-black text-[#1C1B2E] mb-6" style={{ fontFamily: 'var(--font-display)' }}>{title}</h1>
          )}
          {children}
        </main>
      </div>

      {/* Bottom nav - mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#E5E5E0] z-50">
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-2 py-1 ${active ? 'text-[#7C3AED]' : 'text-[#888]'}`}>
                <div className="relative">
                  <item.icon className="w-5 h-5" />
                  {item.label === 'Alerts' && unreadAlerts > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#F72585] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">{unreadAlerts}</span>
                  )}
                </div>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
