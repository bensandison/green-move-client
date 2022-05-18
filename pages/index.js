import Head from "next/head";
import {
	Flex,
	Box,
	Heading,
	Wrap,
	Container,
	Spacer,
	AspectRatio,
	Text,
	SimpleGrid,
} from "@chakra-ui/react";
import SearchBar from "../components/searchBar";
import Image from "next/image";
import { useRouter } from "next/router";
import greenMoveLogo from "../public/green-move-logo.svg";
import InteractiveMap from "../components/interactiveMap";
import Top5Card from "../components/top5card";

export async function getStaticProps() {
	//get data for all cities
	const res = await fetch("https://api.greenmove.io/places/all");

	const data = await res.json();
	const allPlaces = data.data;

	const sortedPlaces = allPlaces.sort((a, b) => {
		return b.rating - a.rating;
	});

	const top5Places = sortedPlaces.slice(0, 5);

	return { props: { allPlaces: allPlaces, top5Places: top5Places } };
}

export default function Home({ allPlaces, top5Places }) {
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
				<Box my={20} mx={5}>
					<Flex
						justifyContent="center"
						flexDirection="row"
						px="auto"
						flexWrap="wrap"
					>
						<Heading as="h1" pr="3" fontSize={[30, 40, 50]} textAlign="center">
							Live Green.
						</Heading>
						<Heading as="h1" fontSize={[30, 40, 50]} textAlign="center">
							Move Green.
						</Heading>
					</Flex>
					<Heading pt={3} textAlign="center" fontSize={[18, 22, 25]}>
						Providing location based enviromental ratings. Helping you find the
						greenest place to live.
					</Heading>
				</Box>
				<SearchBar
					value="Enter city name"
					containerProps={{ mb: 50 }}
				></SearchBar>

				<Box>
					<Heading as="h3" fontWeight="semibold" fontSize="2xl">
						Top 5 Cities
					</Heading>
					<SimpleGrid mt="2" columns={[1, 2, 5]} spacing={4}>
						{top5Places.map((item, i) => {
							return (
								<Top5Card
									key={i}
									num={i + 1}
									title={item.name}
									value={item.rating}
									lines={1}
								></Top5Card>
							);
						})}
					</SimpleGrid>
				</Box>

				<Box>
					<Heading as="h3" fontWeight="semibold" fontSize="2xl">
						Interactive Map
					</Heading>
					<AspectRatio
						mt={2}
						mb={10}
						ratio={[1, 1, 2 / 1]}
						borderRadius="lg"
						overflow="hidden"
						boxShadow="xl"
					>
						<InteractiveMap
							longitude={3}
							latitude={55}
							startingZoom={2}
							showAll={true}
							allPlaces={allPlaces}
						></InteractiveMap>
					</AspectRatio>
				</Box>
			</Flex>
		</>
	);
}
