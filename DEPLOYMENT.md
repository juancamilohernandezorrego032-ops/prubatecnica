# Guía de Deployment

Este documento describe cómo deployar la aplicación a producción.

## 🚀 Opción 1: Vercel (Recomendado)

### Pasos:

1. **Crear cuenta en Vercel**: https://vercel.com

2. **Conectar repositorio de GitHub**:
   - Ir a Dashboard → New Project
   - Importar el repositorio `ecommerce-admin-panel`
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configurar variables de entorno** (si es necesario):
   - En Settings → Environment Variables, agregar (opcional):
   ```
   VITE_API_URL=https://tu-api.com
   ```

4. **Deploy automático**:
   - Vercel desplegará automáticamente al hacer push a `main`
   - Los cambios en `develop` crearán preview deployments

5. **Resultado**:
   - La aplicación estará disponible en: `https://tu-proyecto.vercel.app`

**Ventajas**:
- ✅ Deploy automático en cada push a main
- ✅ Preview deployments para pull requests
- ✅ SSL automático
- ✅ Manejo automático de routing (SPA)
- ✅ Gratis para proyectos públicos

---

## 🚀 Opción 2: Netlify

### Pasos:

1. **Crear cuenta en Netlify**: https://netlify.com

2. **Conectar repositorio**:
   - Click en "New site from Git"
   - Conectar con GitHub
   - Seleccionar el repositorio

3. **Configurar build**:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**:
   - Netlify automáticamente deployará en cada push a main

5. **Resultado**:
   - La aplicación estará disponible en: `https://tu-proyecto.netlify.app`

---

## 🚀 Opción 3: GitHub Pages

### Pasos:

1. **Configurar vite.config.js**:
```javascript
export default {
  base: '/ecommerce-admin-panel/',
  // resto de la configuración
}
```

2. **Build y deploy**:
```bash
npm run build
git add dist -f
git commit -m "deploy: publish to github pages"
git push origin main
```

3. **Habilitar GitHub Pages**:
   - En Settings → Pages → Source: Deploy from a branch
   - Branch: main, Folder: /root

4. **Resultado**:
   - Disponible en: `https://tu-usuario.github.io/ecommerce-admin-panel`

---

## 📝 Para una API Real

Cuando uses una API real en lugar de JSON Server:

1. **Crear cuenta en MockAPI.io** (para desarrollo):
   - https://mockapi.io
   - Crear un proyecto y recursos

2. **Actualizar `src/services/api.js`**:
```javascript
const BASE_URL = 'https://tu-api-mockapi.mockapi.io/api/v1/productos'
```

3. **O usar variables de entorno**:
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/productos'
```

---

## ✅ Pre-deployment Checklist

Antes de deployar, verificar:

- [ ] Build compila sin errores: `npm run build`
- [ ] ESLint pasa: `npm run lint`
- [ ] Código funciona localmente: `npm run dev:all`
- [ ] Cambios están en rama `main`
- [ ] Todos los commits están pusheados a GitHub
- [ ] README.md está actualizado
- [ ] No hay secrets/credenciales en el código

---

## 🔍 Monitoreo Post-Deployment

1. **Verificar la aplicación**:
   - Acceder a la URL del deployment
   - Probar login (usuario: "admin", PIN: "1234")
   - Crear un producto
   - Editar un producto
   - Eliminar un producto
   - Cambiar tema oscuro/claro

2. **Revisar logs**:
   - En Vercel: Analytics → Logs
   - En Netlify: Analytics → Functions Logs

3. **Configurar dominio personalizado**:
   - En Vercel Settings → Domains
   - Apuntar DNS al deployment

---

## 🆘 Troubleshooting

### Error 404 en rutas
- Verificar que `vercel.json` o `_redirects` están configurados
- Vercel y Netlify manejan esto automáticamente

### API no conecta en producción
- Verificar CORS en la API
- Usar `https://` en lugar de `http://`
- Revisar variable `VITE_API_URL`

### Build falla
- Verificar que `npm run lint` pasa
- Verificar que `npm run build` funciona localmente
- Revisar los logs de build en Vercel/Netlify

---

## 📚 Enlaces Útiles

- [Documentación Vercel + Vite](https://vercel.com/docs/frameworks/vite)
- [Documentación Netlify + Vite](https://docs.netlify.com/frameworks/vite/)
- [React Router en SPAs](https://reactrouter.com/en/main)
- [Guía de dominios Vercel](https://vercel.com/docs/concepts/projects/domains)
