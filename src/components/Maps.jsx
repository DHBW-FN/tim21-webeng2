/**
 * The Maps component is used to display the map.
 */
import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import '../css/leaflet.css';
import '../css/app.css';
import '../css/maps.css';
import { f7, Fab, Icon, PageContent } from 'framework7-react';
import {
  DEFAULT_DESTINATION,
  DEFAULT_ORIGIN,
  OriginContext,
  CenterLocationContext,
  DestinationContext
} from '../js/Context';
import Routing, { setRoutingWaypoint, setRoutingOriginDestination } from './Routing';

/**
 * Parse the addressComponents of the geocoding result to an address object
 * @param addressComponents - the addressComponents of the geocoding result
 * @returns {{country: string, city: string, street: string, houseNumber: number}} - the address object
 */
export function parseAddressComponents(addressComponents) {
  const address = {};
  addressComponents.forEach((component) => {
    if (component.types.includes('street_number')) {
      address.streetNumber = component.long_name;
    } else if (component.types.includes('route') || component.types.includes('premise')) {
      address.street = component.long_name;
    } else if (component.types.includes('locality') || component.types.includes('postal_town')) {
      address.city = component.long_name;
    } else if (component.types.includes('country')) {
      address.country = component.long_name;
    }
  });
  return address;
}

/**
 * Get the address from the latlng
 *
 * @param latitude - latitude of the address
 * @param longitude - longitude of the address
 * @returns {Promise<{}|null>} - returns an object with the address or null if no address was found
 */
export async function getAddressByCoordinates(latitude, longitude) {
  let results = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=en&key=AIzaSyCZXol-ZruQJH-gc_eqlf2RAR4H7VRtaIQ`
  )
    .then((response) => response.json())
    .then((data) => data.results);

  const address = parseAddressComponents(results[0].address_components);

  if (address.country && address.city) {
    return address;
  } else {
    console.error('No address found for ' + latitude + ' ' + longitude + '\n');
    console.log(results);
    console.log(address);
    return null;
  }
}

/**
 * Get the location object from the address
 * @param latitude - latitude of the address
 * @param longitude - longitude of the address
 * @returns {Promise<{address: {}, coordinates: {lng, lat}}|{address: {country: string, city: string, streetNumber: string, street: string}, coordinates: {lng: number, lat: number}}>} - returns an object with the address and coordinates or a default address if no address was found
 */
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

/**
 * Generates the map page.
 * @returns {JSX.Element} - The map page.
 */
export default function Map() {
  const { origin, setOrigin } = useContext(OriginContext);
  const { centerLocation, setCenterLocation } = useContext(CenterLocationContext);
  const { destination } = useContext(DestinationContext);

  /**
   * Run functions on page load
   */
  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        setOrigin(location);
        setCenterLocation(location);
        setRoutingWaypoint(location.coordinates);
      })
      .catch((error) => {
        console.log(error);
        setOrigin(DEFAULT_ORIGIN);
        setCenterLocation(DEFAULT_ORIGIN);
        setRoutingWaypoint(DEFAULT_ORIGIN.coordinates);
      });
  }, []);

  /**
   * Locate user
   */
  function locate() {
    getCurrentLocation()
      .then((location) => {
        setOrigin(location);
        setCenterLocation(location);
        setRoutingWaypoint(location.coordinates);
      })
      .catch((error) => {
        console.log(error);
        f7.dialog.alert(
          'Unfortunately, we could not find your location',
          'Error: Unable to locate'
        );
        setOrigin(DEFAULT_ORIGIN);
        setCenterLocation(DEFAULT_ORIGIN);
        setRoutingWaypoint(DEFAULT_ORIGIN.coordinates);
      });
  }

  /**
   * Get current location of user
   * @returns {Promise<unknown>} - Promise containing user location object
   */
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          resolve(
            await getObjectByCoordinates(position.coords.latitude, position.coords.longitude)
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Flies to the centerLocation whenever it changes
   */
  function FlyToAddress() {
    const map = useMap();
    map.flyTo(centerLocation.coordinates);
  }

  function startNavigation() {
    setRoutingOriginDestination(origin.coordinates, destination.coordinates);
  }

  return (
    <>
      <div className='Buttons'>
      <Fab position="center-top" slot="fixed" id="navi" tooltip={"Navigate to " + destination.address.city} onClick={startNavigation}>
        <Icon id="navigateIcon" material="directions" />
      </Fab>
      <Fab position="center-bottom" slot="fixed" id="locateButton" tooltip="jump to your location" onClick={locate}>
        <Icon id="locateIcon" material="gps_not_fixed" />
      </Fab>
      </div>
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
          <FlyToAddress />
          <Routing />
        </MapContainer>
      </PageContent>
    </>
  );
}
