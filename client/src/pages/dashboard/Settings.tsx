/**
 * Settings Page — Account, audio, preferences, data management
 * Design: "Playroom Canvas" — Bold Geometric Toybox
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import DashboardLayout from "@/components/DashboardLayout";
import { Volume2, VolumeX, Globe, Shield, Trash2, Download, Bell, Moon, Sun, Clock } from "lucide-react";
import { toast } from "sonner";

interface GigiSettings {
  playThemeSong: boolean;
  playSFX: boolean;
  playCharacterVoices: boolean;
  language: string;
  movementBreakInterval: number;
  shortDayMode: boolean;
  darkMode: boolean;
  notifications: boolean;
}

const DEFAULT_SETTINGS: GigiSettings = {
  playThemeSong: true,
  playSFX: true,
  playCharacterVoices: true,
  language: "en",
  movementBreakInterval: 20,
  shortDayMode: false,
  darkMode: false,
  notifications: true,
};

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "tl", name: "Tagalog" },
  { code: "sw", name: "Kiswahili" },
];

export default function Settings() {
  const profile = useStore((s) => s.currentProfile);
  const [settings, setSettings] = useState<GigiSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const raw = localStorage.getItem("gigi-settings");
    if (raw) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
      } catch { /* ignore */ }
    }
  }, []);

  const updateSetting = <K extends keyof GigiSettings>(key: K, value: GigiSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem("gigi-settings", JSON.stringify(updated));
    toast.success("Setting updated");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        {/* Account Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6"
        >
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Shield className="w-5 h-5 text-purple-600" />
            Account
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-bold text-gray-900 text-sm">Email</p>
                <p className="text-gray-500 text-sm">{profile?.email || "parent@example.com"}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-bold text-gray-900 text-sm">Plan</p>
                <p className="text-gray-500 text-sm capitalize">{profile?.plan_type || "free"}</p>
              </div>
              <a href="/upgrade" className="text-sm font-bold text-purple-600 hover:text-purple-700">
                Upgrade
              </a>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">Data Retention</p>
                <p className="text-gray-500 text-sm">24 months (COPPA compliant)</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Audio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6"
        >
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Volume2 className="w-5 h-5 text-purple-600" />
            Audio & Sound
          </h2>
          <div className="space-y-4">
            <ToggleRow
              icon={settings.playThemeSong ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              label="Play theme song on open"
              description="The Gigi's Playhouse theme plays once when you open the app"
              checked={settings.playThemeSong}
              onChange={(v) => updateSetting("playThemeSong", v)}
            />
            <ToggleRow
              icon={<Volume2 className="w-4 h-4" />}
              label="Sound effects"
              description="Correct/wrong sounds, celebrations, level-up chimes"
              checked={settings.playSFX}
              onChange={(v) => updateSetting("playSFX", v)}
            />
            <ToggleRow
              icon={<Volume2 className="w-4 h-4" />}
              label="Character voices"
              description="Gigi and friends speak instructions and encouragement"
              checked={settings.playCharacterVoices}
              onChange={(v) => updateSetting("playCharacterVoices", v)}
            />
          </div>
        </motion.section>

        {/* Learning Preferences */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6"
        >
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Globe className="w-5 h-5 text-purple-600" />
            Learning Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-bold text-gray-900 text-sm">Language</p>
                <p className="text-gray-500 text-xs">Changes curriculum language for all children</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => updateSetting("language", e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Movement break interval
                </p>
                <p className="text-gray-500 text-xs">Minutes between movement breaks</p>
              </div>
              <select
                value={settings.movementBreakInterval}
                onChange={(e) => updateSetting("movementBreakInterval", Number(e.target.value))}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
                <option value={20}>20 min (default)</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
              </select>
            </div>
            <ToggleRow
              icon={<Moon className="w-4 h-4" />}
              label="Short Day Mode"
              description="Halves activity steps for lighter learning days"
              checked={settings.shortDayMode}
              onChange={(v) => updateSetting("shortDayMode", v)}
            />
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6"
        >
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Bell className="w-5 h-5 text-purple-600" />
            Notifications
          </h2>
          <ToggleRow
            icon={<Bell className="w-4 h-4" />}
            label="Push notifications"
            description="Quiz alerts, progress milestones, trial reminders"
            checked={settings.notifications}
            onChange={(v) => updateSetting("notifications", v)}
          />
        </motion.section>

        {/* Appearance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6"
        >
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Sun className="w-5 h-5 text-purple-600" />
            Appearance
          </h2>
          <ToggleRow
            icon={settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            label="Dark mode"
            description="Easier on the eyes for late-night parent sessions"
            checked={settings.darkMode}
            onChange={(v) => updateSetting("darkMode", v)}
          />
        </motion.section>

        {/* Data & Privacy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6"
        >
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Shield className="w-5 h-5 text-purple-600" />
            Data & Privacy
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => toast.success("Compliance report exported (demo)")}
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
            >
              <Download className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-bold text-gray-900 text-sm">Export all data</p>
                <p className="text-gray-500 text-xs">Download a copy of all your data (COPPA right)</p>
              </div>
            </button>
            <button
              onClick={() => toast.error("Account deletion requires confirmation via email (demo)")}
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors text-left"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-bold text-red-600 text-sm">Delete account</p>
                <p className="text-gray-500 text-xs">Permanently delete your account and all data within 30 days</p>
              </div>
            </button>
          </div>
        </motion.section>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-400 pt-4">
          Gigi's Playhouse v1.0 — Dreamz In Ink LLC — The Poole Method™
        </p>
      </div>
    </DashboardLayout>
  );
}

function ToggleRow({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-gray-400">{icon}</span>
        <div>
          <p className="font-bold text-gray-900 text-sm">{label}</p>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          checked ? "bg-purple-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
