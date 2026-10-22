import { Box, Text } from "ink"

export interface Message {
  role: "user" | "assistant"
  content:string
}

interface MessageListProps {
  messages:Message[]
}

export const MessageList = ({messages}:MessageListProps) => {
  return (
    <Box flexDirection="column" gap={1}>
      {messages.map((message,index) => (
        <Box key={index} flexDirection="column"   backgroundColor={message.role === "user" ? "#262626" : undefined} paddingX={1} paddingY={message.role === "user" ? 1 : 0}>

          <Text>{message.content}</Text>
          </Box>

))}
</Box>
  )
}
