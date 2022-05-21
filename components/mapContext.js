import React, { createContext, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const mapContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function MapProvider({ children }) {
  const router = useRouter();
  const [popupContent, setPopupContent] = useState([]);
  const [rating, setRating] = useState(0);
  const [map, setMap] = useState(null);
  const [lngLat, setLngLat] = useState({ lng: null, lat: null });

  function goToCity(city) {
    console.log(city);
    router.push(`/city/${city.label.toLowerCase()}`);
  }

  const Provider = mapContext.Provider;

  return (
    <Provider
      value={{
        popupContent,
        setPopupContent,
        map,
        setMap,
        lngLat,
        setLngLat,
        // rating,
        // setRating,
        goToCity,
      }}
    >
      {children}
    </Provider>
  );
}

export { MapProvider, mapContext };
