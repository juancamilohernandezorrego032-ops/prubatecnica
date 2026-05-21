import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  {
    label: 'Inventario',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    active: true,
  },
]

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-700">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            EC
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-white">E-Commerce</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                item.active
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-slate-700">
          <button
            onClick={toggleTheme}
            className="mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
          >
            {theme === 'dark' ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          </button>

          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-white">{user?.username}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Administrador</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 cursor-pointer"
              title="Cerrar sesión"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
