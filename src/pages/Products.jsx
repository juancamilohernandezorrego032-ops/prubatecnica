import { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch {
      setError('No se pudieron cargar los productos. Verifica que el servidor de la API esté corriendo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = products.filter((p) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  })

  const handleCreate = async (productData) => {
    try {
      const created = await createProduct(productData)
      setProducts((prev) => [...prev, created])
      setShowForm(false)
      Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: 'El producto se agregó al catálogo.',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo crear el producto.' })
    }
  }

  const handleUpdate = async (productData) => {
    try {
      const updated = await updateProduct(editingProduct.id, productData)
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      setEditingProduct(null)
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        text: 'Los cambios se guardaron correctamente.',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el producto.' })
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: 'El producto se eliminó del catálogo.',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar el producto.' })
    }
  }

  const openEdit = (product) => {
    setEditingProduct(product)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Inventario</h1>
          <p className="text-sm text-slate-500">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} en total
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98] cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Producto
        </button>
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 py-16 text-center">
          <p className="text-slate-500">
            {search ? 'No se encontraron productos con ese criterio.' : 'No hay productos en el inventario.'}
          </p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {(showForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={closeForm}
        />
      )}
    </div>
  )
}
