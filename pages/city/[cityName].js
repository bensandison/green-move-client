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
	Button,
} from "@chakra-ui/react";
import PropertyCard from "../../components/propertyCard";
import QualityCard from "../../components/qualityCard";
import SearchBar from "../../components/searchBar";
import Mapbox from "../../components/map.js";
import MultiLeafScore from "../../components/multiLeafScore";
import greenMoveLogo from "../../public/green-move-logo.svg";
import Property from "../../components/property";
import Image from "next/image";

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

	//get city boundary
	const resBoundary = await fetch(
		`https://api.greenmove.io/places/${cityData.place_id}/boundary`
	);

	const boundaryData = await resBoundary.json();
	const cityBoundary = boundaryData.data;

	//get properties from rightmove:
	let rightmoveProperties = null; //stores properties

	// let location = cityData.name.toUpperCase();
	// let locationCode = "";
	// for (let i = 0; i < location.length; i = i + 2) {
	// 	locationCode = locationCode + location.slice(i, i + 2) + "/";
	// }

	// const resRightmoveCode = await fetch(
	// 	`https://www.rightmove.co.uk/typeAhead/uknostreet/${locationCode}`
	// );

	// const isJson = resRightmoveCode.headers
	// 	.get("content-type")
	// 	?.includes("application/json");

	// if (isJson && !resRightmoveCode.error) {
	// 	let locationIdData = await resRightmoveCode.json();
	// 	let locationId = locationIdData.typeAheadLocations[0].locationIdentifier;
	// 	const resProperties = await fetch(
	// 		`https://www.rightmove.co.uk/api/_search?locationIdentifier=${locationId}&numberOfPropertiesPerPage=24&radius=1.0&sortType=2&index=0&includeSSTC=false&viewType=LIST&channel=BUY&areaSizeUnit=sqft&currencyCode=GBP&isFetching=false&viewport=`
	// 	);
	// 	rightmoveProperties = await resProperties.json();
	// }

	// Send data to cityData function:
	return {
		props: {
			cityData: cityData,
			cityBoundary: cityBoundary,
			rightmoveProperties: rightmoveProperties,
		},
	};
}

export default function CityData({
	cityData,
	cityBoundary,
	rightmoveProperties,
}) {
	const router = useRouter();

	// If theres an error with properties:
	let propertyListings = <Text>Null</Text>;
	if (rightmoveProperties) {
		const propertyListingsArray = rightmoveProperties.properties.splice(0, 9);
		propertyListings = propertyListingsArray.map((item, i) => {
			if (item.propertyImages.mainImageSrc) {
				return (
					<Property
						location={item.displayAddress}
						summary={item.summary}
						price={item.price.amount}
						bedrooms={item.bedrooms}
						bathrooms={item.bathrooms}
						imageSrc={item.propertyImages.mainImageSrc}
					/>
				);
			}
		});
	}

	return (
		<Flex gap={4} maxW="container.md" direction="column" py={4} m="auto">
			<Box
				as="button"
				mr="auto"
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
						<Heading size="md" fontWeight="semibold" pb={[1, 2, 2]}>
							{`${cityData.name}, ${cityData.county}, ${cityData.country}`}
						</Heading>
						<AspectRatio
							ratio={[1, 2 / 1, 5 / 2]}
							borderRadius="lg"
							overflow="hidden"
							boxShadow="lg"
						>
							<Mapbox
								longitude={cityData.longitude}
								latitude={cityData.latitude}
								startingZoom={10}
								cityBoundary={cityBoundary}
								area={cityData.area}
							></Mapbox>
						</AspectRatio>
					</Box>

					<Box>
						<Heading fontWeight="semibold" fontSize="lg">
							Enviromental Rating
						</Heading>
						<Stack mt="2" direction="row" spacing={1}>
							<MultiLeafScore score={cityData.rating}></MultiLeafScore>
							<Text fontWeight="semibold" fontSize="3xl" alignSelf="flex-end">
								{cityData.rating}
							</Text>
						</Stack>
					</Box>
					<Box>
						<Heading fontWeight="medium" fontSize="lg">
							Qualities:
						</Heading>
						<SimpleGrid mt="2" columns={[2, 3, 4]} spacing={4}>
							<QualityCard
								title="Air Quality"
								value={cityData.air_quality_label}
								percent={cityData.air_quality}
							/>
							<QualityCard
								title="Population Density"
								value={`${cityData.population_density}/km\u00B2`}
							/>
							<QualityCard
								title="Greenspace Ratio"
								value={`${cityData.greenspace_area_ratio}/km\u00B2`}
							/>
							<QualityCard
								title="Park Ratio"
								value={`${cityData.park_area_ratio}/km\u00B2`}
							/>
							<QualityCard
								title="Park average area"
								value={`${cityData.park_average_area}m\u00B2`}
							/>
							<QualityCard
								title="People per park"
								value={`${cityData.park_population_ratio}/1km\u00B2`}
							/>
							<QualityCard
								title="People per bus stop"
								value={`${cityData.bus_stop_population_ratio}/1`}
							/>
							<QualityCard
								title="People per bicycle parking"
								value={`${cityData.bicycle_parking_population_ratio}/1`}
							/>
							<QualityCard
								title="Walking routes ratio"
								value={`${cityData.walking_routes_ratio}/m\u00B2`}
							/>
							<QualityCard
								title="Cycling routes ratio"
								value={`${cityData.cycling_routes_ratio}/m\u00B2`}
							/>
						</SimpleGrid>
					</Box>
					<Box>
						<Heading fontWeight="medium" fontSize="lg">
							Properties:
						</Heading>
						<SimpleGrid mt="2" columns={[2, 3, 3]} spacing={4}>
							<PropertyCard title="Population" value={cityData.population} />
							<PropertyCard title="Area" value={`${cityData.area}km\u00B2`} />
							<PropertyCard
								title="Greenspace Area"
								value={`${cityData.greenspace_area}km\u00B2`}
							/>
							<PropertyCard
								title="Number of Parks"
								value={cityData.park_quantity}
							/>
							<PropertyCard
								title="Registered Vehicle's"
								value={cityData.vehicle_quantity}
							/>
							<PropertyCard
								title="Bus stops"
								value={cityData.bus_stop_quantity}
							/>
							<PropertyCard
								title="Bicycle Parking"
								value={cityData.bicycle_parking_quantity}
							/>
							<PropertyCard
								title="Walking routes length"
								value={`${cityData.walking_routes_length}m`}
							/>
							<PropertyCard
								title="Cycling routes length"
								value={`${cityData.cycling_routes_length}m`}
							/>
						</SimpleGrid>
					</Box>
					<Box>
						<Heading fontWeight="medium" fontSize="lg">
							Property Listings:
						</Heading>
						<SimpleGrid mt="2" columns={[1, 2, 3]} spacing={4}>
							{propertyListings}
						</SimpleGrid>
					</Box>
				</>
			)}
		</Flex>
	);
}
