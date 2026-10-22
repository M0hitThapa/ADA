import { Box, Text } from "ink";
import gradient from "gradient-string";

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

const grad = gradient([ "#FFBA08", "#E0D3DE",  "#F15946"]);

export function Banner() {
  return (
    <Box alignItems="flex-end" marginBottom={1}>
      <Box width={OWL_WIDTH}  marginRight={1}>
       <Text>{grad.multiline(OWL)}</Text>
      </Box>
      <Box width={ART_WIDTH}>
        <Text>{grad.multiline(ART)}</Text>
      </Box>
    </Box>
  );
}
