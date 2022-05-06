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
	  minZoom:zoom,
	  maxZoom:zoom,
	  maxBounds: [[lng, lat],[lng, lat]]
    });
    mapContainer.current.classList.add("map");
  });

  const [cities, setCities] = useState();

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

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
