/**
 * The SearchBar component is used to search for locations.
 */
import React, { useContext, useState } from 'react';
import '../css/Searchbar.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { DestinationContext, OriginContext, CenterLocationContext } from "../js/Context";
import PropTypes from "prop-types";
import { parseAddressComponents } from "./Maps";
import { setRoutingWaypoint } from "./Routing";

/**
 * Generate the component for the searchbar.
 * @returns {JSX.Element} - the searchbar component
 */
export default function Searchbar() {
  const { setDestination } = useContext(DestinationContext);
  const { setOrigin } = useContext(OriginContext);
  const { setCenterLocation } = useContext(CenterLocationContext);

  /**
   * Handle the selection of an origin location.
   * @param value - the selected origin location
   * @returns {Promise<void>}
   */
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

  /**
   * Handle the selection of a destination location.
   * @param value - the selected destination location
   * @returns {Promise<void>}
   */
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
    <div className="searchbar">
      <SearchbarElement handleSelect={originHandleSelect} placeholder="Type origin address"/>
      <SearchbarElement handleSelect={destinationHandleSelect} placeholder="Type destination address"/>
    </div>
  )
}

/**
 * Generate the component for the searchbar element.
 * @param handleSelect - the function to handle the selection of a location
 * @param placeholder - the placeholder text
 * @returns {JSX.Element} - the searchbar element component
 */
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
