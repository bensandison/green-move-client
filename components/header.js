import { Box, Container, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import leafLogoSVG from "../public/leaf-logo.svg";

const navItemStylesHover = {
	bgColor: "white",
	color: "teal.500",
	cursor: "pointer",
};

export default function Header() {
	return (
		<Box
			as="header"
			bgColor="teal.500"
			sx={{
				position: "-webkit-sticky",
				position: "sticky",
				top: "0",
			}}
		>
			<Container maxW="container.xl" height="100%">
				<HStack
					as="nav"
					gap={4}
					mx={3}
					py={2}
					justify="flex-start"
					align="center"
					color="white"
					h="100%"
					textAlign="center"
					fontWeight="bold"
				>
					<HStack _hover={navItemStylesHover} align="center" borderRadius="xl">
						<Image
							src={leafLogoSVG}
							alt="leaf-logo"
							width={40}
							height={40}
						></Image>
						<Text>GreenMove.</Text>
					</HStack>
				</HStack>
			</Container>
		</Box>
	);
}
