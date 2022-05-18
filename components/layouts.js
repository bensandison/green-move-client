import { Box, Container } from "@chakra-ui/react";

// Shared layout between multiple pages:
export default function Layout({ children }) {
	return (
		<>
			<Box px={4} as="main">
				{children}
			</Box>
		</>
	);
}
