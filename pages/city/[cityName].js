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
import Image from "next/image";

export async function getStaticPaths() {
  // Get city names from API:
  const res = await fetch(`https://greenmove-api.herokuapp.com/places/all`);
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
    `https://greenmove-api.herokuapp.com/places/search?name=${params.cityName}`
  );
  const data = await res.json();
  const cityData = data.data;

  // Manually force 404:
  if (!cityData) return { notFound: true };

  console.log(cityData);

  //get city boundary
  const resBoundary = await fetch(
    `https://greenmove-api.herokuapp.com/places/${cityData.place_id}/boundary`
  );

  const boundaryData = await resBoundary.json();
  const cityBoundary = boundaryData.data;

  // Send data to cityData function:
  return {
    props: {
      cityData: cityData,
      cityBoundary: cityBoundary,
    },
  };
}

export default function CityData({ cityData, cityBoundary }) {
  const router = useRouter();

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
            </SimpleGrid>
          </Box>
          <Box>
            <Heading fontWeight="medium" fontSize="lg">
              Properties:
            </Heading>
            <SimpleGrid mt="2" columns={[2, 3, 4]} spacing={4}>
              <PropertyCard title="Population" value={cityData.population} />
              <PropertyCard
                title="Vehicle Quantity"
                value={cityData.vehicle_quantity}
              />
              <PropertyCard
                title="Bus Stops"
                value={cityData.bus_stop_quantity}
              />
            </SimpleGrid>
          </Box>
        </>
      )}
    </Flex>
  );
}
