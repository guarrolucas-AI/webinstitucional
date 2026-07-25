"use server"

import { google } from "googleapis"
import { getCalendarAuth, CALENDAR_ID } from "@/lib/google-calendar-auth"

interface SimulatorLeadData {
  email: string
  companyName: string
  industry: string
  monthlyRevenue: number
  monthlyGrowthRate: number
  projection3: number
  projection6: number
  projection12: number
}

export async function submitSimulatorLead(data: SimulatorLeadData) {
  try {
    const auth = getCalendarAuth()
    const calendar = google.calendar({ version: "v3", auth })

    // Start a couple minutes in the future (not literally "now"): a reminder whose
    // trigger time is already in the past when the event is created is unreliable
    // to deliver, especially by email.
    const start = new Date(Date.now() + 2 * 60000)
    const end = new Date(start.getTime() + 15 * 60000)

    const event = {
      summary: `🎯 Nuevo lead: Simulador - ${data.companyName}`,
      description: `
Nuevo lead generado desde el Simulador de Negocios del sitio web.

Empresa: ${data.companyName}
Email de contacto: ${data.email}
Industria: ${data.industry}
Ingreso mensual declarado: $${data.monthlyRevenue}
Crecimiento mensual estimado: ${(data.monthlyGrowthRate * 100).toFixed(1)}%
Proyección a 3 meses: $${data.projection3.toFixed(0)}
Proyección a 6 meses: $${data.projection6.toFixed(0)}
Proyección a 12 meses: $${data.projection12.toFixed(0)}

---
Generado automáticamente. Contactar para ofrecer una consultoría.
      `.trim(),
      start: {
        dateTime: start.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1 },
          { method: "popup", minutes: 1 },
        ],
      },
    }

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    })

    return { success: true, eventId: response.data.id }
  } catch (error: any) {
    console.error("Error submitting simulator lead:", error.response?.data || error.message || error)
    return {
      success: false,
      error: "No se pudo registrar el lead. Intentalo de nuevo.",
    }
  }
}
