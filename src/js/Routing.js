import L from 'leaflet'; // This import needs to be declared even if unused.
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '../css/routing.css';
import { routingControl } from '../components/Routing';

export function setRoutingDestination(start, end) {
  routingControl.setWaypoints([]);
  routingControl.spliceWaypoints(0, 1, start); // -> Start LatLng
  routingControl.spliceWaypoints(1, 1, end); // -> Target LatLng
}
