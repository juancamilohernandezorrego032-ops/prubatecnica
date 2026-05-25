import { useState, useEffect } from 'react'

const emptyForm = { name: '', price: '', category: '', stock: '', image: '' }

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [imageError, setImageError] = useState(false)
  const isEditing = Boolean(product)

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    setImageError(false)
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
    if (field === 'image') setImageError(false)
  }

  const inputClass = (field) =>
    `w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-white ${
      errors[field]
        ? 'border-red-400 focus:ring-red-200 dark:border-red-500'
        : 'border-slate-300 focus:border-indigo-400 focus:ring-indigo-200 dark:border-slate-600 dark:focus:border-indigo-500'
    }`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="animate-scale-in w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onCancel} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 cursor-pointer">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              className={inputClass('name')}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Precio ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={handleChange('price')}
                min="1"
                className={inputClass('price')}
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Stock</label>
              <input
                type="number"
                value={form.stock}
                onChange={handleChange('stock')}
                min="0"
                className={inputClass('stock')}
              />
              {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Categoría</label>
            <select
              value={form.category}
              onChange={handleChange('category')}
              className={inputClass('category')}
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
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">URL de Imagen</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="url"
                  value={form.image}
                  onChange={handleChange('image')}
                  placeholder="https://..."
                  className={inputClass('image')}
                />
                {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
              </div>
              {form.image && (
                <div className="flex-shrink-0">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-10 w-10 rounded-lg border border-slate-200 object-cover dark:border-slate-600"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                </div>
              )}
            </div>
            {imageError && form.image && (
              <p className="mt-1 text-xs text-amber-500">No se pudo cargar la imagen de previsualización</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98] cursor-pointer"
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
