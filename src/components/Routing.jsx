import { useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "../css/routing.css";
import { useMap } from "react-leaflet";
import {CoordContext, TargetAddress} from "../js/Context";

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
    const { targetCoord } = useContext(TargetAddress);
    const map = useMap();
    if (!map) return;
    routingControl.spliceWaypoints(0, 1, L.latLng(47.67989, 9.47554)); // -> Start LatLng
    routingControl.spliceWaypoints(1, 1, L.latLng(targetCoord.lat, targetCoord.lng)); // -> Target LatLng
    routingControl.addTo(map);
    return null;
}