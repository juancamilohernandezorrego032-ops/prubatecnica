import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Login() {
  const { isAuthenticated, login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('El nombre de usuario es obligatorio')
      return
    }
    if (!pin.trim()) {
      setError('El PIN es obligatorio')
      return
    }
    setError('')
    login(username.trim())
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-100 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-sm">
        <button
          onClick={toggleTheme}
          className="mb-4 ml-auto flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
        >
          {theme === 'dark' ? (
            <>☀️ Claro</>
          ) : (
            <>🌙 Oscuro</>
          )}
        </button>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
            EC
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Panel Administrativo</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ej. admin"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="****"
              maxLength={6}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98] cursor-pointer"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Prueba técnica - Desarrollador Frontend Junior
        </p>
      </div>
    </div>
  )
}
