import Swal from 'sweetalert2'

export default function ProductTable({ products, onEdit, onDelete }) {
  const handleDelete = (product) => {
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

  if (products.length === 0) return null

  return (
    <div className="animate-fade-in overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 sm:px-6">Producto</th>
              <th className="px-4 py-3 sm:px-6">Categoría</th>
              <th className="px-4 py-3 text-right sm:px-6">Precio</th>
              <th className="px-4 py-3 text-right sm:px-6">Stock</th>
              <th className="px-4 py-3 text-right sm:px-6">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {products.map((product) => (
              <tr key={product.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                      onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=N/A' }}
                    />
                    <span className="font-medium text-slate-800 dark:text-white">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 sm:px-6">
                  <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                    {product.category}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-slate-800 sm:px-6 dark:text-white">
                  ${Number(product.price).toLocaleString('es-CO')}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right sm:px-6">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    product.stock > 10
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : product.stock > 0
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {product.stock > 0 ? product.stock : 'Agotado'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right sm:px-6">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/40 cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
