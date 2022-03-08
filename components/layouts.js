import Header from "./header";

// Shared layout between multiple pages:
export default function Layout({ children }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}
