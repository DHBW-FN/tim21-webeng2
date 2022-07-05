import React, {useState, useEffect, useContext} from 'react';
import {
    Sheet,
    BlockTitle,
    List,
    ListItem,
    Icon,
    Fab,
    f7
} from 'framework7-react';
import Framework7 from "framework7";
import {$} from "dom7";
import { CoordContext } from '../js/Context';

export default function WikiBox() {
    const [wikipedia, setWikipedia] = useState(["Waiting for Wikipedia..."]);
    const [address, setAddress] = useState(["Waiting for address..."]);
    const {coord} = useContext(CoordContext)

    async function wikipediaLookup(city){
        return await fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${city}`)
            .then(response => response.json())
            .then(data => data.query.pages[Object.keys(data.query.pages)[0]].extract)
            .then(data => setWikipedia(data))
    }

    async function reverseGeo(latitude, longitude) {
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCZXol-ZruQJH-gc_eqlf2RAR4H7VRtaIQ`)
        let json = await response.json()
        for (const component of json.results[0].address_components) {
            if (component.types.includes("locality") || component.types.includes("postal_town")){
                setAddress(component.long_name)
                return component.long_name
            }
        }
        console.warn("Reverse Geocoding failed!")
    }

    // This updates the wikipedia text every time the address changes
    useEffect(() => {
        wikipediaLookup(address)
    }, [address])

    //This runs when CoordContext changes
    useEffect(() => {
        if (coord.lat != null && coord.lng != null){
            reverseGeo(coord.lat, coord.lng).city
        }
    }, [coord])

    let sheetProps = {
        className: "wikibox-sheet",
        style: {height: 'auto'},
        backdrop: true,
        swipeToClose: true,
        swipeToStep: true,
        closeByBackdropClick: true,
        closeOnEscape: true
    };
    if (Framework7.device.desktop) {
        sheetProps.swipeToStep = false;
    }

    return (
        <>
            <Fab position='center-top' id="debug-fab-open-wikibox" text="Press to show info" onClick={() => f7.sheet.open($('.wikibox-sheet'))}>
            </Fab>
            <Sheet
                {...sheetProps}
            >
                <div className="sheet-modal-inner">
                    <div className="sheet-modal-swipe-step">
                        <div className="display-flex padding justify-content-space-between align-items-center">

                            <h1>{address}:</h1>
                            <Icon f7='location'></Icon>
                        </div>
                    </div>
                    <div className="padding-horizontal padding-bottom">
                        <List>
                            <ListItem title="Population">70,000</ListItem>
                            <ListItem title="State">Baden-Wuerttemberg</ListItem>
                        </List>
                        <div className="margin-top text-align-center">Swipe up for more details</div>
                    </div>
                    <BlockTitle medium className="margin-top">
                        Wiki
                    </BlockTitle>
                    <p>
                        {wikipedia}
                    </p>
                </div>
            </Sheet>
        </>
    );
}
