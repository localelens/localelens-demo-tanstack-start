import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from '@tanstack/react-router'
import {
  type Translations,
  type LocaleCode,
  LOCALES,
  setLocaleCookie,
} from './localelens'

export { LOCALES, type LocaleCode }

interface I18nContextValue {
  locale: LocaleCode
  setLocale: (locale: LocaleCode) => void
  t: (key: string) => string
  isChanging: boolean
}

const I18nContext = createContext<I18nContextValue | null>(null)

interface I18nProviderProps {
  children: ReactNode
  locale: LocaleCode
  translations: Translations
}

/**
 * I18n Provider that receives translations from route loader.
 * No client-side fetching on mount - translations are already SSR'd.
 */
export function I18nProvider({
  children,
  locale: initialLocale,
  translations,
}: I18nProviderProps) {
  const router = useRouter()
  const [locale, setLocaleState] = useState<LocaleCode>(initialLocale)
  const [isChanging, setIsChanging] = useState(false)

  const setLocale = useCallback(async (newLocale: LocaleCode) => {
    if (newLocale === locale) return

    setIsChanging(true)
    setLocaleState(newLocale)

    // Persist preference to cookie via server function
    await setLocaleCookie({ data: newLocale })

    // Invalidate router to trigger loader re-fetch with new locale
    await router.invalidate()

    setIsChanging(false)
  }, [locale, router])

  const t = useCallback(
    (key: string): string => translations[key] ?? key,
    [translations]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isChanging }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function useTranslation() {
  const { t } = useI18n()
  return t
}
