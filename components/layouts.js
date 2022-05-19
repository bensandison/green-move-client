import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import greenMoveLogo from "../public/green-move-logo.svg";

// Shared layout between multiple pages:
export default function Layout({ children }) {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>GreenMove.io - LIVE GREEN. MOVE GREEN</title>
				<meta
					name="description"
					content="Providing location based enviromental ratings. Helping you find the greenest place to live."
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/favicon/safari-pinned-tab.svg"
					color="#5c913b"
				/>
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="theme-color" content="#ffffff" />
				<script async defer data-website-id="d6cd83a0-e485-4dcc-91f0-674c1c6e75a1" src="https://greenmove-stats.herokuapp.com/umami.js"></script>
			</Head>
			<Box maxW="container.md" py={4} m="auto">
				<Box
					as="button"
					onClick={(e) => {
						e.preventDefault();
						router.push("/");
					}}
				>
					<Image
						src={greenMoveLogo}
						alt="leaf-logo"
						height="25"
						width="180"
					></Image>
				</Box>
			</Box>
			<Box px={4} as="main" pb={16}>
				{children}
			</Box>
			<Box position="relative" maxW="container.md" py={4} m="auto">
				<Box position="absolute" bottom={6} right={6}>
					<Text>&copy; 2022 GreenMove.io</Text>
				</Box>
			</Box>
		</>
	);
}
