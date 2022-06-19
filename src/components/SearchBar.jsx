import React, {useState} from "react";
import '../css/Searchbar.css';
import PlacesAutocomplete, {
        geocodeByAddress,
        getLatLng} 
    from "react-places-autocomplete";

export const CoordinatesContext = React.createContext({
    coord: {lat: null, lng: null},
    setCoord: () => {}
});

export default function SearchBar(props) {
    
        const setCoordinates2 = (coords) => {
            console.log(coords)
            setState({...state, coord: coords})
            console.log(state, "state")
        }
        const initState = {
            coord: [{lat: null, lng: null}],
            setCoord: setCoordinates2
        }
        const [state, setState] = useState(initState)
        
        const [searchAdress, setsearchAdress] = useState("");
        /*const [coordinates, setCoordinates] = useState({
            lat: null,
            lng: null
        });*/
        const handleSelect = async value => {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setsearchAdress(value);
            /*setCoordinates2(latLng);*/
            
            state.setCoord(latLng)
        };

    return (
        <>
        <CoordinatesContext.Provider value={state}>
            {props.children}
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
            </CoordinatesContext.Provider>
        </>

    );
}