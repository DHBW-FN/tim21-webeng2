import React, { useContext, useState } from 'react';
import '../css/Searchbar.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { DestinationContext, OriginContext, CenterLocationContext } from "../js/Context";
import PropTypes from "prop-types";
import { parseAddressComponents } from "./Maps";
import { setRoutingWaypoint } from "./Routing";


export default function Searchbar() {
  const { setDestination } = useContext(DestinationContext);
  const { setOrigin } = useContext(OriginContext);
  const { setCenterLocation } = useContext(CenterLocationContext);

  const originHandleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    const origin = {
      coordinates: await getLatLng(results[0]),
      address: parseAddressComponents(results[0].address_components)
    };
    setOrigin(origin);
    setCenterLocation(origin);
    setRoutingWaypoint(await getLatLng(results[0]))
  };

  const destinationHandleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    const destination = {
      coordinates: await getLatLng(results[0]),
      address: parseAddressComponents(results[0].address_components)
    };
    setDestination(destination);
    setCenterLocation(destination);
    setRoutingWaypoint(await getLatLng(results[0]))
  };

  return(
    <div className="searchbars">
      <SearchbarElement handleSelect={originHandleSelect} placeholder="Type origin address"/>
      <SearchbarElement handleSelect={destinationHandleSelect} placeholder="Type destination address"/>
    </div>
  )
}

function SearchbarElement({ handleSelect, placeholder }) {
  SearchbarElement.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }
  SearchbarElement.defaultProps = {
    placeholder: "Type address"
  }

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
