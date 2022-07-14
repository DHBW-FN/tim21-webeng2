import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import '../css/leaflet.css';
import '../css/app.css';
import '../css/maps.css';
import { f7, Fab, Icon, PageContent } from 'framework7-react';
import {
  DEFAULT_DESTINATION,
  DEFAULT_ORIGIN,
  DestinationContext,
  OriginContext
} from "../js/Context";
import { geocodeByAddress } from 'react-places-autocomplete';
import Routing from "./Routing";

export async function getAddressByCoordinates(latitude, longitude) {
  let results;
  try {
    results = await geocodeByAddress(`${latitude}, ${longitude}`);
  } catch (error) {
    console.error(error);
    return null;
  }

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
        '\n Using default destination instead.',
      'Error: Unable to locate'
    );
    return DEFAULT_DESTINATION;
  }
  return {
    coordinates: {
      lat: latitude,
      lng: longitude
    },
    address: address
  };
}

export default function Map() {
  const { destination, setDestination } = useContext(DestinationContext);
  const { origin, setOrigin } = useContext(OriginContext);

  function EventHandler() {
    const map = useMapEvents({
      async locationfound(e) {
        setDestination(
          await getObjectByCoordinates(e.latlng.lat, e.latlng.lng)
        );
        map.flyTo(e.latlng, 15);
      },
      locationerror() {
        alert('Unfortunately, we could not find your location');
      }
    });
    return null;
  }

  /**
   * Run functions on page load
   */
  useEffect(() => {
    getCurrentLocation()
      .then(location => {
      setOrigin(location);
      setDestination(location);
      })
      .catch(error => {
        console.log(error);
        setOrigin(DEFAULT_ORIGIN);
        setDestination(DEFAULT_DESTINATION);
      });
  }, []);

  /**
   * Locate user
   */
  function locate() {
    getCurrentLocation()
      .then(location => {
        setOrigin(location);
      })
      .catch(error => {
        console.log(error);
        f7.dialog.alert(
          'Unfortunately, we could not find your location',
          'Error: Unable to locate'
        );
        setOrigin(DEFAULT_ORIGIN);
      });
  }

  /**
   * Get current location of user
   * @returns {Promise<unknown>} - Promise containing user location object
   */
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async position => {
          resolve(await getObjectByCoordinates(position.coords.latitude, position.coords.longitude));
        },
        error => {
          reject(error);
        }
      );
    });
  }

  function FlyToAddress() {
    const map = useMap();
    if (destination.coordinates.lat && destination.coordinates.lng) {
      map.flyTo(destination.coordinates);
    } else {
      map.flyTo(origin.coordinates);
    }
  }

  return (
    <>
      <Fab
        position="right-bottom"
        slot="fixed"
        id="locateButton"
        onClick={locate}>
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
          <Routing />
        </MapContainer>
      </PageContent>
    </>
  );
}
