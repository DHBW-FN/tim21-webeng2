import { useEffect, useContext } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "../css/routing.css";
import { useMap } from "react-leaflet";
import { CoordContext } from "../js/Context";

const routingControl = L.Routing.control({
    waypoints: [],
    draggableWaypoints: false,
    routeWhileDragging: false,
    autoRoute: true,
    createMarker: function () { return null; }
    /*createMarker: function(i, wp, nWps) {
                if (i === 0 || i === nWps - 1) {
                    return L.marker(wp.latLng, {icon: L.icon({iconUrl: require("../../public/icons/marker-icon.png")}) });
                } else {
                    return L.marker(wp.latLng, {icon: L.icon({iconUrl: require("../../public/icons/marker-icon.png")}) });
                }
            }*/
});

//waypoints: [L.latLng(coord.lat, coord.lng), L.latLng(47.67989, 9.47554)],

export default function Routing() {
    const {coord, setCoord} = useContext(CoordContext);
    const map = useMap();
    if (!map) return;
    console.log(routingControl.getWaypoints());
    routingControl.spliceWaypoints(0, 1, L.latLng(47.67989, 9.47554)); // -> Start LatLng
    routingControl.spliceWaypoints(1, 1, L.latLng(coord.lat, coord.lng)); // -> Target LatLng
    console.log(routingControl.getWaypoints());
    routingControl.addTo(map);
    return null;
}