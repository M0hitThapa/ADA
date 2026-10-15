import { Box, Text, useApp } from "ink";
import { Input } from "./components/input.tsx";
import { Spinner } from "./components/spinner.tsx";
import { useCallback, useState } from "react";
import {
  MessageList,
  type Message,
} from "./components/message-list.tsx";
import { runAgent } from "../agent/run.ts";
import type { ModelMessage } from "ai";
import { Banner } from "./components/banner.tsx";

export const App = () => {
  const { exit } = useApp();

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const [streamingText, setStreamingText] = useState("");

  const [conversationHistory, setConversationHistory] = useState<
    ModelMessage[]
  >([]);

  const handleSubmit = useCallback(
    async (userInput: string) => {
      if (
        userInput.toLowerCase() === "exit" ||
        userInput.toLowerCase() === "quit"
      ) {
        exit();
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: userInput,
        },
      ]);

      setIsLoading(true);
      setStreamingText("");


      try {
        const newHistory = await runAgent(
          userInput,
          conversationHistory,
          {
            onToken: (token) => {
              setStreamingText((prev) => prev + token);
            },

            onComplete: (response) => {
              if (response) {
                setMessages((prev) => [
                  ...prev,
                  {
                    role: "assistant",
                    content: response,
                  },
                ]);
              }

              setStreamingText("");
            },
          }
        );

        setConversationHistory(newHistory);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unknown error";

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${errorMessage}`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationHistory, exit]
  );

  return (
    <Box flexDirection="column" padding={1}>
      <Banner />



      <Box flexDirection="column" marginBottom={1}>
        <MessageList messages={messages} />

        {streamingText && (
          <Box flexDirection="column" marginTop={1}>
            <Text color="green" bold>
              › Assistant
            </Text>
            <Box marginLeft={2}>
              <Text>{streamingText}</Text>
              <Text color="gray">▌</Text>
            </Box>
          </Box>
        )}


      {isLoading && (
        <Box marginTop={1}>
          <Spinner />
        </Box>
        )}
           </Box>

      <Box >
        <Input
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      </Box>
    </Box>
  );
};
