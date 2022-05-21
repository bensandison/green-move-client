import "mapbox-gl";
import mapboxgl from "!mapbox-gl";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Box } from "@chakra-ui/react";

import Popup from "./popup";
import PopupContent from "./PopupContent";
import { mapContext } from "./mapContext";

export default function InteractiveMap({
  longitude,
  latitude,
  startingZoom,
  allPlaces,
  showAll,
}) {
  const [content, setContent] = useState([]);
  const [popupLngLat, setPopupLngLat] = useState(null);
  const { setMap, map } = useContext(mapContext);
  const mapContainer = useRef(null);

  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(startingZoom);

  function onPopupClose() {
    setContent([]);
    setPopupLngLat(null);
  }

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2FsZWJwZXJjaXZhbCIsImEiOiJjbDBncW4wMjMwMGF5M29vMm54Z3V5OHUzIn0.g-0lgFtFCuhbov3ppFMXqQ";

    let geojson = {
      type: "FeatureCollection",
      features: [],
    };

    //creates geojson from data
    for (let i = 1; i < 60; i++) {
      geojson.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [allPlaces[i].longitude, allPlaces[i].latitude],
        },
        properties: {
          title: allPlaces[i].name,
          label: allPlaces[i].rating,
        },
      });
    }

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [lng, lat], // starting position
        zoom: startingZoom, // starting zoom
      });

      map.addControl(new mapboxgl.FullscreenControl());

      map.on("load", () => {
        setMap(map);

        map.resize();
      });

      map.on("load", () => {
        // Add an image to use as a custom marker
        map.loadImage("/small-location-icon-png.png", (error, image) => {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with 2 points
          map.addSource("points", {
            type: "geojson",
            data: geojson,
          });

          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              "icon-size": 0.12,
              "icon-allow-overlap": true,
              "icon-anchor": "bottom",
            },
          });

          // Add a symbol layer
          map.addLayer({
            id: "points-text",
            type: "symbol",
            source: "points",
            layout: {
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 0],
              "text-anchor": "top",
              "icon-allow-overlap": true,
              "text-allow-overlap": false,
            },
          });
          map.setLayoutProperty("points-text", "visibility", "none");
        });

        map.on("click", "points", (e) => {
          map.flyTo({
            zoom: 10,
            center: e.features[0].geometry.coordinates,
          });
          const labels = e.features.map((feature) => (
            <PopupContent
              key={feature.properties.title}
              rating={feature.properties.label}
              label={feature.properties.title}
            />
          ));

          setContent(labels);
          setPopupLngLat(e.features[0].geometry.coordinates);

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
        });

        // Change the cursor to a pointer when it enters the icon.
        map.on("mouseenter", "points", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "points", () => {
          map.getCanvas().style.cursor = "";
        });

        //only show text when zoomed in far enough
        map.on("zoomend", () => {
          const layer = map.getLayer("points-text");
          if (map.getZoom() > 7) {
            map.setLayoutProperty("points-text", "visibility", "visible");
          } else {
            map.setLayoutProperty("points-text", "visibility", "none");
          }
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, setMap]);

  return (
    <>
      {popupLngLat && (
        <Popup lngLat={popupLngLat} onClose={onPopupClose}>
          {content}
        </Popup>
      )}
      <div className="popup" ref={(el) => (mapContainer.current = el)} />
    </>
  );
}

// export default InteractiveMap;
