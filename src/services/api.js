const API_BASE =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001')

const BASE_URL = `${API_BASE}/productos`

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

export async function getProducts() {
  return request(BASE_URL)
}

export async function getProduct(id) {
  return request(`${BASE_URL}/${id}`)
}

export async function createProduct(product) {
  return request(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(product),
  })
}

export async function updateProduct(id, product) {
  return request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  })
}

export async function deleteProduct(id) {
  return request(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
}
