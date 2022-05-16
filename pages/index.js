import Head from "next/head";
import { Flex, Box, Heading, Wrap, Container, Spacer } from "@chakra-ui/react";
import SearchBar from "../components/searchBar";
import Image from "next/image";
import { useRouter } from "next/router";
import greenMoveLogo from "../public/green-move-logo.svg";

export default function Home() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>GreenMove</title>
				<meta name="description" content="GreenMove..." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex gap={4} maxW="container.md" direction="column" py={4} mx="auto">
				<Box
					as="button"
					mr="auto"
					onClick={(e) => {
						e.preventDefault();
						router.push("/");
					}}
				>
					<Image
						priority
						src={greenMoveLogo}
						alt="leaf-logo"
						height="25"
						width="180"
					></Image>
				</Box>
				<Flex
					mt={10}
					justifyContent="center"
					flexDirection="row"
					px="auto"
					flexWrap="wrap"
				>
					<Heading as="h1" pr="2" fontSize={[30, 40, 50]} textAlign="center">
						Live Green.
					</Heading>
					<Heading as="h1" fontSize={[30, 40, 50]} textAlign="center">
						Move Green.
					</Heading>
				</Flex>
				<Heading textAlign="center" fontSize={[18, 22, 25]}>
					Providing location based enviromental ratings. Helping you find the
					greenest place to live.
				</Heading>
				<SearchBar value="Enter city name"></SearchBar>
			</Flex>
		</>
	);
}
