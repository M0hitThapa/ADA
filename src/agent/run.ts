import "dotenv/config"
import { generateText, type ModelMessage } from "ai"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { SYSTEM_PROMPT } from "./system/prompt.ts"
import { tools } from "./tools/index.ts"

import type { AgentCallbacks } from "../types"

import { Laminar } from "@lmnr-ai/lmnr"

Laminar.initialize({
  projectApiKey:process.env.LMNR_PROJECT_API_KEY!
})

const MODEL_NAME = "openai/gpt-5-mini"

const openrouter = createOpenRouter({
  apiKey:process.env.NEXT_PUBLIC_OPENROUTER_API_KEY!
})


export const runAgent = async (
  userMessage: string,
  conversationHistory: ModelMessage[],
  callbacks: AgentCallbacks
): Promise<ModelMessage[]> => {
  const messages:ModelMessage[] = [
    ...conversationHistory,
    {role:"user", content:userMessage}
  ]
  const { text} = await generateText({
    model: openrouter(MODEL_NAME),

    system: SYSTEM_PROMPT,
    tools,
    messages

  })
  callbacks.onComplete(text)
   return [...messages, { role: "assistant", content: text }]



  // toolCalls.forEach(async (tc) => {
  //   console.log(await executeTool(tc.toolName, tc.input))
  // })

}


// runAgent("whats the current time right now ")
