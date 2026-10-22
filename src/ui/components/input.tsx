import { Box, Text, useInput } from "ink";
import { useState } from "react";

interface InputProps {
  onSubmit: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const Input = ({
  onSubmit,
  disabled = false,
  placeholder = "Ask anything...",
}: InputProps) => {
  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState(0);

  useInput((input, key) => {
    if (disabled) return;
    if (key.return) {
      if (value.trim()) {
        onSubmit(value);
        setValue("");
        setCursor(0);
      }
      return;
    }

    if (key.leftArrow) {
      setCursor((c) => Math.max(0, c - 1));
      return;
    }
    if (key.rightArrow) {
      setCursor((c) => Math.min(value.length, c + 1));
      return;
    }

    if (key.backspace || key.delete) {
      if (cursor > 0) {
        setValue((v) => v.slice(0, cursor - 1) + v.slice(cursor));
        setCursor((c) => c - 1);
      }
      return;
    }

    if (input && !key.ctrl && !key.meta && !key.tab && !key.escape) {
        setValue((v) => v.slice(0, cursor) + input + v.slice(cursor))
        setCursor((c) => c + input.length)
      }
  });

  const before = value.slice(0, cursor);
  const current = value[cursor] ?? " ";
  const after = value.slice(cursor + 1);

  return (
    <Box
      borderStyle="round"
      borderColor="grey"
      width="100%"
      borderLeft={false}
      borderRight={false}
    >
      <Text color="blue" bold>
        {"> "}
      </Text>
      {value.length === 0 ? (
        <Text>
          {!disabled && <Text inverse> </Text>}
          <Text dimColor>{placeholder}</Text>
        </Text>
      ) : (
        <Text>
          {" "}
          {before}
          {!disabled ? <Text inverse>{current}</Text> : current}
          {after}
        </Text>
      )}
    </Box>
  );
};
