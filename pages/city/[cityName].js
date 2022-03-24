/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex, AspectRatio, Text, SimpleGrid, Box } from "@chakra-ui/react";
import InfoCard from "../../components/infoCard";
import SearchBar from "../../components/searchBar";

export default function CityData() {
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
			`https://greenmove-api.herokuapp.com/city/search?name=${cityName}`
		);
		let data = await res.json();
		data = data.data;
		setCityData(data);
	}

	// If no city data:
	if (!cityData) return <p>loading...</p>;
	if (cityData) console.log(cityData);
	return (
		<Flex maxW="container.md" direction="column" py={4} m="auto">
			<SearchBar value={cityData.name}></SearchBar>
			<AspectRatio my="4" ratio={[1, 2 / 1, 3 / 1]} borderRadius="md">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
					alt="demo"
				/>
			</AspectRatio>
			<Text fontWeight="semibold" fontSize="lg">
				Overall Rating
			</Text>
			<Text fontWeight="semibold" fontSize="7xl" mt={-5}>
				{cityData.rating}
			</Text>
			<Text fontWeight="semibold" fontSize="lg">
				Detailed Information
			</Text>
			<SimpleGrid my="2" columns={[2, 3, 4]} spacing={4}>
				<InfoCard title="Air Quality" value={cityData.air_quality}></InfoCard>
				<InfoCard title="Population" value={cityData.pop}></InfoCard>
				{/* Some random dummy data... */}
				<InfoCard title="Green Space" value="25%"></InfoCard>
				<InfoCard title="Number Of Parks" value="11"></InfoCard>
				<InfoCard title="Water Quality" value="67%"></InfoCard>
			</SimpleGrid>
		</Flex>
	);
}
