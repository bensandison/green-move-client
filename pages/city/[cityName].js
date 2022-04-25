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
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
import InfoCard from "../../components/infoCard";
import SearchBar from "../../components/searchBar";
import Mapbox from "../../components/map.js";
import MultiLeafScore from "../../components/multiLeafScore";

export async function getStaticPaths() {
	// Get city names from API:
	const res = await fetch(`https://api.greenmove.io/places/all`);
	const data = await res.json();
	const cityData = data.data;

	// Define city paths with city names:
	const cityPaths = cityData.map((city) => ({
		params: { cityName: city.name.toLowerCase() },
	}));

	// Return city names to getStaticProps:
	return {
		paths: cityPaths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// Get data for current city:
	const res = await fetch(
		`https://api.greenmove.io/places/search?name=${params.cityName}`
	);
	const data = await res.json();
	const cityData = data.data;

	// Manually force 404:
	if (!cityData) return { notFound: true };


    //get data for all cities
    const resAll = await fetch(
        'https://api.greenmove.io/places/all'
    )

	const allData = await resAll.json()
    const allPlaces = allData.data

	// Send data to cityData function:
	return { props: { cityData: cityData, allPlaces: allPlaces } };
}

export default function CityData({ cityData, allPlaces }) {
	
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
						<AlertDescription>This city was not found</AlertDescription>
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
								longitude={cityData.longitude}
								latitude={cityData.latitude}
								startingZoom={10}
								allPlaces={allPlaces}
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
