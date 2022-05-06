// import 'https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css'
import "mapbox-gl";
import mapboxgl from "!mapbox-gl";
import React, { useRef, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
// import ReactMapGL, { Marker } from 'react-map-gl'

export default function Mapbox({
  longitude,
  latitude,
  startingZoom,
  cityBoundary,
  allPlaces,
}) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2FsZWJwZXJjaXZhbCIsImEiOiJjbDBncW4wMjMwMGF5M29vMm54Z3V5OHUzIn0.g-0lgFtFCuhbov3ppFMXqQ";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(startingZoom);
  const [boundary, setBoundary] = useState(cityBoundary);

  useEffect(() => {
    if (map.current) {
      map.current.remove();
      setLng(longitude);
      setLat(latitude);
      setBoundary(cityBoundary);
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom: zoom,
      minZoom: zoom,
      maxZoom: zoom,
      maxBounds: [
        [lng, lat],
        [lng, lat],
      ],
    });
    mapContainer.current.classList.add("map");
  });

  const [cities, setCities] = useState();

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("load", () => {
      map.current.addSource("boundary", {
        type: "geojson",
        data: boundary,
      });

      map.current.addLayer({
        id: "cityBoundary",
        type: "line",
        source: "boundary",
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    });
  }, []);

  return <div ref={mapContainer} className="map-container" />;
}
