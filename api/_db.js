import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const DB_FILE = join(tmpdir(), 'ecommerce-db.json')

function seedPath() {
  return join(process.cwd(), 'db.json')
}

export function readDb() {
  if (!existsSync(DB_FILE)) {
    copyFileSync(seedPath(), DB_FILE)
  }
  return JSON.parse(readFileSync(DB_FILE, 'utf-8'))
}

export function writeDb(data) {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

export function getProducts() {
  return readDb().productos ?? []
}

export function saveProducts(productos) {
  const db = readDb()
  db.productos = productos
  writeDb(db)
}
