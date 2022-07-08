import React, { useContext, useState } from 'react';
import '../css/Searchbar.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {CoordContext, DestinationContext} from '../js/Context';
import { AddressContext } from '../js/Context';

export default function SearchBar() {
  const { setCoord } = useContext(CoordContext);
  const { setAddress } = useContext(AddressContext);
  const { setDestination } = useContext(DestinationContext);

  //this way the global address only gets set when the user makes a selection
  const [searchAddress, setsearchAddress] = useState('');

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    let newDestination = {
      coordinates: latLng,
      address: {}
    }
    for (let i = 0; i < results[0].address_components.length; i++) {
      //Country
      if (results[0].address_components[i].types[0] === 'country') {
        newDestination.address.country = results[0].address_components[i].long_name;
      }
      //City
      if (results[0].address_components[i].types[0] === 'locality') {
        newDestination.address.city = results[0].address_components[i].long_name;
      }
      //Street
      if (results[0].address_components[i].types[0] === 'route') {
        newDestination.address.street = results[0].address_components[i].long_name;
      }
      //Street number
      if (results[0].address_components[i].types[0] === 'street_number') {
        newDestination.address.streetNumber = results[0].address_components[i].long_name;
      }
    }

    setDestination(newDestination);

    setCoord(latLng);
    setAddress(value);
    setsearchAddress(value);
  };

  return (
    <>
      <div className="searchElement">
        <PlacesAutocomplete
          value={searchAddress}
          onChange={setsearchAddress}
          onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div id="innerSearchdiv">
              <input id="searchInput" {...getInputProps({ placeholder: 'Type address ...' })} />
              <div id="autocompletion-examples">
                {loading ? <div>...loading</div> : null}

                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#C9C9C9' : '#fff'
                  };
                  return (
                    <div
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    </>
  );
}
