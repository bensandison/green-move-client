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
import Mapbox from '../../components/map.js'
import MultiLeafScore from "../../components/multiLeafScore";

export default function CityData() {
	// loading + error state for fetch
	const [loading, setLoading] = useBoolean(true);
	const [error, setError] = useState();

	const [cityData, setCityData] = useState();

	// Call api with city name when router is ready:
	const router = useRouter();
	useEffect(() => {
		if (!router.isReady) return;

		// Get data
		getData();
	}, [router.isReady]);

	async function getData() {
		const { cityName } = await router.query;

		const res = await fetch(
			`https://api.greenmove.tk/city/search?name=${cityName}`
		);
		let data = await res.json();

		if (data.status == "success") {
			setCityData(data.data);
		} else if (data.status == "fail") {
			// Set error message state:
			setError(data.message);
		}

		return setLoading.off();
	}

	// Loading screen:
	if (loading)
		return (
			<Flex gap={4} align="center" justify="center" height="90vh">
				<Spinner size="lg"></Spinner>
				<Text fontSize="xl">Loading Data...</Text>
			</Flex>
		);

	return (
		<Flex gap={4} maxW="container.md" direction="column" py={4} m="auto">
			<Box>
				<SearchBar
					value={cityData ? cityData.name : "Enter City Name"}
				></SearchBar>
				{error && (
					<Alert mt={2} status="error">
						<AlertIcon></AlertIcon>
						<AlertTitle>Search Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}
			</Box>
			{!error && cityData && (
				<>
					<Box>
						<Heading size="md" fontWeight="medium" pb="2">
							{`${cityData.name}, ${cityData.county}, ${cityData.country}`}
						</Heading>
						<AspectRatio ratio={[1, 2 / 1, 3 / 1]} borderRadius="md">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
								alt="demo"
							/>
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
