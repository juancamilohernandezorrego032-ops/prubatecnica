import { useState, useEffect } from 'react'

const emptyForm = { name: '', price: '', category: '', stock: '', image: '' }

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const isEditing = Boolean(product)

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        category: product.category,
        stock: String(product.stock),
        image: product.image,
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
  }, [product])

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!form.price || Number(form.price) <= 0) newErrors.price = 'Debe ser un número positivo'
    if (!form.category.trim()) newErrors.category = 'La categoría es obligatoria'
    if (form.stock === '' || Number(form.stock) < 0) newErrors.stock = 'No puede ser negativo'
    if (!form.image.trim()) newErrors.image = 'La URL de la imagen es obligatoria'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      stock: Number(form.stock),
      image: form.image.trim(),
    })
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-200'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Precio ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={handleChange('price')}
                min="1"
                className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
                  errors.price ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-200'
                }`}
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={handleChange('stock')}
                min="0"
                className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
                  errors.stock ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-200'
                }`}
              />
              {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Categoría</label>
            <select
              value={form.category}
              onChange={handleChange('category')}
              className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
                errors.category ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-200'
              }`}
            >
              <option value="">Seleccionar categoría</option>
              <option value="Ropa">Ropa</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Hogar">Hogar</option>
              <option value="Deportes">Deportes</option>
              <option value="Libros">Libros</option>
            </select>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">URL de Imagen</label>
            <input
              type="url"
              value={form.image}
              onChange={handleChange('image')}
              placeholder="https://..."
              className={`w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 ${
                errors.image ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-200'
              }`}
            />
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 cursor-pointer"
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
