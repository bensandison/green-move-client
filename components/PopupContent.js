import React, { useContext } from "react";
import { mapContext } from "./mapContext.js";
import {
  Box,
  Button,
  Text,
  Heading,
  Stack,
  Image,
  Flex,
  AspectRatio,
  Badge,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import MultiLeafScore from "./multiLeafScore";

export default function PopupContent({ label, rating }) {
  const { goToCity } = useContext(mapContext);

  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Stack mt="2" direction="row" spacing={1}>
        <MultiLeafScore score={rating}></MultiLeafScore>
      </Stack>

      <Button mt="3" size="sm" onClick={() => goToCity({ label })}>
        Find Out More
        <ArrowForwardIcon w="6" h="6" ml="2" />
      </Button>
    </Box>
  );
}
