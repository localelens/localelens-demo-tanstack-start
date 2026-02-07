import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Shield, LogOut } from 'lucide-react'
import { useTranslation } from '../lib/i18n'
import { requireAuth, logout } from '../lib/auth'

export const Route = createFileRoute('/dashboard')({
  // Protected: redirect to home if not authenticated
  beforeLoad: async () => {
    await requireAuth()
  },
  component: Dashboard,
})

function Dashboard() {
  const t = useTranslation()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-green-400" />
            <h1 className="text-3xl font-bold text-white">
              {t('dashboard.title')}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t('dashboard.logout')}
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          <p className="text-gray-300 mb-6">
            {t('dashboard.description')}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">{t('dashboard.auth_status')}:</span>
              <span className="text-green-400 font-medium">{t('dashboard.authenticated')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">{t('dashboard.translations_loaded')}:</span>
              <span className="text-cyan-400 font-medium">{t('dashboard.via_ssr')}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-green-900/20 border border-green-700/50 rounded-xl">
          <h2 className="text-lg font-semibold text-green-300 mb-3">
            {t('dashboard.protected_note_title')}
          </h2>
          <p className="text-gray-400 text-sm">
            {t('dashboard.protected_note')}
          </p>
        </div>
      </div>
    </div>
  )
}
