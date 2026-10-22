import { Box, Text } from "ink";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <Box flexDirection="column" gap={1}>
      {messages.map((message, index) => {
        const isUser = message.role === "user";

        if (isUser) {
          return (
            <Box
              key={index}
              backgroundColor="#171717"
              paddingY={1}
              paddingX={1}
            >
              <Box flexShrink={0} width={2}>
                <Text color="whiteBright">➤</Text>
              </Box>
              <Box flexGrow={1} flexDirection="column" paddingX={1}>
                <Text color="whiteBright">{message.content}</Text>
              </Box>
            </Box>
          );
        }

        return (
          <Box key={index} paddingX={1}>
            <Box flexShrink={0} width={2}>
              <Text color="cyanBright">◉</Text>
            </Box>
            <Box flexGrow={1} flexDirection="column" paddingX={1}>
              <Text color="white">{message.content}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
