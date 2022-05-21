import {
  Flex,
  Box,
  Heading,
  Wrap,
  Container,
  Spacer,
  AspectRatio,
  Text,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import greenMoveLogo from "../public/green-move-logo.svg";
import InteractiveMap from "../components/interactiveMap";
import Top5Card from "../components/top5card";
import SearchBarAuto from "../components/searchBarAuto";
import { MapProvider } from "../components/mapContext";
export async function getStaticProps() {
  //get data for all cities
  const res = await fetch("https://api.greenmove.io/places/all");

  const data = await res.json();
  const allPlaces = data.data;

  const sortedPlaces = allPlaces.sort((a, b) => {
    return b.rating - a.rating;
  });

  const top5Places = sortedPlaces.slice(0, 5);

  const cityNames = allPlaces.map((city, i) => {
    return city.name;
  });

  return {
    props: {
      allPlaces: allPlaces,
      top5Places: top5Places,
      cityNames: cityNames,
    },
  };
}

export default function Home({ allPlaces, top5Places, cityNames }) {
  const router = useRouter();

  return (
    <>
      <Flex gap={4} maxW="container.md" direction="column" py={4} mx="auto">
        <Box my={20} mx={5}>
          <Flex
            justifyContent="center"
            flexDirection="row"
            px="auto"
            flexWrap="wrap"
          >
            <Heading
              as="h1"
              fontSize={[30, 40, 50]}
              fontWeight="extrabold"
              textAlign="center"
              textTransform="uppercase"
            >
              Live Green. Move Green.
            </Heading>
          </Flex>
          <Heading pt={3} textAlign="center" fontSize={[18, 22, 25]}>
            Providing location based enviromental ratings. Helping you find the
            greenest place to live.
          </Heading>
        </Box>
        <SearchBarAuto suggestions={cityNames}></SearchBarAuto>

        <Box mt={12} mb={6}>
          <Heading as="h3" fontWeight="semibold" fontSize="2xl" mb={4}>
            Top 5 Cities
          </Heading>
          <SimpleGrid mt="2" columns={[1, 2, 5]} spacing={4}>
            {top5Places.map((item, i) => {
              return (
                <Top5Card
                  key={i}
                  num={i + 1}
                  title={item.name}
                  value={item.rating}
                  lines={1}
                ></Top5Card>
              );
            })}
          </SimpleGrid>
        </Box>

        <Box>
          <Heading
            as="h3"
            fontWeight="semibold"
            fontSize="2xl"
            mb={4}
            display="flex"
            justifyContent={"space-between"}
          >
            Interactive Map
            <Button
              onClick={() => {
                router.push("/map");
              }}
            >
              View Fullscreen
            </Button>
          </Heading>
          <AspectRatio
            mb={10}
            ratio={[1, 1, 2 / 1]}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="xl"
          >
            <MapProvider>
              <div>
                <InteractiveMap
                  longitude={-3}
                  latitude={53}
                  startingZoom={5}
                  showAll={true}
                  allPlaces={allPlaces}
                ></InteractiveMap>
              </div>
            </MapProvider>
          </AspectRatio>
        </Box>
      </Flex>
    </>
  );
}
