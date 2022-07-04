import React, { useContext, useEffect } from "react";
import {MapContainer, TileLayer, useMapEvents, useMap, ZoomControl} from "react-leaflet";
import "../css/leaflet.css";
import "../css/app.css";
import {Fab, Icon, PageContent} from "framework7-react";
import { CoordContext } from '../js/Context';

export default function Map(){

    const locateFabClickEvent = new Event('handleFabClick');
    const {coord, setCoord} = useContext(CoordContext)

    function HandleFabClick(){
        const map = useMap();
        addEventListener('handleFabClick', function () {map.locate()}, false);
    }

    function EventHandler() {
        const map = useMapEvents({
            locationfound(e) {
                setCoord(e.latlng)
            },
            locationerror() {
                alert("Unfortunately, we could not find your location")
            }
        })
        return null
    }

    function FlyToCoord() {
        const map = useMap()
        if (coord.lat != null && coord.lng != null){
            map.flyTo(coord, 15)
            console.log(coord)
        }
    }

    return (
        <>
            <Fab position="right-bottom" slot="fixed" id="fab-button" onClick={() => {
                dispatchEvent(locateFabClickEvent);
            }}>
                <Icon f7="placemark_fill" ios="f7:placemark_fill" aurora="f7:placemark_fill"></Icon>
            </Fab>
            <PageContent className='page-content-map'>
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} id="map" zoomControl={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position="bottomleft"/>
                    <HandleFabClick/>
                    <FlyToCoord/>
                    <EventHandler/>
                </MapContainer>
            </PageContent>
        </>
    );
}