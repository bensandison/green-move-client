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
  area,
}) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2FsZWJwZXJjaXZhbCIsImEiOiJjbDBncW4wMjMwMGF5M29vMm54Z3V5OHUzIn0.g-0lgFtFCuhbov3ppFMXqQ";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(startingZoom);
  const [boundary, setBoundary] = useState(cityBoundary);
  const [size, setSize] = useState(area);

  useEffect(() => {
    if (map.current) {
      map.current.remove();
      setLng(longitude);
      setLat(latitude);
      setBoundary(cityBoundary);
    }

    let newZoom;

    if (area < 30) {
      newZoom = 10;
    } else if (area > 30 && area < 61) {
      newZoom = 9;
    } else if (area > 60) {
      newZoom = 8;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom: newZoom,
      minZoom: newZoom,
      maxZoom: newZoom,
      maxBounds: [
        [lng, lat],
        [lng, lat],
      ],
    });
    mapContainer.current.classList.add("map");
  });

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
          "line-color": "#A6D388",
          "line-width": 2,
        },
      });
      map.current.addLayer({
        id: "cityFill",
        type: "fill",
        source: "boundary",
        paint: {
          "fill-color": "#77B255",
          "fill-opacity": 0.25,
        },
      });
    });
  });

  return <div ref={mapContainer} className="map-container" />;
}
