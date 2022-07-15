import React, { useContext, useState } from 'react';
import '../css/Searchbar.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { DEFAULT_DESTINATION, DEFAULT_ORIGIN, DestinationContext, OriginContext } from "../js/Context";
import { getObjectByCoordinates } from './Maps';


export default function Searchbar() {
  return(
    <div className="searchbar">
      <OriginSearchBar />
      <DestinationSearchBar />
    </div>
  )
}


function DestinationSearchBar() {
  const { setDestination } = useContext(DestinationContext);

  //this way the global address only gets set when the user makes a selection
  const [searchAddress, setSearchAddress] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setDestination((await getObjectByCoordinates(latLng.lat, latLng.lng)) || DEFAULT_DESTINATION);
    setSearchAddress(value);
  };

  return (
    <>
      <div className="searchElement" id='destinationSearchbar'>
        <PlacesAutocomplete
          value={searchAddress}
          onChange={setSearchAddress}
          onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input id="searchInput" {...getInputProps({ placeholder: 'Type destination address ...' })} />
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

function OriginSearchBar() {
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
      <div className="searchElement" id='originSearchbar'>
        <PlacesAutocomplete
          value={searchAddress}
          onChange={setSearchAddress}
          onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
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