import React, {useContext, useState} from "react";
import '../css/Searchbar.css';
import PlacesAutocomplete, {
        geocodeByAddress,
        getLatLng} 
    from "react-places-autocomplete";
import { CoordContext } from "../js/Context";
import { AddressContext } from "../js/Context";
import { HistoryArray } from "../js/Context";

export default function SearchBar() {
    const { setCoord } = useContext(CoordContext);
    const { setAddress} = useContext(AddressContext);
    const { history, setHistory } = useContext(HistoryArray);

    //this way the global address only gets set when the user makes a selection
    const [searchAddress, setsearchAddress] = useState("");
   
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        setCoord(latLng);
        setAddress(value);
        setsearchAddress(value);

        for (let i = 0; i < history.length; i++){
            if (history[i].lat === latLng.lat && history[i].lng === latLng.lng){
                return;
            }
        }

        setHistory(current => [...current, {lat: latLng.lat, lng: latLng.lng, city: value}]);
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