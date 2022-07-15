import React, { useContext, useState } from 'react';
import '../css/Searchbar2.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { OriginContext } from '../js/Context';
import { getObjectByCoordinates } from './Maps';

export default function SearchBar() {
  const { setOrigin } = useContext(OriginContext);

  //this way the global address only gets set when the user makes a selection
  const [searchAddress, setSearchAddress] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setOrigin((await getObjectByCoordinates(latLng.lat, latLng.lng)) || DEFAULT_ORIGIN);
    setSearchAddress(value);
  };

  return (
    <>
      <div className="searchElement2">
        <PlacesAutocomplete
          value={searchAddress}
          onChange={setSearchAddress}
          onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div id="innerSearchdiv">
              <input id="searchInput" {...getInputProps({ placeholder: 'Type start address ...' })} />
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