import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <h1 className="text-7xl font-bold text-indigo-600 dark:text-indigo-400">404</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Página no encontrada</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
