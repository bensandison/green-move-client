import { Box, Container } from "@chakra-ui/react";

// Shared layout between multiple pages:
export default function Layout({ children }) {
	return (
		<>
			<Box as="main">{children}</Box>
		</>
	);
}
