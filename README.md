# Panel Administrativo de E-Commerce (Inventario)

Dashboard administrativo para gestionar el catálogo de productos de una tienda en línea. Desarrollado como prueba técnica para Desarrollador Frontend Junior.

## Funcionalidades

- **Autenticación simulada**: Login con nombre de usuario y PIN, sesión persistente en LocalStorage
- **CRUD de productos**: Crear, leer, actualizar y eliminar productos del catálogo
- **Búsqueda en tiempo real**: Filtro por nombre o categoría
- **Alertas interactivas**: Confirmación y notificaciones con SweetAlert2
- **Diseño responsivo**: Adaptado a móvil, tablet y escritorio

## Stack Tecnológico

| Tecnología | Versión |
|---|---|
| React | 19.x |
| Vite | 8.x |
| Tailwind CSS | 4.x |
| react-router-dom | 7.x |
| SweetAlert2 | 11.x |
| JSON Server | 1.x |

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/ecommerce-admin-panel.git
cd ecommerce-admin-panel

# Instalar dependencias
npm install

# Iniciar la API mock (terminal 1)
npm run api

# Iniciar el frontend (terminal 2)
npm run dev
```

O ejecutar ambos simultáneamente:
```bash
npm run dev:all
```

La aplicación estará disponible en `http://localhost:5173` y la API en `http://localhost:3001`.

## Credenciales de Acceso

Cualquier nombre de usuario y PIN de 4-6 dígitos son válidos (simulación).

## API Mock

La API REST corre localmente con JSON Server en el puerto 3001.

Endpoint: `http://localhost:3001/productos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/productos` | Listar todos los productos |
| GET | `/productos/:id` | Obtener un producto |
| POST | `/productos` | Crear un producto |
| PUT | `/productos/:id` | Actualizar un producto |
| DELETE | `/productos/:id` | Eliminar un producto |

### Estructura del Producto

```json
{
  "id": "1",
  "name": "Camiseta Algodón Premium",
  "price": 45000,
  "category": "Ropa",
  "stock": 25,
  "image": "https://placehold.co/300x300?text=Camiseta+Premium"
}
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   ├── SearchBar.jsx
│   └── Spinner.jsx
├── context/          # Contextos de React
│   └── AuthContext.jsx
├── layouts/          # Layouts compartidos
│   └── DashboardLayout.jsx
├── pages/            # Páginas de la aplicación
│   ├── Login.jsx
│   ├── Products.jsx
│   └── NotFound.jsx
├── services/         # Servicios y lógica de API
│   └── api.js
├── App.jsx           # Configuración de rutas
├── main.jsx          # Punto de entrada
└── index.css         # Estilos globales
```

## Deployment

Esta aplicación puede desplegarse en Vercel, Netlify o GitHub Pages.

Para producción, se recomienda usar MockAPI.io en lugar de JSON Server. Actualizar la variable `BASE_URL` en `src/services/api.js`.
