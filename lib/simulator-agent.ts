import { ToolLoopAgent, tool, type InferAgentUIMessage } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { runSimulation } from "@/lib/business-simulator"

const INDUSTRY_LABELS: Record<string, string> = {
  retail: "Retail / Comercio",
  tecnologia: "Tecnología",
  servicios: "Servicios profesionales",
  alimentos: "Alimentos y bebidas",
  salud: "Salud y bienestar",
  otro: "Otro",
}

const SIZE_LABELS: Record<string, string> = {
  small: "1 a 10 empleados",
  medium: "11 a 50 empleados",
  large: "Más de 50 empleados",
}

const runSimulationTool = tool({
  description:
    "Corre la simulación de proyección de crecimiento de un negocio. Llamala solo cuando ya tengas los 4 datos: nombre de la empresa, rubro, ingreso mensual en USD y tamaño de la empresa.",
  inputSchema: z.object({
    companyName: z.string().describe("Nombre de la empresa"),
    industry: z
      .enum(["retail", "tecnologia", "servicios", "alimentos", "salud", "otro"])
      .describe("Rubro de la empresa"),
    monthlyRevenue: z.number().positive().describe("Ingreso mensual aproximado en USD"),
    size: z
      .enum(["small", "medium", "large"])
      .describe("Tamaño de la empresa por cantidad de empleados"),
  }),
  execute: async (input) => runSimulation(input),
})

const INSTRUCTIONS = `Sos el asistente conversacional del Simulador de Negocio de Wikinbound. Ayudás a dueños de pequeñas y medianas empresas a proyectar el crecimiento de su negocio a 3, 6 y 12 meses.

Tu objetivo es reunir, charlando de forma natural, estos 4 datos:
1. Nombre de la empresa.
2. Rubro — mapealo a uno de estos valores exactos: ${Object.entries(INDUSTRY_LABELS)
  .map(([key, label]) => `"${key}" (${label})`)
  .join(", ")}.
3. Ingreso mensual aproximado, en USD (un número).
4. Tamaño de la empresa — mapealo a uno de estos valores exactos: ${Object.entries(SIZE_LABELS)
  .map(([key, label]) => `"${key}" (${label})`)
  .join(", ")}.

Reglas:
- Preguntá de a uno o dos datos por vez, en tono cercano y profesional. Si el usuario ya dio varios datos en un solo mensaje, no se los vuelvas a preguntar.
- No inventes ni asumas datos que el usuario no dio.
- Respondé siempre en el mismo idioma que use el visitante (español o inglés).
- Cuando tengas los 4 datos, llamá a la herramienta "runSimulation" con esos valores.
- Después de que la herramienta devuelva el resultado, resumí en 1-2 frases la proyección a 12 meses y mencioná que puede ver el detalle completo en la pestaña de Resultados. No repitas los 4 datos que ya te dio.`

export function createSimulatorAgent() {
  return new ToolLoopAgent({
    model: openai("gpt-4o-mini"),
    instructions: INSTRUCTIONS,
    tools: { runSimulation: runSimulationTool },
  })
}

export type SimulatorAgent = ReturnType<typeof createSimulatorAgent>
export type SimulatorUIMessage = InferAgentUIMessage<SimulatorAgent>
