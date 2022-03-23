import { Box, Text } from "@chakra-ui/react";

export default function InfoCard() {
	return (
		<Box borderWidth={2} borderRadius="md" p={3}>
			<Text fontSize="lg" fontWeight="semibold">
				Green Space:
			</Text>
			<Text fontSize="3xl" fontWeight="semibold">
				54%
			</Text>
		</Box>
	);
}
