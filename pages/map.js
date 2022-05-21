import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import InteractiveMap from "../components/interactiveMap";
import { MapProvider } from "../components/mapContext";
import CityData from "./city/[cityName]";

export async function getStaticProps() {
  //get data for all cities
  const res = await fetch("https://api.greenmove.io/places/all");

  const data = await res.json();
  const allPlaces = data.data;

  return { props: { allPlaces: allPlaces } };
}

export default function MapPage({ allPlaces }) {
  return (
    <MapProvider>
      <Box position="relative">
        <InteractiveMap
          longitude={-3}
          latitude={53.7}
          startingZoom={10}
          showAll={true}
          allPlaces={allPlaces}
        ></InteractiveMap>
        <Box position="absolute" bottom={0} right={0} p={1} backgroundColor="whiteAlpha.800">
          <Text>&copy; 2022 GreenMove.io</Text>
        </Box>
      </Box>
    </MapProvider>
  );
}
