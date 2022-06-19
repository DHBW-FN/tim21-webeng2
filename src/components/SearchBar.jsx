import React, {useContext, useState} from "react";
import '../css/Searchbar.css';
import PlacesAutocomplete, {
        geocodeByAddress,
        getLatLng} 
    from "react-places-autocomplete";
import { CoordContext } from "../js/Context";
import { AdressContext } from "../js/Context";

export default function SearchBar() {
    const { coord, setCoord } = useContext(CoordContext);
    const { adress, setAdress} = useContext(AdressContext);
    
    //this way the global adress only gets set when the user makes a selection    
    const [searchAdress, setsearchAdress] = useState("");
   
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAdress(value);
        /*setCoordinates2(latLng);*/
        setCoord(latLng);
    };

    return (
        <>
        
        <div className="searchElement">
            <div className="search-div">
                
        <PlacesAutocomplete value={searchAdress} onChange={setsearchAdress} onSelect={handleSelect}>
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div>
                <input id="searchInput" {...getInputProps({ placeholder: "Type adress ..."})} />
                <div id="autocompletion-examples">
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map(suggestion => {
                        const style = {
                            backgroundColor: suggestion.active ? "#C9C9C9" : "#fff"
                        };
                        return <div {...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>
                    })}
                </div>
            </div>)}
        </PlacesAutocomplete>
        </div>
                
            </div>
        </>

    );
}