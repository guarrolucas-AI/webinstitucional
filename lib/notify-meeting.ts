import { Resend } from "resend"

interface MeetingNotificationData {
  nombre: string
  apellido: string
  email: string
  telefono: string
  asunto: string
  startDate: Date
  endDate: Date
  duracion: string
  participantes: string
  agenda: string
  meetLink?: string | null
  htmlLink?: string | null
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function sendMeetingNotificationEmail(data: MeetingNotificationData) {
  const apiKey = process.env.RESEND_API_KEY
  const notifyTo = process.env.MEETING_NOTIFICATION_EMAIL

  if (!apiKey || !notifyTo) {
    console.warn("Skipping meeting notification email: RESEND_API_KEY or MEETING_NOTIFICATION_EMAIL not set")
    return
  }

  const resend = new Resend(apiKey)

  const fecha = data.startDate.toLocaleString("es-AR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  })

  const agendaHtml = escapeHtml(data.agenda).replace(/\n/g, "<br>")

  await resend.emails.send({
    from: "Wikinbound <onboarding@resend.dev>",
    to: notifyTo,
    subject: `Nueva reunión agendada: ${data.asunto}`,
    html: `
      <h2>Nueva reunión agendada</h2>
      <p><strong>${escapeHtml(data.nombre)} ${escapeHtml(data.apellido)}</strong> agendó una reunión desde el sitio web.</p>
      <ul>
        <li><strong>Asunto:</strong> ${escapeHtml(data.asunto)}</li>
        <li><strong>Cuándo:</strong> ${fecha}</li>
        <li><strong>Duración:</strong> ${escapeHtml(data.duracion)} minutos</li>
        <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
        <li><strong>Teléfono:</strong> ${escapeHtml(data.telefono || "No especificado")}</li>
        <li><strong>Participantes estimados:</strong> ${escapeHtml(data.participantes || "No especificado")}</li>
      </ul>
      <p><strong>Agenda:</strong><br>${agendaHtml}</p>
      ${data.meetLink ? `<p><a href="${data.meetLink}">Unirse a Google Meet</a></p>` : ""}
      ${data.htmlLink ? `<p><a href="${data.htmlLink}">Ver en Google Calendar</a></p>` : ""}
    `,
  })
}
