import L from 'leaflet'; // eslint-disable-line no-unused-vars
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '../css/routing.css';
import { routingControl } from '../components/Routing';

export function setRoutingOriginDestination(start, end) {
  routingControl.setWaypoints([]);
  routingControl.spliceWaypoints(0, 1, start); // -> Start LatLng
  routingControl.spliceWaypoints(1, 1, end); // -> Target LatLng
}
