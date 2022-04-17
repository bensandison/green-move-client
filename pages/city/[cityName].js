/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	Flex,
	AspectRatio,
	Text,
	SimpleGrid,
	Box,
	Stack,
	Heading,
	useBoolean,
	Skeleton,
	Spinner,
	Progress,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	InputGroup,
	InputRightElement,
	Input,
	Container,
} from "@chakra-ui/react";
import InfoCard from "../../components/infoCard";
import SearchBar from "../../components/searchBar";
import { SearchIcon } from "@chakra-ui/icons";
import Mapbox from "../../components/map.js";
import MultiLeafScore from "../../components/multiLeafScore";

export async function getStaticPaths() {
	// Get city names from API:
	const res = await fetch(`https://api.greenmove.tk/city/all`);
	const data = await res.json();
	const cityData = data.data;

	// Define city paths with city names:
	const paths = cityData.map((city) => ({
		params: { cityName: city.name.toLowerCase() },
	}));

	// Return city names to getStaticProps:
	return {
		paths: paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// Get data for current city:
	const res = await fetch(
		`https://api.greenmove.tk/city/search?name=${params.cityName}`
	);
	let data = await res.json();

	// Send data to cityData function:
	return { props: { cityData: data.data } };
}

export default function CityData({ cityData }) {
	return (
		<Flex gap={4} maxW="container.md" direction="column" py={4} m="auto">
			<Box>
				<SearchBar
					value={cityData ? cityData.name : "Enter City Name"}
				></SearchBar>
				{!cityData && (
					<Alert mt={2} status="error">
						<AlertIcon></AlertIcon>
						<AlertTitle>Search Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}
			</Box>
			{cityData && (
				<>
					<Box>
						<Heading size="md" fontWeight="medium" pb="2">
							{`${cityData.name}, ${cityData.county}, ${cityData.country}`}
						</Heading>
						<AspectRatio ratio={[1, 2 / 1, 3 / 1]} borderRadius="md">
							<Mapbox
								longitude={cityData.lng}
								latitude={cityData.lat}
								startingZoom={10}
							></Mapbox>
						</AspectRatio>
					</Box>

					<Box>
						<Text fontWeight="semibold" fontSize="lg">
							Enviromental Rating
						</Text>
						<Stack mt="2" direction="row" spacing={1}>
							<MultiLeafScore score={cityData.rating}></MultiLeafScore>
							<Text fontWeight="semibold" fontSize="3xl" alignSelf="flex-end">
								{cityData.rating}
							</Text>
						</Stack>
					</Box>
					<Box>
						<Text fontWeight="semibold" fontSize="lg">
							Detailed Information
						</Text>
						<SimpleGrid mt="2" columns={[2, 3, 4]} spacing={4}>
							<InfoCard
								title="Air Quality"
								value={cityData.air_quality}
							></InfoCard>
							<InfoCard title="Population" value={cityData.pop}></InfoCard>
							{/* Some random dummy data... */}
							<InfoCard title="Green Space" value="25%"></InfoCard>
							<InfoCard title="Number Of Parks" value="11"></InfoCard>
							<InfoCard title="Water Quality" value="67%"></InfoCard>
						</SimpleGrid>
					</Box>
				</>
			)}
		</Flex>
	);
}
