import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "../css/leaflet.css";
import "../css/app.css";

export default function Map(){
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*<LocationMarker/>*/}
        </MapContainer>
    );
}