import React, { useState } from 'react';
import {
  Page,
  Button,
  Sheet,
  BlockTitle,
  List,
  ListItem,
  Icon,
} from 'framework7-react';

export default function WikiBox() {
    const [wikipedia, setWikipedia] = useState(["Waiting for article..."]);
    const [address, setAddress] = useState("Waiting for address...");

    function wikipediaLookup(city){
        fetch(`https://de.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${city}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setWikipedia(data.query.pages[Object.keys(data.query.pages)[0]].extract)
            })
    }

    async function reverseGeo(latitude, longitude) {
        return await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${latitude}&lat=${longitude}`)
            .then(response => response.json())
            .then(data => data.address)
            .then(city => setAddress(city))
    }

    // this function call is for demo purposes. Call somewhere else in the future
    reverseGeo(9.4650, 47.6567).then(r => console.log(r));

    return (
      <Page>
      <Button fill id="press_on_Location_Icon" sheetOpen=".demo-sheet-swipe-to-step" onClick={() => wikipediaLookup(address)}>
              Press to show info
      </Button>
      <Sheet
          className="demo-sheet-swipe-to-step"
          style={{ height: 'auto', '--f7-sheet-bg-color': '#fff' }}
          swipeToClose
          swipeToStep
          backdrop
          closeOnEscape
          closeByBackdropClick
        >
        <div className="sheet-modal-swipe-step">
            <div className="display-flex padding justify-content-space-between align-items-center">

                <h1>{address.city}:</h1>
                <Icon f7='location'></Icon>
            </div>
          <div className="padding-horizontal padding-bottom">
              <List>
              <ListItem title="Einwohnerzahl">70.000</ListItem>
              <ListItem title="Bundesland">Baden Würtemberg</ListItem>
              </List>
              <div className="margin-top text-align-center">Swipe up for more details</div>
            </div>
          </div>
          <BlockTitle medium className="margin-top">
            Wiki
          </BlockTitle>
          <p>
              {wikipedia}
          </p>
      </Sheet>
      </Page>
          
      





        
    );
}
