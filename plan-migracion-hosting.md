# Plan de Hosting — Julio Junk Removal

**Fecha:** Junio 2026  
**Proyecto:** Julio Junk Removal — juliojunkremoval.com  
**Stack:** Next.js 14, dominio gestionado con Cloudflare DNS

---

## Contexto — Por qué se inició esta discusión

El equipo de Netlify (`hrugel-dev2620's team`) agotó los créditos del plan gratuito. Resultado: deploys bloqueados, Agent Runners desactivados, y riesgo de que el sitio se fuera offline. Se evaluaron varias alternativas antes de llegar a la decisión final.

---

## Opciones evaluadas y por qué se descartaron

### Vercel Hobby (gratis)
El plan gratuito de Vercel tiene una restricción crítica: **es para proyectos no-comerciales únicamente.** Este sitio representa un negocio real que opera en todo California con público americano y latino — claramente comercial. Descartado.

### Vercel Pro ($20/mes)
La mejor opción técnica para Next.js pero demasiado caro si el cliente aún no paga mantenimiento mensual. No conviene absorber ese costo. Descartado por precio.

### Hostinger Web Apps (~$4–8/mes)
Deploy via Git disponible pero la experiencia no es tan fluida como Netlify/Vercel. Sin preview URLs, interfaz básica. Descartado por experiencia de desarrollo inferior.

### Railway (~$5/mes)
Muy buena opción — GitHub auto-deploy nativo, igual de fluido que Vercel, sin restricciones comerciales. Se descartó únicamente porque Netlify Personal a $9/mes es aún más familiar y el costo adicional es mínimo para la comodidad que ofrece. Queda como segunda opción válida.

### Hostinger VPS + Dokploy
Dokploy es un Vercel self-hosted: dashboard visual, GitHub auto-deploy, SSL automático, logs en tiempo real. El VPS sale ~$6/mes y puedes hospedar todos los clientes que quieras en ese mismo servidor. Excelente opción a futuro. Descartado por ahora porque solo hay 1 cliente activo — no justifica el setup inicial todavía.

---

## Decisión actual — Netlify Personal ($9/mes)

**Por qué Netlify Personal:**
- Es la plataforma que ya se conoce — cero aprendizaje, cero reconfiguración
- GitHub auto-deploy funciona exactamente igual que antes
- SSL automático, CDN, preview URLs por PR — todo incluido
- Uso comercial sin restricciones
- $9/mes se cobra al cliente como parte del servicio de hosting/mantenimiento
- En 5 minutos el sitio vuelve a estar online

**Cómo activarlo:**
1. Ir a Netlify → el equipo actual → **Billing**
2. Actualizar al plan **Personal ($9/mes)**
3. El sitio se reactiva automáticamente — no hay que cambiar nada más

---

## Plan futuro — Migrar a VPS + Dokploy cuando haya más clientes

Cuando se tengan **3 o más clientes activos**, conviene migrar todos a un VPS con Dokploy.

### Por qué en ese momento

Con Netlify pagas $9/mes por sitio. Con 3 clientes son $27/mes. Un VPS de Hostinger a $6/mes hostea los 3 (y los que vengan) sin costo adicional.

### Qué es Dokploy

Dokploy es un PaaS open source self-hosted. Se instala en el VPS y te da una interfaz visual similar a Vercel/Netlify para gestionar proyectos. Incluye:
- GitHub auto-deploy (cada `git push` → deploy automático)
- SSL automático via Let's Encrypt
- Logs en tiempo real desde el dashboard
- Variables de entorno por proyecto
- Múltiples proyectos en el mismo servidor
- Manejo de Docker por debajo, sin que tengas que tocarlo

### Lo que Dokploy NO cubre

Si el servidor físico de Hostinger tiene un problema de red o hardware, el sitio se cae hasta que Hostinger lo resuelva. Es el único riesgo real del self-hosting — y es poco frecuente con proveedores serios.

### Pasos para migrar cuando llegue el momento

**1. Contratar VPS en Hostinger**
- Plan recomendado: KVM 2 (2 vCPU, 8 GB RAM) — ~$7–10/mes
- Sistema operativo: Ubuntu 22.04 LTS

**2. Instalar Dokploy en el VPS**
```bash
curl -sSL https://dokploy.com/install.sh | sh
```
Dokploy se instala solo y levanta su dashboard en el puerto 3000 del VPS.

**3. Conectar GitHub**
- En el dashboard de Dokploy → Settings → GitHub
- Autorizar acceso a los repositorios de los clientes

**4. Crear proyecto por cliente**
- New Project → Add Application → seleccionar repo de GitHub
- Dokploy detecta Next.js automáticamente
- Agregar variables de entorno (las mismas del `.env.local`)
- Activar Auto Deploy → cada push a `main` dispara el build

**5. Conectar dominio de cada cliente**
- En Dokploy: Settings → Domains → agregar el dominio
- En Cloudflare de cada cliente: apuntar el registro A al IP del VPS
- Dokploy genera el SSL automáticamente via Let's Encrypt

**6. Apagar los sitios de Netlify uno por uno**
- Verificar que cada sitio funciona en su dominio antes de salir de Netlify
- Delete site en Netlify una vez confirmado

### Variables de entorno a migrar (este proyecto)

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | Ver `.env.local` |
| `NEXT_PUBLIC_PHONE` | Ver `.env.local` |
| `NEXT_PUBLIC_PHONE_HREF` | Ver `.env.local` |
| `NEXT_PUBLIC_WHATSAPP` | Ver `.env.local` |
| `NEXT_PUBLIC_CITY` | Ver `.env.local` |
| `NEXT_PUBLIC_STATE` | Ver `.env.local` |
| `NEXT_PUBLIC_EMAIL` | Ver `.env.local` |
| `NEXT_PUBLIC_FACEBOOK` | Ver `.env.local` |
| `NEXT_PUBLIC_INSTAGRAM` | Ver `.env.local` |

---

## Resumen de decisiones

| Plataforma | Precio | Estado |
|---|---|---|
| Netlify Hobby (equipo) | Gratis | Agotó créditos — causa del problema |
| Vercel Hobby | Gratis | Descartado — solo no-comercial |
| Vercel Pro | $20/mes | Descartado — muy caro por ahora |
| Hostinger Web Apps | $4–8/mes | Descartado — experiencia inferior |
| Railway | $5/mes | Válido, segunda opción |
| **Netlify Personal** | **$9/mes** | **✅ Decisión actual** |
| Hostinger VPS + Dokploy | ~$6–10/mes total | Pendiente — evaluar cuando haya 3+ clientes |
