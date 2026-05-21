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
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=Sin+Imagen' }}
        />
      </div>
      <div className="p-4">
        <div className="mb-1">
          <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {product.category}
          </span>
        </div>
        <h3 className="mb-2 text-sm font-semibold text-slate-800 line-clamp-2">
          {product.name}
        </h3>
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-lg font-bold text-indigo-600">
            ${Number(product.price).toLocaleString('es-CO')}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            product.stock > 10
              ? 'bg-emerald-100 text-emerald-700'
              : product.stock > 0
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
          }`}>
            {product.stock > 0 ? `${product.stock} uds.` : 'Agotado'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100 cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
