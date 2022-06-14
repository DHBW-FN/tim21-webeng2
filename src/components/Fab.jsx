import React from "react";
import "../css/leaflet.css";
import "../css/app.css";
import {
    Icon,
    Fab
} from 'framework7-react';

export default function LocateFab(){

    return (
        <Fab position="right-bottom" slot="fixed" id="fab-button" onClick={() => {
            console.log("fab-button clicked");
        }}>
            <Icon f7="placemark_fill" ios="f7:placemark_fill" aurora="f7:placemark_fill"></Icon>
        </Fab>
    );
}