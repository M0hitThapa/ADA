import "dotenv/config"
import { generateText, type ModelMessage } from "ai"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { SYSTEM_PROMPT } from "./system/prompt"
import type { AgentCallbacks } from "../types"

const MODEL_NAME = "openai/gpt-5-mini"

const openrouter = createOpenRouter({
  apiKey:process.env.NEXT_PUBLIC_OPENROUTER_API_KEY!
})


export const runAgent = async (userMessage: string, conversationHistory: ModelMessage[], callbacks: AgentCallbacks) => {
  const { text} = await generateText({
    model: openrouter(MODEL_NAME),
    prompt: userMessage,
    system:SYSTEM_PROMPT
  })

  console.log(text)

}


runAgent("hello can you hear me ")
