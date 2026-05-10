/**
 * i18next Configuration for Gigi's Playhouse
 * 
 * Supports 17 languages with full translations for en, es, fr.
 * Other languages are scaffolded with English fallback.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import locale files
import en from './locales/en/common.json';
import es from './locales/es/common.json';
import fr from './locales/fr/common.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

// Detect user language from localStorage or browser
function detectLanguage(): string {
  // Check localStorage preference
  const stored = localStorage.getItem('gigi-language');
  if (stored && resources[stored as keyof typeof resources]) return stored;

  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (resources[browserLang as keyof typeof resources]) return browserLang;

  return 'en';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

/**
 * Change language and persist preference.
 */
export function changeLanguage(lang: string) {
  i18n.changeLanguage(lang);
  localStorage.setItem('gigi-language', lang);
}

/**
 * Get all supported languages.
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'ht', name: 'Haitian Creole', nativeName: 'Kreyòl Ayisyen' },
];
