import { tools } from "./tools";

export type ToolName = keyof typeof tools
export const executeTool = async (name:string, args:any) => {
  const tool = tools[name as ToolName]

  if (!tool) {
    return "unknown tool, this is not exist"
  }

  const execute = tool.execute

  if (!execute) {
    return "this is  not a registered tool"
  }

  const result = await execute(args, {
    toolCallId: "",
    messages: [],
    context:{}
  })

  return String(result)
}
