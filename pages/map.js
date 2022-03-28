import Mapbox from "../components/map";

import { useEffect, useState } from "react";

export default function MapPage(){

    return(
        <Mapbox longitude={3} latitude={55} startingZoom={2} showAll={true}></Mapbox>
    )
}