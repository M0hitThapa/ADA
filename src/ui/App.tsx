import { Box, Text, useApp } from "ink"
import { Input } from "./components/input.tsx"
import { Spinner } from "./components/spinner.tsx"
import { useState } from "react"

export const App = () => {
  const {exit} = useApp()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (userInput: string) => {
    if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
      exit()
      return;
    }
    setIsLoading(true)
    await new Promise((resolve => setTimeout(resolve, 2000)))
setIsLoading(false)
  }
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="magenta"> 🤖 AI Agent </Text>
      {isLoading && (
        <Box marginTop={1}>
          <Spinner />
        </Box>
      )}
      <Box marginTop={1}>
        <Input onSubmit={handleSubmit} disabled={isLoading} />
      </Box>
   </Box>
  )
}
