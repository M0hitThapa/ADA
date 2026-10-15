import { Box, Text } from "ink";

const OWL = String.raw`
 ,___,
 {O,O}
 /)__)
 -"--"-
`.replace(/^\n|\n$/g, "");

const ART = String.raw`
    ___    ____  ___
   /   |  / __ \/   |
  / /| | / / / / /| |
 / ___ |/ /_/ / ___ |
/_/  |_/_____/_/  |_|
`.replace(/^\n|\n$/g, "");

const OWL_WIDTH = Math.max(...OWL.split("\n").map((l) => l.length));
const ART_WIDTH = Math.max(...ART.split("\n").map((l) => l.length));

export function Banner() {
  return (
    <Box alignItems="flex-end">
      <Box width={OWL_WIDTH}  marginRight={1}>
        <Text color="cyan">{OWL}</Text>
      </Box>
      <Box width={ART_WIDTH}>
        <Text color="cyan">{ART}</Text>
      </Box>
    </Box>
  );
}
