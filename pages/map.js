import Mapbox from "../components/map";

import { useEffect, useState } from "react";
import CityData from "./city/[cityName]";

export async function getStaticProps() {
  //get data for all cities
  const res = await fetch("https://api.greenmove.io/places/all");

  const data = await res.json();
  const allPlaces = data.data;

  if (!allPlaces) return { notFound: true };

  console.log(allPlaces);

  return { props: { allPlaces: allPlaces } };
}

export default function MapPage({ allPlaces }) {
  return (
    <Mapbox
      longitude={3}
      latitude={55}
      startingZoom={2}
      showAll={true}
      allPlaces={allPlaces}
    ></Mapbox>
  );
}
