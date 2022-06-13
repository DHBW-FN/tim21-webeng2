import React, {useEffect, useState} from 'react';
import {
  Page,
  Button,
  Sheet,
  BlockTitle,
  List,
  ListItem,
  Icon,
} from 'framework7-react';
import Framework7 from 'framework7/types';

export default function WikiBox() {
    const [wikipedia, setWikipedia] = useState(["Waiting for Wikipedia..."]);
    const [address, setAddress] = useState(["Waiting for address..."]);

    async function wikipediaLookup(city){
        return await fetch(`https://de.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${city}`)
            .then(response => response.json())
            .then(data => data.query.pages[Object.keys(data.query.pages)[0]].extract)
            .then(data => setWikipedia(data))
    }

    async function reverseGeo(latitude, longitude) {
        return await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${latitude}&lat=${longitude}`)
            .then(response => response.json())
            .then(data => data.address)
            .then(city => setAddress(city))
    }

    function wikiSheetContent(){
        return (
            <>
                <div className="sheet-modal-inner">
                    <div className="sheet-modal-swipe-step">
                        <div className="display-flex padding justify-content-space-between align-items-center">
                            <h1>{address.city}:</h1>
                            <Icon f7='location'></Icon>
                        </div>
                        <div className=" text-align-center"></div>
                    </div>
                    <div className="page-content" style={{height: "auto", maxHeight: "100vh"}}>
                        <div className="padding-horizontal padding-bottom">
                            <List>
                                <ListItem title="Einwohnerzahl">70.000</ListItem>
                                <ListItem title="Bundesland">Baden Würtemberg</ListItem>
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
                </div>
            </>
        )
    }

    // This runs when the component is first loaded
    useEffect(() => {
        reverseGeo(9.4650, 47.6567).city
    }, [])

    // This updates the wikipedia text every time the address changes
    useEffect(() => {
        wikipediaLookup(address.city)
    }, [address])

    return (
        <Page>
            <Button fill id="press_on_Location_Icon" sheetOpen=".wikibox-sheet" onClick={() => wikipediaLookup(address.city)}>
                Press to show info
            </Button>
            {Framework7.device.desktop ? (
                    <Sheet
                        className="wikibox-sheet"
                        style={{ height: 'auto', maxHeight: '100%','--f7-sheet-bg-color': '#fff' }}
                        backdrop
                        swipeToClose
                        closeOnEscape
                        closeByBackdropClick
                    >
                        {wikiSheetContent()}

                    </Sheet>
                ) :
                (
                    <Sheet
                        className="wikibox-sheet"
                        style={{ height: 'auto', maxHeight: '100%', '--f7-sheet-bg-color': '#fff' }}
                        backdrop
                        swipeToStep
                        swipeToClose
                        closeOnEscape
                        closeByBackdropClick
                    >
                        {wikiSheetContent()}
                    </Sheet>
                )}
        </Page>
    );
}
