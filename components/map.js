// import 'https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css'
import 'mapbox-gl'
import mapboxgl from '!mapbox-gl'
import React, { useRef, useState, useEffect } from "react"

export default function Mapbox() {

    mapboxgl.accessToken = "pk.eyJ1IjoiY2FsZWJwZXJjaXZhbCIsImEiOiJjbDBncW4wMjMwMGF5M29vMm54Z3V5OHUzIn0.g-0lgFtFCuhbov3ppFMXqQ"
    // const map = new mapboxgl.Map({
    //     container: 'map', //container id
    //     style: 'mapbox://styles/mapbox/light-v10', //map style url
    //     zoom: 7, //starting zoom
    //     center: [138,35] //starting center
    // });

    // map.on('load', () => {
    //     map.addSource('mapdata', {
    //         type: 'geojson',
    //         data: './boundries.geojson'
    //     })

    //     map.addLayer({
    //         'id': 'countyBoundries',
    //         'type': 'line',
    //         'source': 'mapdata',
    //         'paint': {
    //             'line-color': '#000',
    //             'line-width': 3
    //         }
    //     })

    // })

    // return (
    //     <div id="map"></div>
    // )

    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(-70.9)
    const [lat, setLat] = useState(42.35)
    const [zoom, setZoom] = useState(9)
 
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        })
    })
 
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        console.log("hello")
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
        
    

    })
    
    return (
        <div>
        <div ref={mapContainer} className="map-container" />
        </div>
    )
}