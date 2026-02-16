import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Globe, Languages, Shield, Zap } from 'lucide-react'
import { useTranslation } from '../lib/i18n'
import { login } from '../lib/auth'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const t = useTranslation()
  const router = useRouter()

  const handleTryDashboard = async () => {
    await login()
    router.navigate({ to: '/dashboard' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Languages className="w-16 h-16 md:w-20 md:h-20 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-black text-white [letter-spacing:-0.04em]">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                LocaleLens
              </span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            {t('home.tagline')}
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            {t('home.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://localelens.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
            >
              {t('home.cta')}
            </a>
            <button
              onClick={handleTryDashboard}
              className="flex items-center gap-2 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
            >
              <Shield className="w-4 h-4" />
              {t('home.try_dashboard')}
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          {t('home.how_it_works')}
        </h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('home.step_1_title')}
              </h3>
              <p className="text-gray-400">{t('home.step_1')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('home.step_2_title')}
              </h3>
              <p className="text-gray-400">{t('home.step_2')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('home.step_3_title')}
              </h3>
              <p className="text-gray-400">{t('home.step_3')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {t('home.missing_key_title')}
        </h2>
        <p className="text-gray-400 text-center mb-6">
          {t('home.missing_key_description')}
        </p>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
          <code className="text-cyan-400 text-lg">
            {t('this.key.does.not.exist')}
          </code>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <Zap className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              {t('home.feature_server_title')}
            </h3>
            <p className="text-gray-400">{t('home.feature_server_desc')}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <Globe className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              {t('home.feature_realtime_title')}
            </h3>
            <p className="text-gray-400">{t('home.feature_realtime_desc')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
