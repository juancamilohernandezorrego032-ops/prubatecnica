import Swal from 'sweetalert2'

export default function ProductCard({ product, onEdit, onDelete }) {
  const handleDelete = () => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: `Se eliminará "${product.name}" del catálogo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(product.id)
      }
    })
  }

  return (
    <div className="animate-fade-in group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://picsum.photos/seed/${product.id}/600/450`
          }}
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
            {product.category}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            product.stock > 10
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : product.stock > 0
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {product.stock > 0 ? `${product.stock} uds.` : 'Agotado'}
          </span>
        </div>
        <h3 className="mb-2 text-sm font-semibold text-slate-800 line-clamp-2 dark:text-white">
          {product.name}
        </h3>
        <p className="mb-3 text-lg font-bold text-indigo-600 dark:text-indigo-400">
          ${Number(product.price).toLocaleString('es-CO')}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/40 cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
