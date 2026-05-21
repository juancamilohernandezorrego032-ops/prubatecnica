import { useState, useEffect, useCallback } from 'react'
import Swal from 'sweetalert2'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api'
import ProductCard from '../components/ProductCard'
import ProductTable from '../components/ProductTable'
import ProductForm from '../components/ProductForm'
import SearchBar from '../components/SearchBar'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import StatCard from '../components/StatCard'

const toast = (icon, title) => {
  Swal.fire({ toast: true, position: 'top-end', icon, title, showConfirmButton: false, timer: 2500, timerProgressBar: true })
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [viewMode, setViewMode] = useState('grid')

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
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  })

  const stats = {
    total: products.length,
    totalValue: products.reduce((sum, p) => sum + Number(p.price) * Number(p.stock), 0),
    lowStock: products.filter((p) => Number(p.stock) > 0 && Number(p.stock) <= 5).length,
    categories: new Set(products.map((p) => p.category)).size,
  }

  const handleCreate = async (productData) => {
    try {
      const created = await createProduct(productData)
      setProducts((prev) => [...prev, created])
      setShowForm(false)
      toast('success', 'Producto creado exitosamente')
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo crear el producto.' })
    }
  }

  const handleUpdate = async (productData) => {
    try {
      const updated = await updateProduct(editingProduct.id, productData)
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      setEditingProduct(null)
      toast('success', 'Producto actualizado correctamente')
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el producto.' })
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      toast('success', 'Producto eliminado del catálogo')
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar el producto.' })
    }
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Inventario</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Gestiona los productos del catálogo de la tienda
        </p>
      </div>

      {!loading && !error && products.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Productos" value={stats.total} color="indigo" icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          } />
          <StatCard label="Valor Inventario" value={`$${stats.totalValue.toLocaleString('es-CO')}`} color="emerald" icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          } />
          <StatCard label="Stock Bajo" value={stats.lowStock} color="amber" icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          } />
          <StatCard label="Categorías" value={stats.categories} color="blue" icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          } />
        </div>
      )}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-slate-300 bg-white p-0.5 dark:border-slate-600 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md p-1.5 transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="Vista cuadrícula"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`rounded-md p-1.5 transition cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="Vista tabla"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
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
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {error && (
        <div className="animate-fade-in rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
          <button
            onClick={fetchProducts}
            className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState search={search} onAdd={() => setShowForm(true)} />
      )}

      {!loading && !error && filteredProducts.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(p) => setEditingProduct(p)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && viewMode === 'table' && (
        <ProductTable
          products={filteredProducts}
          onEdit={(p) => setEditingProduct(p)}
          onDelete={handleDelete}
        />
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
