import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '../css/routing.css';
import { useMap } from 'react-leaflet';
import {f7} from "framework7-react";
import {$} from "dom7";

export const routingControl = L.Routing.control({
  waypoints: [],
  draggableWaypoints: false,
  routeWhileDragging: false,
  autoRoute: true,
  createMarker: function (i, wp) {
    return L.marker(wp.latLng, {
      draggable: false,
      icon: L.icon({
        iconUrl:
          'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41]
      })
    }).on('click', function (e) {
      f7.sheet.open($('.wikibox-sheet'));
      if (e.originalEvent.ctrlKey) {
        this.remove();
      }
    });
  }
});

export default function Routing() {
  const map = useMap();
  if (!map) return;
  routingControl.addTo(map);
  return null;
}