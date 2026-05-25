# Panel Administrativo de E-Commerce (Inventario)

Dashboard administrativo para gestionar el catálogo de productos de una tienda en línea. Desarrollado como prueba técnica para Desarrollador Frontend Junior con React + Vite.

## 🎯 Objetivo del Proyecto

Simulación de un requerimiento real: evalúa habilidades prácticas en desarrollo frontend, buenas prácticas, manejo de estado, validación de datos, control de versiones e integración con APIs.

## ✨ Funcionalidades

- **Autenticación simulada**: Login con nombre de usuario y PIN, sesión persistente en LocalStorage
- **Protección de rutas**: Acceso restringido al dashboard sin autenticación
- **CRUD completo de productos**: Crear, leer, actualizar y eliminar productos del catálogo
- **Búsqueda y filtro**: Buscar por nombre o categoría en tiempo real
- **Validación exhaustiva**: Campos obligatorios, montos positivos, validación de imágenes
- **Alertas interactivas**: Confirmación antes de eliminar (SweetAlert2) + notificaciones de éxito/error
- **Dos vistas**: Grid de tarjetas y tabla detallada, intercambiables
- **Estadísticas en tiempo real**: Total de productos, valor del inventario, productos con stock bajo
- **Tema oscuro/claro**: Selector de tema con persistencia
- **Indicadores de carga**: Spinners y skeleton loading mientras se obtienen datos
- **Diseño 100% responsivo**: Funciona perfectamente en móvil, tablet y desktop

## 🏗️ Arquitectura y Estructura

```
src/
├── components/           # Componentes reutilizables
│   ├── ProductCard.jsx   # Tarjeta de producto (vista grid)
│   ├── ProductTable.jsx  # Tabla de productos
│   ├── ProductForm.jsx   # Formulario de crear/editar
│   ├── SearchBar.jsx     # Buscador con filtro
│   ├── Sidebar.jsx       # Panel lateral con navegación
│   ├── StatCard.jsx      # Tarjeta de estadística
│   ├── Spinner.jsx       # Indicador de carga
│   ├── SkeletonCard.jsx  # Skeleton loading
│   └── EmptyState.jsx    # Estado vacío
├── context/              # Estado global (React Context)
│   ├── AuthContext.jsx   # Autenticación y sesión
│   └── ThemeContext.jsx  # Tema (claro/oscuro)
├── layouts/              # Layouts principales
│   └── DashboardLayout.jsx # Layout del dashboard con navbar
├── pages/                # Páginas/vistas
│   ├── Login.jsx         # Página de login
│   ├── Products.jsx      # Página de inventario
│   └── NotFound.jsx      # Página 404
├── services/             # Lógica de API
│   └── api.js           # Funciones de fetch (GET, POST, PUT, DELETE)
├── App.jsx               # Rutas principales
├── main.jsx              # Punto de entrada
└── index.css             # Estilos globales (Tailwind)
```

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.x | Framework principal |
| Vite | 8.x | Build tool y dev server |
| Tailwind CSS | 4.x | Estilos y diseño responsivo |
| react-router-dom | 7.x | Enrutamiento (protección de rutas) |
| SweetAlert2 | 11.x | Alertas y confirmaciones |
| JSON Server | 1.x | API REST mock local |
| concurrently | 9.x | Ejecutar API y frontend simultáneamente |

## 📋 Requisitos

- Node.js 18.0.0 o superior
- npm 9.0.0 o superior
- Git configurado

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/ecommerce-admin-panel.git
cd ecommerce-admin-panel
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

**Opción A: Ejecutar ambos procesos simultáneamente (recomendado)**
```bash
npm run dev:all
```

**Opción B: Ejecutar en terminales separadas**
```bash
# Terminal 1: Iniciar el servidor de API mock
npm run api

# Terminal 2: Iniciar el servidor de desarrollo
npm run dev
```

### 4. Acceder a la aplicación

- **Frontend**: http://localhost:5173
- **API Mock**: http://localhost:3001

## 🔐 Credenciales de Acceso

La autenticación es simulada. Use cualquier combinación:

- **Usuario**: Cualquier nombre (ej: "admin", "usuario1", "test")
- **PIN**: Cualquier código de 1-4 dígitos (ej: "1234", "0", "9999")

Los datos se almacenan en LocalStorage para esta sesión.

## 📡 API REST Mock

### Configuración

La API corre en `http://localhost:3001` usando **JSON Server**.

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/productos` | Obtener todos los productos |
| GET | `/productos/:id` | Obtener un producto por ID |
| POST | `/productos` | Crear un nuevo producto |
| PUT | `/productos/:id` | Actualizar un producto |
| DELETE | `/productos/:id` | Eliminar un producto |

### Esquema del Producto

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

## 🔀 Control de Versiones (Git)

El proyecto sigue una estructura de ramas estricta:

```
main (producción)
 ↑
develop (integración)
 ↑
feature/nombre-feature (desarrollo)
```

### Convención de Commits

Se utiliza **Conventional Commits**:

```bash
feat: add new feature          # Nueva funcionalidad
fix: resolve bug               # Corrección de bug
style: format code             # Cambios de formato/estilos
refactor: restructure code     # Refactorización
docs: update documentation     # Documentación
test: add tests                # Tests
chore: maintenance             # Tareas de mantenimiento
```

### Ejemplo de flujo de trabajo

```bash
# 1. Crear rama feature desde develop
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: add new functionality"

# 3. Mergear a develop
git checkout develop
git merge feature/nueva-funcionalidad

# 4. Mergear a main para producción
git checkout main
git merge develop
```

## 🚀 Deployment

### Vercel (Recomendado)

1. Crear cuenta en [Vercel](https://vercel.com)
2. Importar repositorio de GitHub
3. Vercel detectará automáticamente Vite
4. Variables de entorno (si es necesario):
   - `VITE_API_URL`: URL de la API en producción

**Nota**: La configuración `vercel.json` ya está incluida para manejar el routing de React Router.

### Netlify

1. Conectar repositorio de GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deployar

### GitHub Pages

```bash
# Actualizar vite.config.js
export default {
  base: '/ecommerce-admin-panel/',
  // ... resto de la configuración
}

npm run build
git add dist -f
git commit -m "deploy: publish to gh-pages"
git push origin main
```

## ⚙️ Variables de Entorno

Actualmente la aplicación no requiere variables de entorno. Si en el futuro necesitas una API diferente:

1. Crear `.env.local`:
```
VITE_API_URL=https://api.ejemplo.com
```

2. Usar en `api.js`:
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/productos'
```

## 📊 Checklist de Evaluación (Factor 1 - Requisitos Mínimos)

- ✅ Login con autenticación simulada y LocalStorage
- ✅ Protección de rutas (no acceso sin login)
- ✅ Navbar con usuario logueado y botón cerrar sesión
- ✅ CRUD completo: GET, POST, PUT, DELETE
- ✅ Validación de campos numéricos (precio, stock)
- ✅ Confirmación con SweetAlert2 antes de DELETE
- ✅ Alertas de éxito/error para todas las operaciones
- ✅ Búsqueda por nombre y categoría en tiempo real
- ✅ Interfaz responsiva

## 🏆 Checklist de Excelencia (Factor 2 - Seniority)

- ✅ Arquitectura modular y limpia
- ✅ Separación de responsabilidades (componentes, servicios, contextos)
- ✅ Componentes reutilizables (ProductCard, StatCard, etc.)
- ✅ Manejo de estados asíncronos (loading, error, success)
- ✅ Indicadores visuales (Spinners, Skeleton loading)
- ✅ Tema oscuro/claro integrado
- ✅ Diseño profesional y UX intuitiva
- ✅ Control de versiones con convenciones estándar
- ✅ Flujo de ramas: feature → develop → main
- ✅ Commits descriptivos y organizados
- ✅ README documentado completamente

## 🐛 Troubleshooting

### La API no conecta

```bash
# Verificar que JSON Server está corriendo
npm run api

# O ejecutar ambos:
npm run dev:all
```

### Error: "Cannot find module"

```bash
# Limpiar node_modules e instalar nuevamente
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"

Si el puerto 5173 (frontend) o 3001 (API) está en uso:

```bash
# Frontend en puerto diferente:
npm run dev -- --port 3000

# API en puerto diferente:
npm run api -- -p 3002
```

### LocalStorage no funciona

- Verificar que localStorage no está deshabilitado en el navegador
- En navegación privada, algunos navegadores restringen localStorage
- Abrir en navegación normal

## 📄 Licencia

Este proyecto es una prueba técnica y está disponible bajo licencia MIT.

## 👨‍💻 Autor

Desarrollado como evaluación técnica para la posición de Desarrollador Frontend Junior.

---

**Última actualización**: Mayo 2026  
**Estado**: ✅ Listo para producción
