import { tool } from "ai";
import {z} from "zod";

export const dateTime = tool({
  description: "Return the current date and time. Use this tool before ant time related task",
  inputSchema: z.object({}),
  execute: async () => {
    return new Date().toISOString()
  }
})
