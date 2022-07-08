import React, {useContext} from "react";
import {MapContainer, TileLayer, useMapEvents, useMap, ZoomControl} from "react-leaflet";
import "../css/leaflet.css";
import "../css/app.css";
import '../css/maps.css';
import {Fab, Icon, PageContent} from "framework7-react";
import { DestinationContext } from '../js/Context';
import { geocodeByAddress } from 'react-places-autocomplete';

export async function getAddressByCoordinates(latitude, longitude) {
    const results = await geocodeByAddress(`${latitude}, ${longitude}`);

    let address = {}

    for (let i = 0; i < results[0].address_components.length; i++) {
        //Country
        if (results[0].address_components[i].types[0] === 'country') {
            address.country = results[0].address_components[i].long_name;
        }
        //City
        if (results[0].address_components[i].types[0] === 'locality' || results[0].address_components[i].types[0] === 'postal_town') {
            address.city = results[0].address_components[i].long_name;
        }
        //Street
        if (results[0].address_components[i].types[0] === 'route' || results[0].address_components[i].types[0] === 'premise') {
            address.street = results[0].address_components[i].long_name;
        }
        //Street number
        if (results[0].address_components[i].types[0] === 'street_number') {
            address.streetNumber = results[0].address_components[i].long_name;
        }
    }

    if (address.country && address.city) {
        return address
    } else {
        console.error("No address found for " + latitude + " " + longitude + "\n")
        return null
    }
}

export async function getObjectByCoordinates(latitude, longitude) {
    return {
        coordinates: {
            lat: latitude,
            lng: longitude
        },
        address: await getAddressByCoordinates(await latitude, await longitude)
    };
}

export default function Map(){

    const locateFabClickEvent = new Event('handleFabClick');
    const { destination, setDestination } = useContext(DestinationContext)

  function HandleFabClick() {
    const map = useMap();
    addEventListener(
      'handleFabClick',
      function () {
        map.locate();
      },
      false
    );
  }

    function EventHandler() {
        const map = useMapEvents({
            async locationfound(e) {
                setDestination(await getObjectByCoordinates(e.latlng.lat, e.latlng.lng))
                map.flyTo(e.latlng, 15)
            },
            locationerror() {
                alert("Unfortunately, we could not find your location")
            },
            async click(e) {
                setDestination(await getObjectByCoordinates(e.latlng.lat, e.latlng.lng))
            }
        })
        return null
    }

    function FlyToAddress(){
        const map = useMap()
        if(destination.coordinates.lat && destination.coordinates.lng){
            map.flyTo(destination.coordinates)
        }
    }

  return (
    <>
      <Fab
        position="right-bottom"
        slot="fixed"
        id="locateButton"
        onClick={() => {
          dispatchEvent(locateFabClickEvent);
        }}>
        <Icon id="locateIcon" material="gps_not_fixed" />
      </Fab>
      <PageContent className="page-content-map">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          id="map"
          zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomleft" />
          <HandleFabClick />
          <EventHandler />
          <FlyToAddress />
        </MapContainer>
      </PageContent>
    </>
  );
}
