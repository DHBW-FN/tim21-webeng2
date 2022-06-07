import React, { useState, useRef } from 'react';
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

    return (
      <Page>
      <Button fill id="press_on_Location_Icon" sheetOpen=".demo-sheet-swipe-to-step">
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
              
                <h1>Friedrichshafen:</h1>
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
          Friedrichshafen ist eine große Mittelstadt am nördlichen Ufer des Bodensees und die Kreisstadt des Bodenseekreises, zugleich dessen größte Stadt und nach Konstanz die zweitgrößte Stadt am Bodensee. Gemeinsam mit Ravensburg und Weingarten bildet Friedrichshafen eines von 14 Oberzentren (in Funktionsergänzung) in Baden-Württemberg. Seit April 1956 ist Friedrichshafen Große Kreisstadt, seit September 2011 kann es sich durch die Zeppelin Universität außerdem Universitätsstadt nennen.
          </p>
      </Sheet>
      </Page>
          
      





        
    );
}
