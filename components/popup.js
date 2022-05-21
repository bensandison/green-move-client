import React, { useContext, useEffect, useRef } from "react";
import { mapContext } from "./mapContext";
import mapboxgl from "mapbox-gl";
import { Box } from "@chakra-ui/react";

export const Popup = ({ children, lngLat, onClose }) => {
  const { map } = useContext(mapContext);
  const popupRef = useRef();

  useEffect(() => {
    const popup = new mapboxgl.Popup({})
      .setLngLat(lngLat)
      .setDOMContent(popupRef.current)
      .addTo(map);

    popup.on("close", onClose);

    return popup.remove;
  }, [children, lngLat]);

  return (
    <div style={{ display: "none" }}>
      <div ref={popupRef}>{children}</div>
    </div>
  );
};

export default Popup;
