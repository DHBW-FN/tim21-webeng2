import React, { useContext } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import '../css/leaflet.css';
import '../css/app.css';
import '../css/maps.css';
import { f7, Fab, Icon, PageContent } from 'framework7-react';
import { DEFAULT_DESTINATION, DestinationContext, UserSettingsContext } from '../js/Context';
import { geocodeByAddress } from 'react-places-autocomplete';
import Routing from "./Routing";

export async function getAddressByCoordinates(latitude, longitude) {
  const results = await geocodeByAddress(`${latitude}, ${longitude}`);

  let address = {};

  for (let i = 0; i < results[0].address_components.length; i++) {
    //Country
    if (results[0].address_components[i].types[0] === 'country') {
      address.country = results[0].address_components[i].long_name;
    }
    //City
    if (
      results[0].address_components[i].types[0] === 'locality' ||
      results[0].address_components[i].types[0] === 'postal_town'
    ) {
      address.city = results[0].address_components[i].long_name;
    }
    //Street
    if (
      results[0].address_components[i].types[0] === 'route' ||
      results[0].address_components[i].types[0] === 'premise'
    ) {
      address.street = results[0].address_components[i].long_name;
    }
    //Street number
    if (results[0].address_components[i].types[0] === 'street_number') {
      address.streetNumber = results[0].address_components[i].long_name;
    }
  }

  if (address.country && address.city) {
    return address;
  } else {
    console.error('No address found for ' + latitude + ' ' + longitude + '\n');
    console.log(results);
    console.log(address);
    return null;
  }
}

export async function getObjectByCoordinates(latitude, longitude) {
  let address = await getAddressByCoordinates(latitude, longitude);
  if (!address) {
    console.error('No address found for ' + latitude + ' ' + longitude + '\n');
    f7.dialog.alert(
      'No address found for lat ' +
        latitude +
        ' lng ' +
        longitude +
        '\n Using default destination instead.'
    );
    return null;
  }
  return {
    coordinates: {
      lat: latitude,
      lng: longitude
    },
    address: await getAddressByCoordinates(await latitude, await longitude)
  };
}

export default function Map() {
  const { destination, setDestination } = useContext(DestinationContext);
  const { userSettings } = useContext(UserSettingsContext);

  function EventHandler() {
    const map = useMapEvents({
      async locationfound(e) {
        setDestination(
          (await getObjectByCoordinates(e.latlng.lat, e.latlng.lng)) || DEFAULT_DESTINATION
        );
        map.flyTo(e.latlng, 15);
      },
      locationerror() {
        alert('Unfortunately, we could not find your location');
      }
    });
    return null;
  }

  function FlyToAddress() {
    const map = useMap();
    if (destination.coordinates.lat && destination.coordinates.lng) {
      map.flyTo(destination.coordinates);
    }
  }

  return (
    <>
      <Fab
        position="right-bottom"
        slot="fixed"
        id="locateButton"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            async position => {
              setDestination(await getObjectByCoordinates(position.coords.latitude, position.coords.longitude));
            },
            error => {
              console.error(error);
              f7.dialog.alert('Unfortunately, we could not find your location');
            }
          )
        }}>
        <Icon id="locateIcon" material="gps_not_fixed" />
      </Fab>
      <PageContent className="page-content-map">
        <MapContainer
          center={[DEFAULT_DESTINATION.coordinates.lat, DEFAULT_DESTINATION.coordinates.lng]}
          zoom={13}
          scrollWheelZoom={true}
          id="map"
          zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomleft" />
          <EventHandler />
          <FlyToAddress />
          {userSettings.showRouting ? <Routing />: null}
        </MapContainer>
      </PageContent>
    </>
  );
}
