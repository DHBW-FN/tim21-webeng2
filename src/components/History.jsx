import React, {useContext} from 'react';
import '../css/History.css';
import { HistoryArray, CoordContext, AdressContext } from '../js/Context';
import {
    List,
    ListItem,
    BlockTitle,
    Button,
    Icon,
} from 'framework7-react';

export default function History(){
    const { history } = useContext(HistoryArray);
    const { setCoord } = useContext(CoordContext);
    const { setAddress } = useContext(AdressContext);


    function handleClick(hist) {
        setCoord({lat: hist.lat, lng: hist.lng})
        setAddress(hist.city)

    }

    return (
        <>
            <BlockTitle><h1>History</h1></BlockTitle>
            <List>
                {history.map((hist, index, array) => {return <ListItem className='historyElement'><div className='historyText'>{array[array.length -1 -index].city}</div><Button className='historyButton' onClick={ () => {handleClick(array[array.length -1 -index])}}><Icon f7="arrow_right"></Icon></Button></ListItem>})}
            </List>
        </>
    )
}