import { getProducts, saveProducts } from './_db.js'

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      return res.status(200).json(getProducts())
    }

    if (req.method === 'POST') {
      const productos = getProducts()
      const nextId = String(
        Math.max(0, ...productos.map((p) => Number(p.id) || 0)) + 1,
      )
      const nuevo = { ...req.body, id: nextId }
      saveProducts([...productos, nuevo])
      return res.status(201).json(nuevo)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
