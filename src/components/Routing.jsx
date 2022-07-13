import { useContext } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '../css/routing.css';
import { useMap } from 'react-leaflet';
import { DEFAULT_DESTINATION, DestinationContext } from '../js/Context';

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
  const { destination } = useContext(DestinationContext);
  const map = useMap();
  if (!map) return;
  routingControl.spliceWaypoints(0, 1, DEFAULT_DESTINATION.coordinates); // -> Start LatLng
  routingControl.spliceWaypoints(1, 1, L.latLng(destination.coordinates.lat, destination.coordinates.lng)); // -> Target LatLng
  routingControl.addTo(map);
  return null;
}