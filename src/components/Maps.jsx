import React from "react";
import {MapContainer, TileLayer, useMapEvents, useMap} from "react-leaflet";
import "../css/leaflet.css";
import "../css/app.css";
import {Fab, Icon, PageContent} from "framework7-react";

export default function Map(){

    const event = new Event('handleFabClick');

    function HandleFabClick(){
        const map = useMap();
        addEventListener('handleFabClick', function () {map.locate()}, false);
    }

    function EventHandler() {
        const map = useMapEvents({
            locationfound(e) {
                map.flyTo(e.latlng, 15)
            },
            locationerror() {
                alert("Unfortunately, we could not find your location")
            }
        })
        return null
    }

    return (
        <>
            <Fab position="right-bottom" slot="fixed" id="fab-button" onClick={() => {
                dispatchEvent(event);
            }}>
                <Icon f7="placemark_fill" ios="f7:placemark_fill" aurora="f7:placemark_fill"></Icon>
            </Fab>
            <PageContent className='page-content-map'>
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} id="map" whenCreated={map => this.setState({ map })}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <HandleFabClick/>
                    <EventHandler/>
                </MapContainer>
            </PageContent>
        </>
    );
}