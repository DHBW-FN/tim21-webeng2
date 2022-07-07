import { useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "../css/routing.css";
import { useMap } from "react-leaflet";
import {START_LOCATION, TargetLocation } from "../js/Context";

const routingControl = L.Routing.control({
    waypoints: [],
    draggableWaypoints: false,
    routeWhileDragging: false,
    autoRoute: true,
    createMarker: function () {
        return null;
    }
});

export default function Routing() {
    const { targetLocation } = useContext(TargetLocation);
    const map = useMap();
    if (!map) return;
    routingControl.spliceWaypoints(0, 1, START_LOCATION); // -> Start LatLng
    routingControl.spliceWaypoints(1, 1, L.latLng(targetLocation.lat, targetLocation.lng)); // -> Target LatLng
    routingControl.addTo(map);
    return null;
}