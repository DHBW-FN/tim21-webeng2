import React, { useContext, useEffect } from 'react';
import '../css/History.css';
import { HistoryArray, DestinationContext } from '../js/Context';
import { List, ListItem, BlockTitle, Button, Icon } from 'framework7-react';

export default function History() {
  const { history, setHistory } = useContext(HistoryArray);
  const { destination, setDestination } = useContext(DestinationContext);

  function handleClick(hist) {
    setDestination(hist);
  }

  useEffect(() => {
    if(!destination.coordinates || !destination.address.city || !destination.address.country) {
      return;
    }

    for (let i = 0; i < history.length; i++) {
      if (history[i].coordinates.lat === destination.coordinates.lat && history[i].coordinates.lng === destination.coordinates.lng) {
        setHistory([history[i], ...history.slice(0, i), ...history.slice(i + 1)]);
        return;
      }
    }

    //adding element to history and removing the oldest element if the history is full (more than 10 items)
    setHistory([destination, ...history.slice(0, 9)]);
  } , [destination])

  return (
    <>
      <BlockTitle>
        <h1>History</h1>
      </BlockTitle>
      <List>
        {history.map((value, index, array) => {
          return (
            <ListItem className="historyElement" key={[array[index].coordinates.lat, array[index].coordinates.lng]}>
              <div className="historyText">{array[index].address.city + ', ' + array[index].address.country}</div>
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
