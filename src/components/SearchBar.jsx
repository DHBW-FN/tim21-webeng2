import React, { useContext, useState } from 'react';
import '../css/Searchbar.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { DestinationContext } from '../js/Context';
import { parseAddressComponents } from "./Maps";

export default function SearchBar() {
  const { setDestination } = useContext(DestinationContext);

  //this way the global address only gets set when the user makes a selection
  const [searchAddress, setSearchAddress] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    setDestination({
      coordinates: await getLatLng(results[0]),
      address: parseAddressComponents(results[0].address_components)
    });
    setSearchAddress(value);
  };

  return (
    <>
      <div className="searchElement">
        <PlacesAutocomplete
          value={searchAddress}
          onChange={setSearchAddress}
          onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div id="innerSearchdiv">
              <input id="searchInput" {...getInputProps({ placeholder: 'Type address ...' })} />
              <div id="autocompletion-examples">
                {loading ? <div className="loading">...loading</div> : null}

                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#C9C9C9' : '#fff'
                  };
                  return (
                    <div className="suggestions"
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
