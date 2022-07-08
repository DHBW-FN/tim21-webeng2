import React, { useEffect, useContext} from 'react';
import {
    Sheet,
    BlockTitle,
     Fab, f7, Button, Icon } from 'framework7-react';
import Framework7 from 'framework7';
import { $ } from 'dom7';
import '../css/app.css';
import '../css/wikibox.css';
import {DestinationContext} from "../js/Context";

export async function getWikipediaByCity(city) {
    let wiki = fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${city}`)
      .then(response => response.json())
      .then(data => data.query.pages[Object.keys(data.query.pages)[0]].extract)
    return await wiki
}

export default function WikiBox() {
    const { destination, setDestination } = useContext(DestinationContext);

    useEffect(() => {
        async function fetchData() {
            let wiki = await getWikipediaByCity(destination.address.city);
            if (destination.coordinates.lat && destination.coordinates.lng) {
                setDestination({...destination, wikipedia: wiki});
            }
        }
        fetchData();
    }, [destination.address.city])

  let sheetProps = {
    className: 'wikibox-sheet',
    style: { height: 'auto' },
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
      <Fab
        position="center-top"
        id="debug-fab-open-wikibox"
        text="Press to show info"
        onClick={() => f7.sheet.open($('.wikibox-sheet'))}></Fab>
      <Sheet {...sheetProps}>
        <div className="sheet-modal-inner">
          <div className="sheet-modal-swipe-step">
            <div className="display-flex padding justify-content-space-between align-items-center">
              <h1>{destination.address.city}</h1>
              <Button id="navigateButton" tooltip={'Navigate to ' + destination.address.city}>
                <Icon
                  id="navigateIcon"
                  material="directions"
                  size={$('#navigateButton').height()}
                />
              </Button>
            </div>
          </div>
          <div className="padding-horizontal padding-bottom">
            <div className="margin-top text-align-center">Swipe up for more details</div>
          </div>
          <BlockTitle medium className="margin-top">
            Wiki
          </BlockTitle>
          <p>{destination.wikipedia}</p>
        </div>
      </Sheet>
    </>
  );
}
