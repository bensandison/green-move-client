import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layouts";
import styles from '../components/map.css'

// Wraps all pages in <Layout>
function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
