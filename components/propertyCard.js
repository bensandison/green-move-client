import { Box, Text } from "@chakra-ui/react";
import Emoji from 'a11y-react-emoji';

export default function PropertyCard({ emojiSymbol, emojiLabel, title, value }) {
	return (
		<Box borderWidth={2} borderRadius="md" p={3}>
			<Text fontSize="lg" fontWeight="semibold" mb={2}>
				{title}
			</Text>
			<Box fontSize="3xl">
				{emojiSymbol !== undefined &&
					<Emoji symbol={emojiSymbol} label={emojiLabel} />
				}
				<Text fontWeight="semibold" display="inline-block" ml={1}>
					{value !== null ? value : 'N/A'}
				</Text>
			</Box>
		</Box>
	);
}
