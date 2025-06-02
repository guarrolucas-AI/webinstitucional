"use server"

import { google } from "googleapis"

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

const calendarId = '2c152f33717417f9979585e14ba55927f9aafbb35c008a2a0aa9a8ed26170e60@group.calendar.google.com'

async function checkAvailability(auth: any, startDate: Date, endDate: Date): Promise<boolean> {
  try {
    const calendar = google.calendar({ version: "v3", auth })

    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    })

    const events = response.data.items || []

    return events.length === 0
  } catch (error) {
    console.error("Error checking availability:", error)
    return true
  }
}

async function getAvailableSlots(auth: any, date: string): Promise<string[]> {
  try {
    const calendar = google.calendar({ version: "v3", auth })
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

    const events = response.data.items || []
    const busySlots: TimeSlot[] = events.map((event) => ({
      start: new Date(event.start?.dateTime || event.start?.date || ""),
      end: new Date(event.end?.dateTime || event.end?.date || ""),
    }))

    const availableSlots: string[] = []
    const current = new Date(dayStart)

    while (current < dayEnd) {
      const slotEnd = new Date(current.getTime() + 30 * 60000)

      const isAvailable = !busySlots.some(
        (busy) =>
          (current >= busy.start && current < busy.end) ||
          (slotEnd > busy.start && slotEnd <= busy.end) ||
          (current <= busy.start && slotEnd >= busy.end),
      )

      if (isAvailable) {
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
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    })

    const [year, month, day] = data.fechaPreferida.split("-")
    const [hour, minute] = data.horaPreferida.split(":")

    const startDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
    )
    const endDate = new Date(startDate.getTime() + Number(data.duracion) * 60000)

    const isAvailable = await checkAvailability(auth, startDate, endDate)

    if (!isAvailable) {
      const availableSlots = await getAvailableSlots(auth, data.fechaPreferida)
      return {
        success: false,
        error: "El horario seleccionado no está disponible.",
        availableSlots: availableSlots.slice(0, 6),
      }
    }

    const calendar = google.calendar({ version: "v3", auth })

    // Evento SIN conferenceData para evitar error invalid conference type
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
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
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
      // NO conferenceDataVersion ni sendUpdates para evitar errores
    })

    return {
      success: true,
      eventId: response.data.id,
      meetLink: null, // No se genera link Meet automáticamente
      htmlLink: response.data.htmlLink,
    }
  } catch (error: any) {
    console.error("Error creating meeting:", error.response?.data || error.message || error)
    return {
      success: false,
      error: "No se pudo crear la reunión. Verifica la configuración de Google Calendar.",
      details: error.response?.data || error.message || error,
    }
  }
}

export async function getAvailableSlotsAction(date: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    })

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
