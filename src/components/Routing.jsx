import { useContext } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '../css/routing.css';
import { useMap } from 'react-leaflet';
import { DEFAULT_DESTINATION, DestinationContext } from '../js/Context';

export default function Routing() {
  const routingControl = L.Routing.control({
    waypoints: [],
    draggableWaypoints: false,
    routeWhileDragging: false,
    autoRoute: true,
    createMarker: function (i, wp) {
      return L.marker(wp.latLng, {
        draggable: false,
        icon: L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
          shadowAnchor: [12, 41],
        })
      }).on('click', function (e) {
        if (e.originalEvent.ctrlKey) {
          this.remove();
        }
      });
    }
  });

  const { destination } = useContext(DestinationContext);
  const map = useMap();
  if (!map) return;
  routingControl.spliceWaypoints(0, 1, DEFAULT_DESTINATION.coordinates); // -> Start LatLng
  routingControl.spliceWaypoints(1, 1, L.latLng(destination.coordinates.lat, destination.coordinates.lng)); // -> Target LatLng
  routingControl.addTo(map);
  return null;
}