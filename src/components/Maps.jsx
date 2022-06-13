import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from "react-leaflet";
import "../css/leaflet.css";
import "../css/app.css";
import L from "leaflet";

//example for funtion "locate"
// function LocationMarker() {
//     const [position, setPosition] = useState(null)
//     const map = useMapEvents({
//         click() {
//             map.locate()
//         },
//         locationfound(e) {
//             setPosition(e.latlng)
//             map.flyTo(e.latlng, map.getZoom())
//         },
//     })
//
//     return position === null ? null : (
//         <Marker position={position}>
//             <Popup>You are here</Popup>
//         </Marker>
//     )
// }

export default function Map(){
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*<LocationMarker/>*/}
        </MapContainer>
    );
}