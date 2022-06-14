import React, {useState, useEffect} from "react";
import "../css/leaflet.css";
import "../css/app.css";
import {
    Icon,
    Fab,
    f7
} from 'framework7-react';
import Framework7 from "framework7";
import {$} from "dom7";

export default function FabForMap(){

    f7.$('#fab-button').on('click', function () {
        console.log('fab-button clicked');
    });

    return (
        <Fab position="right-bottom" slot="fixed" id="fab-button">
            <Icon f7="placemark_fill" ios="f7:placemark_fill" aurora="f7:placemark_fill"></Icon>
        </Fab>
    );
}