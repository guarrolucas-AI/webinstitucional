/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { google } from "googleapis"
import { getCalendarAuth, CALENDAR_ID } from "@/lib/google-calendar-auth"

interface MeetingData {
  nombre: string
  apellido: string
  email: string
  telefono: string
  asunto: string
  fechaPreferida: string
  horaPreferida: string
  duracion: string
  participantes: string
  agenda: string
}

interface TimeSlot {
  start: Date
  end: Date
}

const calendarId = CALENDAR_ID

async function checkAvailability(auth: InstanceType<typeof google.auth.OAuth2>, startDate: Date, endDate: Date): Promise<boolean> {
  try {
const calendar = google.calendar({ version: "v3", auth })

    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    return (response.data.items ?? []).length === 0
  } catch (error) {
    console.error("Error checking availability:", error)
    return true // Por las dudas no bloquear si falla
  }
}

async function getAvailableSlots(auth: any, date: string): Promise<string[]> {
  try {
    const calendar = google.calendar({ version: "v3", auth})
    const [year, month, day] = date.split("-")

    const dayStart = new Date(Number(year), Number(month) - 1, Number(day), 9, 0)
    const dayEnd = new Date(Number(year), Number(month) - 1, Number(day), 18, 0)

    const response = await calendar.events.list({
      calendarId,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    const busySlots: TimeSlot[] = (response.data.items ?? []).map(event => ({
      start: new Date(event.start?.dateTime || event.start?.date || ""),
      end: new Date(event.end?.dateTime || event.end?.date || ""),
    }))

    const availableSlots: string[] = []
    const current = new Date(dayStart)

    while (current < dayEnd) {
      const slotEnd = new Date(current.getTime() + 30 * 60000)
      const isBusy = busySlots.some(busy =>
        (current >= busy.start && current < busy.end) ||
        (slotEnd > busy.start && slotEnd <= busy.end) ||
        (current <= busy.start && slotEnd >= busy.end)
      )
      if (!isBusy) {
        availableSlots.push(current.toTimeString().slice(0, 5))
      }
      current.setMinutes(current.getMinutes() + 30)
    }

    return availableSlots
  } catch (error) {
    console.error("Error getting available slots:", error)
    return []
  }
}

export async function createMeetingAction(data: MeetingData) {
  try {
    const auth = getCalendarAuth()
    const calendar = google.calendar({ version: "v3", auth })

    // Parsear fecha y hora
      const dateISO = `${data.fechaPreferida}T${data.horaPreferida}:00-03:00`
      const startDate = new Date(dateISO)
    const endDate = new Date(startDate.getTime() + Number(data.duracion) * 60000)

    // Verificar disponibilidad
    const isAvailable = await checkAvailability(auth, startDate, endDate)
    if (!isAvailable) {
      const availableSlots = await getAvailableSlots(auth, data.fechaPreferida)
      return {
        success: false,
        error: "El horario seleccionado no está disponible.",
        availableSlots: availableSlots.slice(0, 6),
      }
    }

    // Crear evento con Google Meet y asistentes
    const event = {
      summary: `${data.asunto} - ${data.nombre} ${data.apellido}`,
      description: `
Reunión solicitada por: ${data.nombre} ${data.apellido}
Email: ${data.email}
Teléfono: ${data.telefono}
Participantes estimados: ${data.participantes || "No especificado"}

Agenda:
${data.agenda}

---
Esta reunión fue creada automáticamente desde el formulario web.
      `.trim(),
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      attendees: [
        { email: data.email, displayName: `${data.nombre} ${data.apellido}` },
      ],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 },
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 15 },
        ],
      },
      guestsCanModify: false,
      guestsCanInviteOthers: false,
      guestsCanSeeOtherGuests: true,
    }

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all", // Envía invitaciones automáticamente
    })

    return {
      success: true,
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
      htmlLink: response.data.htmlLink,
    }
  } catch (error: any) {
    console.error("Error creating meeting:", error.response?.data || error.message || error)
    return {
      success: false,
      error: "No se pudo crear la reunión. Verifica la configuración de las variables de entorno de Google OAuth.",
      details: error.response?.data || error.message || error,
    }
  }
}

export async function getAvailableSlotsAction(date: string) {
  try {
    const auth = getCalendarAuth()
    const availableSlots = await getAvailableSlots(auth, date)

    return {
      success: true,
      slots: availableSlots,
    }
  } catch (error) {
    console.error("Error getting available slots:", error)
    return {
      success: false,
      slots: [],
    }
  }
}
