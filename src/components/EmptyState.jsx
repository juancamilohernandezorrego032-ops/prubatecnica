export default function EmptyState({ search, onAdd }) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white/50 px-6 py-16 dark:border-slate-600 dark:bg-slate-800/50">
      <svg className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <p className="mb-1 text-base font-medium text-slate-600 dark:text-slate-400">
        {search ? 'Sin resultados' : 'Inventario vacío'}
      </p>
      <p className="mb-6 text-sm text-slate-400 dark:text-slate-500">
        {search
          ? `No hay productos que coincidan con "${search}"`
          : 'Aún no hay productos registrados. Crea el primero.'}
      </p>
      {!search && (
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98] cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Producto
        </button>
      )}
    </div>
  )
}
