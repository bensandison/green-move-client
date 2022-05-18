import { Box, Text, Tooltip } from "@chakra-ui/react";

export default function QualityCard({ title, value, percent }) {
	const roundedPercent = Math.ceil(percent / 5) * 5;

	let barColour = "green";
	if (percent < 75) barColour = "orange";
	if (percent <= 25) barColour = "red";

	return (
		<Box display="flex" flexDir="column" justifyContent="space-between" borderWidth={2} borderRadius="md" p={3}>
			<Text fontSize="lg" fontWeight="semibold" mb={[1, 1, 4]}>
				{title}
			</Text>
			<Box>
				<Text fontSize="2xl" fontWeight="semibold" mb={2} display={['block', 'block', 'none']}>
					{value}
				</Text>
				{ percent !== undefined &&
					<Tooltip label={value} aria-label={value}>
						<Box py={[1, 1, 2]}>
							<Box background="#eee" height="2" borderRadius="xl" width="100%">
								<Box
									background={barColour}
									height="2"
									borderRadius="xl"
									width={roundedPercent + "%"}
								></Box>
							</Box>
						</Box>
					</Tooltip>
				}
			</Box>
		</Box>
	);
}
