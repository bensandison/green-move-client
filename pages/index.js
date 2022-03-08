import { Container } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
	return (
		<div>
			<Head>
				<title>GreenMove</title>
				<meta name="description" content="GreenMove..." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container h="200vh">
				<h1>Hello...</h1>
			</Container>
		</div>
	);
}
