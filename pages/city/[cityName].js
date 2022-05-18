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

  let location = cityData.name.toUpperCase();
  let locationCode = "";
  for (let i = 0; i < location.length; i++) {
    if (location[i] == "-") {
      locationCode = locationCode + "%20";
    } else {
      locationCode = locationCode + location[i];
    }

    if (i % 2 !== 0) {
      locationCode = locationCode + "/";
    }
  }

  const resRightmoveCode = await fetch(
    `https://www.rightmove.co.uk/typeAhead/uknostreet/${locationCode}`
  );

  const isJson = resRightmoveCode.headers
    .get("content-type")
    ?.includes("application/json");

  if (isJson && !resRightmoveCode.error) {
    let locationIdData = await resRightmoveCode.json();
    let locationId = locationIdData.typeAheadLocations[0].locationIdentifier;

    if (locationId == "REGION^94643") {
      locationId = "REGION^1295";
    }
    const resProperties = await fetch(
      `https://www.rightmove.co.uk/api/_search?locationIdentifier=${locationId}&numberOfPropertiesPerPage=24&radius=1.0&sortType=2&index=0&includeSSTC=false&viewType=LIST&channel=BUY&areaSizeUnit=sqft&currencyCode=GBP&isFetching=false&viewport=`
    );
    rightmoveProperties = await resProperties.json();
  }

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
            propertyType={item.propertySubType}
          />
        );
      }
    });
  }

  return (
    <Flex
      gap={4}
      maxW="container.md"
      direction="column"
      py={4}
      m="auto"
      px={[4, 10, 10]}
    >
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

      <Box mb={4}>
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
          <Box mb={8}>
            <Heading
              as="h4"
              size="md"
              color="blackAlpha.800"
              pb={[1, 2, 2]}
              mb={1}
            >
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

          <Box mb={6}>
            <Heading as="h1" size="lg" color="blackAlpha.900">
              Environmental Rating
            </Heading>
            <Stack mt={4} direction="row" spacing={1}>
              <MultiLeafScore score={cityData.rating}></MultiLeafScore>
              <Box>
                <Text
                  fontWeight="semibold"
                  fontSize="3xl"
                  alignSelf="flex-end"
                  ml="12px"
                >
                  {cityData.rating}
                </Text>
              </Box>
            </Stack>
          </Box>
          <Box mb={4}>
            <Box display="flex" justifyContent="space-between" mb={4}>
              <Heading as="h2" size="md" color="blackAlpha.800">
                Qualities
              </Heading>
              <Text ml={2} fontWeight="semibold" color="blackAlpha.700">
                *per 10,000 population
              </Text>
            </Box>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              <QualityCard
                title="Air Quality"
                value={cityData.air_quality_label}
                percent={cityData.air_quality}
              />
              <QualityCard
                title="Population Density"
                value={`${cityData.population_density}/km\u00B2`}
                percent={cityData.percentages.population_density}
              />
              <QualityCard
                title="Greenspace"
                value={`${cityData.greenspace_area_ratio}/km\u00B2`}
                percent={cityData.percentages.greenspace_area_ratio}
              />
              <QualityCard
                title="Park average area"
                value={`${cityData.park_average_area} km\u00B2`}
                percent={cityData.percentages.park_average_area}
              />
              <QualityCard
                title="Number of Parks*"
                value={`${cityData.park_population_ratio}`}
                percent={cityData.percentages.park_population_ratio}
              />
              <QualityCard
                title="Bus stops*"
                value={`${cityData.bus_stop_population_ratio}`}
                percent={cityData.percentages.bus_stop_population_ratio}
              />
              <QualityCard
                title="Bicycle parking*"
                value={`${cityData.bicycle_parking_population_ratio}`}
                percent={cityData.percentages.bicycle_parking_population_ratio}
              />
              <QualityCard
                title="Walking routes"
                value={`${cityData.walking_routes_ratio}/km\u00B2`}
                percent={cityData.percentages.walking_routes_ratio}
              />
              <QualityCard
                title="Cycling routes"
                value={`${cityData.cycling_routes_ratio}/km\u00B2`}
                percent={cityData.percentages.cycling_routes_ratio}
              />
            </SimpleGrid>
          </Box>
          <Box mb={4}>
            <Heading as="h2" size="md" mb={4} color="blackAlpha.800">
              Properties
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              <PropertyCard
                emojiSymbol="📏"
                emojiLabel="Straight Ruler"
                title="Area"
                value={`${cityData.area} km\u00B2`}
              />
              <PropertyCard
                emojiSymbol="🌳"
                emojiLabel="Deciduous Tree"
                title="Greenspace Area"
                value={`${cityData.greenspace_area} km\u00B2`}
              />
              <PropertyCard
                emojiSymbol="🥾"
                emojiLabel="Hiking Boot"
                title="Walking routes"
                value={`${cityData.walking_routes_length} km\u00B2`}
              />
              <PropertyCard
                emojiSymbol="🚴"
                emojiLabel="Person Biking"
                title="Cycling routes"
                value={`${cityData.cycling_routes_length} km\u00B2`}
              />
              <PropertyCard
                emojiSymbol="🧍"
                emojiLabel="Person Standing"
                title="Population"
                value={cityData.population}
              />
              <PropertyCard
                emojiSymbol="🦖"
                emojiLabel="T-Rex"
                title="Parks"
                value={cityData.park_quantity}
              />
              <PropertyCard
                emojiSymbol="🚗"
                emojiLabel="Automobile"
                title="Registered Vehicle's"
                value={cityData.vehicle_quantity}
              />
              <PropertyCard
                emojiSymbol="🚏"
                emojiLabel="Bus Stop"
                title="Bus stops"
                value={cityData.bus_stop_quantity}
              />
              <PropertyCard
                emojiSymbol="🚲"
                emojiLabel="Bicycle"
                title="Bicycle Parking"
                value={cityData.bicycle_parking_quantity}
              />
            </SimpleGrid>
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={4} color="blackAlpha.800">
              Property Listings
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
