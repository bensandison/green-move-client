import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Top5Card({ num, title, value }) {
	const router = useRouter();

	return (
		<Box
			as="button"
			onClick={(e) => {
				e.preventDefault();
				router.push(`/city/${encodeURIComponent(title.toLowerCase())}`);
			}}
			pos="relative"
			borderWidth={2}
			borderRadius="md"
			p={3}
			_hover={{ boxShadow: "outline" }}
			_focusWithin={{ boxShadow: "outline" }}
		>
			<Box
				borderRadius="4xl"
				lineHeight={1}
				background="white"
				pos="absolute"
				left={-2.5}
				top={-2.5}
			>
				<Text fontSize="4xl" fontWeight="bold">
					{num}
				</Text>
			</Box>
			<Text
				ml={1}
				textAlign="left"
				fontSize="lg"
				fontWeight="semibold"
				noOfLines={1}
			>
				{title}
			</Text>
			<Text ml={1} textAlign="left" fontSize="3xl" fontWeight="semibold">
				{value}
			</Text>
		</Box>
	);
}
