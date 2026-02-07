import { Link } from '@tanstack/react-router'
import { Languages, Star } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'

export default function Header() {
  return (
    <header className="p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg">
      <Link to="/" className="flex items-center gap-3">
        <Languages className="w-8 h-8 text-cyan-400" />
        <span className="text-xl font-bold">LocaleLens Demo</span>
        <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
          <Star className="w-3 h-3" />
          Full-Featured Demo
        </span>
      </Link>
      <LanguageSwitcher />
    </header>
  )
}
