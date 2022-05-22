import { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import InteractiveMap from "../components/interactiveMap";
import { MapProvider } from "../components/mapContext";
import CityData from "./city/[cityName]";
import { useRouter } from "next/router";

export async function getStaticProps() {
  //get data for all cities
  const res = await fetch("https://api.greenmove.io/places/all");

  const data = await res.json();
  const allPlaces = data.data;

  return { props: { allPlaces: allPlaces } };
}

export default function MapPage({ allPlaces }) {
  const router = useRouter();
  return (
    <Box position="relative" width="100%">
      <Box
        position="absolute"
        zIndex={99}
        top={4}
        left={4}
      >
        <Button

          borderColor="gray"
          borderWidth={1}
          onClick={() => {
            router.push("/");
          }}
        >
          Back
        </Button>
      </Box>
      <MapProvider>
        <InteractiveMap
          longitude={-3}
          latitude={53.7}
          startingZoom={5}
          showAll={true}
          allPlaces={allPlaces}
        ></InteractiveMap>
      </MapProvider>
      <Box
        position="absolute"
        bottom={0}
        right={0}
        p={1}
        backgroundColor="whiteAlpha.800"
      >
        <Text>&copy; 2022 GreenMove.io</Text>
      </Box>
    </Box>
  );
}
