import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie, getRequestHeader } from '@tanstack/react-start/server'

export type Translations = Record<string, string>

export const LOCALES = ['en', 'de', 'es'] as const
export type LocaleCode = (typeof LOCALES)[number]

const LOCALE_COOKIE = 'locale'
const DEFAULT_LOCALE: LocaleCode = 'en'
const LOCALELENS_API_BASE = 'https://localelens.ai/api/v1'

/**
 * Detect locale on the server from cookie or Accept-Language header.
 * This runs during SSR to determine which translations to fetch.
 */
export const detectLocale = createServerFn({ method: 'GET' }).handler(
  async (): Promise<LocaleCode> => {
    // 1. Check cookie first (user preference)
    const cookieLocale = await getCookie(LOCALE_COOKIE)
    if (cookieLocale && LOCALES.includes(cookieLocale as LocaleCode)) {
      return cookieLocale as LocaleCode
    }

    // 2. Parse Accept-Language header
    const acceptLanguage = getRequestHeader('accept-language')
    if (acceptLanguage) {
      const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
      if (preferred && LOCALES.includes(preferred as LocaleCode)) {
        return preferred as LocaleCode
      }
    }

    return DEFAULT_LOCALE
  }
)

/**
 * Set locale preference in cookie.
 * Called when user changes language via the switcher.
 */
export const setLocaleCookie = createServerFn({ method: 'POST' }).handler(
  async (ctx): Promise<{ ok: true }> => {
    const locale = ctx.data as string
    await setCookie(LOCALE_COOKIE, locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    })
    return { ok: true }
  }
)

/**
 * Fetch translations from LocaleLens API.
 * API key stays on the server - client never sees it.
 */
export const getTranslations = createServerFn({ method: 'GET' }).handler(
  async (ctx): Promise<Translations> => {
    const locale = ctx.data as string

    const projectId = process.env.LOCALELENS_PROJECT_ID
    const apiKey = process.env.LOCALELENS_API_KEY

    if (!projectId || !apiKey) {
      console.warn('LocaleLens: Missing LOCALELENS_PROJECT_ID or LOCALELENS_API_KEY')
      return {}
    }

    const url = `${LOCALELENS_API_BASE}/projects/${projectId}/translations/${locale}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (!res.ok) {
      console.error(`LocaleLens: Failed to fetch translations for "${locale}": ${res.status}`)
      return {}
    }

    return res.json()
  }
)

/**
 * Combined loader helper: detect locale + fetch translations in one call.
 * Use this in route loaders for SSR.
 */
export async function loadTranslations() {
  const locale = await detectLocale()
  const translations = await getTranslations({ data: locale })
  return { locale, translations }
}
