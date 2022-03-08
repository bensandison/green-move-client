import Navbar from "./navbar";

// Shared layout between multiple pages:
export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}
