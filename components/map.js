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
  allPlaces,
  showAll,
}) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2FsZWJwZXJjaXZhbCIsImEiOiJjbDBncW4wMjMwMGF5M29vMm54Z3V5OHUzIn0.g-0lgFtFCuhbov3ppFMXqQ";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(startingZoom);

  useEffect(() => {
    if (map.current) {
      map.current.remove();
      setLng(longitude);
      setLat(latitude);
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    mapContainer.current.classList.add("map");
  });

  const [cities, setCities] = useState();

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

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
        },
      });
    }

    map.current.on("load", () => {
      // Add an image to use as a custom marker
      map.current.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          map.current.addImage("custom-marker", image);
          // Add a GeoJSON source with 2 points
          map.current.addSource("points", {
            type: "geojson",
            data: geojson,
          });

          // Add a symbol layer
          map.current.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    // 	map.current.on('load', () => {

    // 	map.current.addSource('boundries', {
    // 	    type: 'geojson',
    // 	    data: '/boundries.geojson'
    // 	})

    // 	    getData()
    // 	    let geojson = {
    // 	            type: 'FeatureCollection',
    // 	            features: [{
    // 	                type: 'Feature',
    // 	                geometry: {
    // 	                    type: 'Point',
    // 	                    coordinates: [-77.032, 38.913]
    // 	                },
    // 	                properties: {
    // 	                    title: 'Mapbox',
    // 	                    description: 'Washington, D.C.'
    // 	                }
    // 	            }]
    // 	    }

    // 	    map.current.addSource('allCities', {
    // 	        type: 'geojson',
    // 	        data: geojson
    // 	    })

    // 	    map.current.addLayer({
    // 	        'id':'markers',
    // 	        'type':''
    // 	    })

    // 	map.current.addLayer({
    // 	    'id': 'countyBoundries',
    // 	    'type': 'line',
    // 	    'source': 'boundries',
    // 	    'paint': {
    // 	        'line-color': '#000',
    // 	        'line-width': 3
    // 	    }
    // 	})

    // 	    // map.current.addLayer({
    // 	    //     'id': 'countyFill',
    // 	    //     'type': 'fill',
    // 	    //     'source': 'mapdata',
    // 	    //     'paint': {
    // 	    //         'fill-color': '#090'
    // 	    //     }
    // 	    // })
    // 	})
    // });
  }, []);

  return <div ref={mapContainer} className="map-container" />;
}
