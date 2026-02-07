import {
  HeadContent,
  Scripts,
  Outlet,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import { I18nProvider } from '../lib/i18n'
import { loadTranslations } from '../lib/localelens'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'LocaleLens - TanStack Start Demo',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  // SSR: Detect locale and fetch translations on the server
  loader: async () => loadTranslations(),

  component: RootComponent,
})

function RootComponent() {
  const { locale, translations } = Route.useLoaderData()

  return (
    <html lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider locale={locale} translations={translations}>
          <Header />
          <Outlet />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </I18nProvider>
        <Scripts />
      </body>
    </html>
  )
}
