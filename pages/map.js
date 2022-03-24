import Mapbox from "../components/map";

export default function MapPage(){
    return(
        <Mapbox longitude={3} latitude={55} startingZoom={2}></Mapbox>
    )
}