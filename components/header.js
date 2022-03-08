import { Box, Flex, Text } from "@chakra-ui/react";

export default function Header() {
	return (
		<Box
			as="header"
			h={16}
			bgColor="teal.500"
			sx={{
				position: "-webkit-sticky",
				position: "sticky",
				top: "0",
			}}
		>
			<Flex
				as="nav"
				mx={3}
				flexDir="row"
				justify="flex-start"
				align="center"
				color="white"
				h="100%"
				textAlign="center"
				fontWeight="bold"
			>
				<NavItem>Item1</NavItem>
				<NavItem>Item2</NavItem>
			</Flex>
		</Box>
	);
}

function NavItem({ children }) {
	return (
		<Text
			p={3}
			m={1}
			borderRadius="xl"
			_hover={{
				bgColor: "white",
				color: "teal.500",
				cursor: "pointer",
			}}
		>
			{children}
		</Text>
	);
}
