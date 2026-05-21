export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-72">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nombre o categoría..."
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-slate-400 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  )
}
