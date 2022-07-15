import React, { useContext, useState } from 'react';
import '../css/Searchbar.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { DEFAULT_DESTINATION, DEFAULT_ORIGIN, DestinationContext, OriginContext } from "../js/Context";
import { getObjectByCoordinates } from './Maps';


export default function Searchbar() {
  const { setDestination } = useContext(DestinationContext);
  const { setOrigin } = useContext(OriginContext);

  const originHandleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setOrigin((await getObjectByCoordinates(latLng.lat, latLng.lng)) || DEFAULT_ORIGIN);
  };

  const destinationHandleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setDestination((await getObjectByCoordinates(latLng.lat, latLng.lng)) || DEFAULT_DESTINATION);
  };

  return(
    <div className="searchbar">
      <SearchbarElement handleSelect={originHandleSelect} placeholder="Type origin address"/>
      <SearchbarElement handleSelect={destinationHandleSelect} placeholder="Type destination address"/>
    </div>
  )
}

function SearchbarElement({ handleSelect, placeholder }) {
  //this way the global address only gets set when the user makes a selection
  const [searchAddress, setSearchAddress] = useState('');

  return (
    <>
      <div className="searchElement">
        <PlacesAutocomplete
          value={searchAddress}
          onChange={setSearchAddress}
          onSelect={(value) => {
            handleSelect(value);
            setSearchAddress(value);
          }}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input id="searchInput" {...getInputProps({ placeholder: placeholder })} />
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