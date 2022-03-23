import { Box, Text } from "@chakra-ui/react";

export default function InfoCard({ title, value }) {
	return (
		<Box borderWidth={2} borderRadius="md" p={3}>
			<Text fontSize="lg" fontWeight="semibold">
				{title}
			</Text>
			<Text fontSize="3xl" fontWeight="semibold">
				{value}
			</Text>
		</Box>
	);
}
