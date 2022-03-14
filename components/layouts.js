import Header from "./header";
import { Container } from "@chakra-ui/react";

// Shared layout between multiple pages:
export default function Layout({ children }) {
	return (
		<>
			<Header />
			<Container as="main" maxW="container.lg">
				{children}
			</Container>
		</>
	);
}
