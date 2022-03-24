// import 'https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css'
import 'mapbox-gl'
import mapboxgl from '!mapbox-gl'
import React, { useRef, useState, useEffect } from "react"

export default function Mapbox({longitude, latitude, startingZoom}) {

    mapboxgl.accessToken = "pk.eyJ1IjoiY2FsZWJwZXJjaXZhbCIsImEiOiJjbDBncW4wMjMwMGF5M29vMm54Z3V5OHUzIn0.g-0lgFtFCuhbov3ppFMXqQ"


    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(longitude)
    const [lat, setLat] = useState(latitude)
    const [zoom, setZoom] = useState(startingZoom)
 
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        })
    })
 
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        // map.current.on('move', () => {
        // setLng(map.current.getCenter().lng.toFixed(4))
        // setLat(map.current.getCenter().lat.toFixed(4))
        // setZoom(map.current.getZoom().toFixed(2))
        map.current.on('load', () => {
            map.current.addSource('mapdata', {
                type: 'geojson',
                data: './boundries.geojson'
            })

            map.current.addLayer({
                'id': 'countyBoundries',
                'type': 'line',
                'source': 'mapdata',
                'paint': {
                    'line-color': '#000',
                    'line-width': 3
                }
            })
        })
        
    }, [])
    
    return (
            <div ref={mapContainer} className="map-container"/>
    )
}