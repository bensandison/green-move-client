import { Box, Text } from "@chakra-ui/react";

export default function QualityCard({ title, value, percent }) {
	percent = 70;
	const roundedPercent = Math.ceil(percent / 5) * 5;

	let barColour = "green";
	if (percent < 85) barColour = "orange";
	if (percent < 60) barColour = "red";

	return (
		<Box borderWidth={2} borderRadius="md" p={3}>
			<Text fontSize="lg" fontWeight="semibold">
				{title}
			</Text>
			<Text fontSize="2xl" fontWeight="semibold">
				{value}
			</Text>
			<Box background="#eee" height="2" borderRadius="xl" width="100%">
				<Box
					background={barColour}
					height="2"
					borderRadius="xl"
					width={roundedPercent + "%"}
				></Box>
			</Box>
		</Box>
	);
}
