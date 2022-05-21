import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layouts";
import styles from "../components/map.css";

import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const shadows = {
  outline: "0 0 0 3px var(--chakra-colors-green-400)",
};
const theme = extendTheme({ shadows });

// Wraps all pages in <Layout>
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
