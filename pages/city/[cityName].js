/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	InputGroup,
	InputRightElement,
	Input,
	Flex,
	Container,
	AspectRatio,
	Box,
	Text,
	Wrap,
	SimpleGrid,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import InfoCard from "../../components/infoCard";

export default function CityData() {
	const [cityData, setCityData] = useState();

	// Call api with city name when router is ready:
	const router = useRouter();
	useEffect(() => {
		if (!router.isReady) return;

		// Get data
		getData();
	}, [router.isReady]);

	function getData() {
		// TODO: Call api...

		const { cityName } = router.query;
		setCityData({
			name: cityName,
			mainScore: 4.5,
			greenSpace: 34,
			waterQuality: 67,
			airQuality: 82,
			numberOfParks: 34,
		});
	}

	// If no city data:
	if (!cityData) return <p>loading...</p>;
	return (
		<Flex maxW="container.md" direction="column" py={4}>
			<InputGroup>
				<InputRightElement pointerEvents="none">
					<SearchIcon />
				</InputRightElement>
				<Input type="" placeholder="City Name" value={cityData.name} />
			</InputGroup>
			<AspectRatio my="4" ratio={3 / 1} borderRadius="md">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
					alt="demo"
				/>
			</AspectRatio>
			<Text fontWeight="semibold" fontSize="lg">
				Detailed Information
			</Text>
			<SimpleGrid my="2" columns={4} spacing={4}>
				<InfoCard></InfoCard>
				<InfoCard></InfoCard>
				<InfoCard></InfoCard>
				<InfoCard></InfoCard>
				<InfoCard></InfoCard>
			</SimpleGrid>
		</Flex>
	);
}
