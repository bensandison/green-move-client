import { Container } from "@chakra-ui/react";

// Shared layout between multiple pages:
export default function Layout({ children }) {
	return (
		<>
			<Container as="main" maxW="container.lg">
				{children}
			</Container>
		</>
	);
}
