/**
 * The History component is used to display the history of the map
 */
import React, { useContext, useEffect, useState } from 'react';
import '../css/History.css';
import { DestinationContext, CenterLocationContext } from '../js/Context';
import { List, ListItem, BlockTitle, Button, Icon } from 'framework7-react';
import { setRoutingWaypoint } from './Routing';

/**
 * Get the component for the history.
 * @returns {JSX.Element}
 * @constructor
 */
export default function History() {
  const [ history, setHistory ] = useState([]);
  const { destination, setDestination } = useContext(DestinationContext);
  const { setCenterLocation } = useContext(CenterLocationContext);

  /**
   * Handle the click of a history item.
   * @param hist - the clicked history item
   */
  function handleClick(hist) {
    setCenterLocation(hist);
    setDestination(hist);
    setRoutingWaypoint(hist.coordinates);
  }

  /**
   * Update the history list when the destination changes.
   */
  useEffect(() => {
    if (!destination.coordinates || !destination.address.city || !destination.address.country) {
      return;
    }

    // bump the history element to front if it already exists
    for (let i = 0; i < history.length; i++) {
      if (
        history[i].coordinates.lat === destination.coordinates.lat &&
        history[i].coordinates.lng === destination.coordinates.lng
      ) {
        setHistory([history[i], ...history.slice(0, i), ...history.slice(i + 1)]);
        return;
      }
    }

    //adding element to history and removing the oldest elements if the history is full (more than 10 items)
    setHistory([destination, ...history.slice(0, 9)]);
  }, [destination]);

  return (
    <>
      <BlockTitle>
        <h1>History</h1>
      </BlockTitle>
      <List>
        {history.map((value, index, array) => {
          return (
            <ListItem
              className="historyElement"
              key={[array[index].coordinates.lat, array[index].coordinates.lng]}>
              <div className="historyText">
                {array[index].address.city + ', ' + array[index].address.country}
              </div>
              <Button
                className="historyButton"
                onClick={() => {
                  handleClick(array[index]);
                }}>
                <Icon f7="arrow_right"></Icon>
              </Button>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
