import SingleLeafScore from "./singleLeafScore";
import { Box, Stack } from "@chakra-ui/react";

export default function MultiLeafScore() {
	return (
		<Stack direction="row">
			<SingleLeafScore></SingleLeafScore>
		</Stack>
	);
}
