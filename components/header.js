import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import leafLogoSVG from "../public/leaf-logo.svg";
import Router from "next/router";

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
				zIndex: "99",
			}}
		>
			<Container maxW="container.lg" height="100%">
				<HStack
					as="nav"
					gap={0}
					py={2}
					justify="flex-start"
					align="center"
					color="white"
					h="100%"
					textAlign="center"
					fontWeight="bold"
				>
					<Flex
						_hover={navItemStylesHover}
						align="center"
						borderRadius="xl"
						py={1}
						px={2}
						onClick={() => {
							Router.push(`/`);
						}}
					>
						<Image
							src={leafLogoSVG}
							alt="leaf-logo"
							width={30}
							height={30}
						></Image>
						<Text>GreenMove.</Text>
					</Flex>
				</HStack>
			</Container>
		</Box>
	);
}
