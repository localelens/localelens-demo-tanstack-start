# LocaleLens + TanStack Start Demo

> **Full-Featured Demo** — This is the most complete LocaleLens integration example, featuring SSR, authentication, and protected routes.

This demo shows how to integrate [LocaleLens](https://localelens.ai) with [TanStack Start](https://tanstack.com/start) to handle i18n in a full-stack React application using server-side loaders.

## Why TanStack Start + LocaleLens?

TanStack Start's server functions create a clear boundary between server and client code. This is perfect for LocaleLens because:

- **API keys stay on the server** — The LocaleLens API key never reaches the browser
- **SSR translations** — Pages render with translations already loaded (no flash of untranslated content)
- **No client-side i18n plumbing** — Translations are resolved before rendering, not at runtime in the browser
- **Caching potential** — Server-side fetches can be cached at the edge

The demo includes three languages (English, German, Spanish) to demonstrate how LocaleLens scales beyond simple bilingual setups.

### Server / Client Responsibility Split

```
┌─────────────────────────────────────────────────────────────┐
│                         SERVER                               │
├─────────────────────────────────────────────────────────────┤
│  detectLocale()      → Read cookie / Accept-Language        │
│  getTranslations()   → Fetch from LocaleLens API (with key) │
│  loadTranslations()  → Combined helper for route loaders    │
│  requireAuth()       → Check auth before rendering          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ Loader data (locale + translations)
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
├─────────────────────────────────────────────────────────────┤
│  I18nProvider        → Receives translations from loader    │
│  useTranslation()    → Access t() function                  │
│  setLocale()         → Triggers router invalidation         │
└─────────────────────────────────────────────────────────────┘
```

**Key insight:** The client never fetches translations directly. It only receives resolved strings from the server via TanStack Start route loaders.

## The Flow

### Initial Page Load (SSR)

1. Request hits the server
2. `detectLocale()` reads locale from cookie or `Accept-Language` header
3. `getTranslations()` fetches translations from LocaleLens API
4. HTML is rendered with translations already embedded
5. Client hydrates — no additional fetch needed

### Language Switch (Client)

1. User selects new language
2. `setLocaleCookie()` persists preference
3. `router.invalidate()` triggers route reload
4. Server re-runs loader with new locale
5. UI updates with new translations

## Project Structure

```
src/
├── lib/
│   ├── localelens.ts    # Server-only (API calls, locale detection)
│   ├── i18n.tsx         # Client-safe (provider + hooks)
│   └── auth.ts          # Server-only (mock auth)
├── components/
│   ├── Header.tsx
│   └── LanguageSwitcher.tsx
└── routes/
    ├── __root.tsx       # Root loader: loadTranslations()
    ├── index.tsx        # Public route
    └── dashboard.tsx    # Protected route (requires auth)
```

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Landing page with translations |
| `/dashboard` | Protected | Requires authentication, same i18n setup |

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment:

```bash
cp .env.example .env
```

Add your LocaleLens credentials:

```
LOCALELENS_PROJECT_ID=your_project_id
LOCALELENS_API_KEY=your_api_key
```

> **Note:** The API key is only used in server functions and is never exposed to the client.

3. Run:

```bash
pnpm dev
```

## Adapting to Your App

### Add translations to a route

Translations are loaded in the root layout, so all routes have access:

```tsx
import { useTranslation } from '../lib/i18n'

function MyPage() {
  const t = useTranslation()
  // Missing keys return the key itself by default
  return <h1>{t('my.page.title')}</h1>
}
```

### Protect a route

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '../lib/auth'

export const Route = createFileRoute('/admin')({
  beforeLoad: () => requireAuth(),
  component: AdminPage,
})
```

### Change supported locales

Edit `LOCALES` in `src/lib/localelens.ts`:

```ts
export const LOCALES = ['en', 'de', 'fr', 'es'] as const
```

## Optional: Import Demo Translations into LocaleLens

This repository includes `docs/localelens-demo-translations.json`, which can be imported into a new LocaleLens project to instantly populate all demo translations.

This file exists **only to make the demo easy to reproduce**.

In a real application:
- Translation keys usually originate from your codebase
- Translations are managed in LocaleLens
- This file is **not** kept in sync or checked into production repos

After importing, the LocaleLens dashboard will match what the demo renders.

## What This Demo Intentionally Does Not Cover

- Client-side translation fetching
- JSON-based i18n files bundled at build time
- Build-time key extraction
- Browser-stored API keys

This demo focuses on server-driven translations with clear server/client boundaries.

## Learn More

- [LocaleLens Documentation](https://localelens.ai/docs)
- [TanStack Start Documentation](https://tanstack.com/start)
