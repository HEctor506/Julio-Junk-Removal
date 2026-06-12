# Mejoras Futuras — Julio Junk Removal

## Formulario de contacto → envío de email

### Estado actual

El endpoint `src/app/api/contact/route.ts` recibe el submission del formulario pero solo hace `console.log`. En producción, los mensajes se pierden. Nadie los ve.

### Qué necesitamos realmente

Cuando alguien llena el formulario, Julio tiene que recibir un email con los datos. Eso es todo. No hay base de datos, no hay dashboard, no hay automatización compleja — solo "llenan el form → llega un correo".

---

## ¿Se necesita n8n?

**No, para el caso básico.**

n8n es una herramienta de automatización de workflows (similar a Zapier pero self-hosted). Agrega una capa de infraestructura que solo se justifica si querés hacer varias cosas encadenadas con el mismo lead (guardar en Google Sheets + enviar WhatsApp + notificar Slack + etc.).

Para solo mandar un email: **Resend es suficiente y es la opción correcta**.

### Cuándo n8n SÍ tendría sentido

- Guardar cada lead automáticamente en un Google Sheet (historial de contactos)
- Enviarle un WhatsApp automático de confirmación al cliente
- Notificar a Julio por WhatsApp además del email
- Conectar a un CRM básico
- Follow-up automático si no responden en X horas

Si el negocio crece y Julio quiere manejar sus leads más ordenadamente, n8n entraría ahí. Por ahora, over-engineering.

---

## Solución recomendada: Resend

### Por qué Resend

- Plan gratuito: 100 emails/día, 3,000/mes — más que suficiente para un negocio local
- Se integra directamente en el `route.ts` existente, ~10 líneas de código
- El email puede tener formato HTML personalizado
- No requiere servidor adicional, funciona como Netlify Function

### Cómo le llega el email a Julio

Julio recibiría un email en su casilla (ej. juliojunkremoval@gmail.com) cada vez que alguien llena el formulario. El formato puede ser:

**Opción A — Plain text (más simple):**
```
Nuevo contacto desde el sitio web

Nombre: María López
Teléfono: (555) 123-4567
Email: maria@email.com
Servicio: Limpieza de garage
Mensaje: Necesito retirar muebles viejos y electrodomésticos...
```

**Opción B — HTML con estilo (más profesional):**
Un email con el logo, los datos en tabla ordenada, y un botón directo para llamar o responder por WhatsApp. Se ve igual que los emails de cualquier empresa seria.

La recomendación es Opción B: no cuesta más esfuerzo con Resend y le da una imagen más profesional al negocio.

### Implementación en route.ts

```ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'notificaciones@juliojunkremoval.com', // dominio verificado en Resend
  to: process.env.NEXT_PUBLIC_EMAIL!,
  subject: `Nuevo contacto: ${name} — ${service || 'Sin servicio especificado'}`,
  html: `
    <h2>Nuevo contacto desde el sitio web</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Servicio:</strong> ${service}</p>
    <p><strong>Mensaje:</strong> ${message}</p>
  `,
});
```

### Variables de entorno a agregar

```
RESEND_API_KEY=re_xxxxxxxxxxxx   ← de resend.com (gratis)
```

### Verificación de dominio en Resend

Para que el `from:` sea `@juliojunkremoval.com` (en lugar de un dominio genérico), hay que verificar el dominio en Resend. Se hace agregando 2-3 registros DNS en Cloudflare — proceso de 10 minutos.

---

## Formulario en Home vs. Contact

### Decisión tomada (pendiente implementar)

- **Eliminar** la sección `<ContactForm />` del Home (`src/app/[locale]/page.tsx`)
- **Mantener** el formulario completo solo en `/contact` — ahí es donde va el usuario que ya decidió contactar y prefiere no llamar
- El Home debe tener CTAs directos a llamada y WhatsApp, no un formulario

### Por qué

El objetivo principal del sitio es convertir visitas en llamadas. Un formulario en el Home añade fricción y aleja al usuario del canal que mejor convierte (llamada/WhatsApp) para este tipo de negocio.

Los clientes corporativos (property managers, constructoras) que prefieren formularios van a /contact igual.

---

## Roadmap de implementación

1. [ ] Conectar Resend al `route.ts` — email HTML a Julio con cada submission
2. [ ] Verificar dominio `juliojunkremoval.com` en Resend (DNS en Cloudflare)
3. [ ] Agregar `RESEND_API_KEY` como env var en Netlify
4. [ ] Quitar `<ContactForm />` del Home, reemplazar con CTA directo
5. [ ] (Futuro) Si el volumen de leads crece: evaluar Google Sheets via n8n para historial
