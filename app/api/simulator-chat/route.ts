import { createAgentUIStreamResponse } from "ai"
import { createSimulatorAgent } from "@/lib/simulator-agent"

export async function POST(req: Request) {
  const { messages } = await req.json()

  return createAgentUIStreamResponse({
    agent: createSimulatorAgent(),
    uiMessages: messages,
  })
}
