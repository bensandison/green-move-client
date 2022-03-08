import Layout from "../components/layouts";

// Wraps all pages in <Layout>
function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
