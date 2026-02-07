import { useI18n, LOCALES } from '../lib/i18n'
import { Globe } from 'lucide-react'

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
}

export function LanguageSwitcher() {
  const { locale, setLocale, isChanging } = useI18n()

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-400" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        disabled={isChanging}
        className="bg-slate-800 border border-slate-600 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code] ?? code}
          </option>
        ))}
      </select>
    </div>
  )
}
