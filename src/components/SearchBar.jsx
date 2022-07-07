import React, {useContext, useState} from "react";
import '../css/Searchbar.css';
import PlacesAutocomplete, {
        geocodeByAddress,
        getLatLng} 
    from "react-places-autocomplete";
import { CoordContext, AddressContext, RoutingState } from "../js/Context";

export default function SearchBar() {
    const { setCoord } = useContext(CoordContext);
    const { setAddress} = useContext(AddressContext);
    const { routingActive, setRoutingActive } = useContext(RoutingState);

    //this way the global address only gets set when the user makes a selection
    const [searchAddress, setsearchAddress] = useState("");
   
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setCoord(latLng);
        setAddress(value);
        setsearchAddress(value);
        setRoutingActive(false);
    };

    return (
        <>
        
        <div className="searchElement">

        <PlacesAutocomplete value={searchAddress} onChange={setsearchAddress} onSelect={handleSelect}>
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div id="innerSearchdiv">
                <input id="searchInput" {...getInputProps({ placeholder: "Type address ..."})} />
                <div id="autocompletion-examples">
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                        const style = {
                            backgroundColor: suggestion.active ? "#C9C9C9" : "#fff"
                        };
                        return <div key={"id"} {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
                    })}
                </div>
            </div>)}
        </PlacesAutocomplete>

            </div>
        </>

    );
}