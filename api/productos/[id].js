import { getProducts, saveProducts } from '../_db.js'

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { id } = req.query

  try {
    const productos = getProducts()
    const index = productos.findIndex((p) => String(p.id) === String(id))

    if (req.method === 'GET') {
      if (index === -1) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json(productos[index])
    }

    if (req.method === 'PUT') {
      if (index === -1) return res.status(404).json({ error: 'Not found' })
      const actualizado = { ...req.body, id: String(id) }
      const updated = [...productos]
      updated[index] = actualizado
      saveProducts(updated)
      return res.status(200).json(actualizado)
    }

    if (req.method === 'DELETE') {
      if (index === -1) return res.status(404).json({ error: 'Not found' })
      saveProducts(productos.filter((p) => String(p.id) !== String(id)))
      return res.status(200).json({})
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
