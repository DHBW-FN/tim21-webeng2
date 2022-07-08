import React, { useContext } from "react";
import {MapContainer, TileLayer, useMapEvents, useMap, ZoomControl} from "react-leaflet";
import "../css/leaflet.css";
import "../css/app.css";
import {Fab, Icon, PageContent} from "framework7-react";
import {CoordContext, DestinationContext} from '../js/Context';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export async function getAddressForCoordinates(latitude, longitude) {
    const results = await geocodeByAddress(`${latitude}, ${longitude}`);

    let address = {}

    for (let i = 0; i < results[0].address_components.length; i++) {
        //Country
        if (results[0].address_components[i].types[0].includes('country')) {
            address.country = results[0].address_components[i].long_name;
        }
        //City
        if (results[0].address_components[i].types[0].includes('locality') || results[0].address_components[i].types[0].includes('postal_town')) {
            address.city = results[0].address_components[i].long_name;
        }
        //Street
        if (results[0].address_components[i].types[0].includes('route') || results[0].address_components[i].types[0].includes('premise')) {
            address.street = results[0].address_components[i].long_name;
        }
        //Street number
        if (results[0].address_components[i].types[0].includes('street_number')) {
            address.streetNumber = results[0].address_components[i].long_name;
        }
    }

    if (address.country && address.city && address.street && address.streetNumber) {
        return address
    } else {
        console.error("No address found for " + latitude + " " + longitude + "\n")
        console.log(results)
        console.log(address)
        return null
    }
}

export async function getCoordinatesForAddress(address) {
    const results = await geocodeByAddress(address);
    return getLatLng(results[0]);
}

export async function getObjectByCoordinates(latitude, longitude) {
    return {
        coordinates: {
            lat: latitude,
            lng: longitude
        },
        address: await getAddressForCoordinates(latitude, longitude)
    }
}

export async function getObjectByAddress(address) {
    const coordinates = await getCoordinatesForAddress(address);
    return {
        coordinates: {
            lat: coordinates.lat,
            lng: coordinates.lng
        },
        address: address
    };
}

export default function Map(){

    const locateFabClickEvent = new Event('handleFabClick');
    const {coord, setCoord} = useContext(CoordContext)
    const { setDestination } = useContext(DestinationContext)

    function HandleClick(){
        const map = useMap()
        map.on("click", (e) => {
            setCoord(e.latlng)
            setDestination(getObjectByCoordinates(e.latlng.lat, e.latlng.lng))
        })
    }

    function HandleFabClick(){
        const map = useMap();
        addEventListener('handleFabClick', function () {map.locate()}, false);
    }

    function EventHandler() {
        const map = useMapEvents({
            locationfound(e) {
                setCoord(e.latlng)
                map.flyTo(e.latlng, 15)
            },
            locationerror() {
                alert("Unfortunately, we could not find your location")
            }
        })
        return null
    }

    function FlyToAddress(){
        const map = useMap()
        if(coord.lat != null && coord.lng != null){
            map.flyTo(coord)
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
                    <HandleClick/>
                    <HandleFabClick/>
                    <EventHandler/>
                    <FlyToAddress/>
                </MapContainer>
            </PageContent>
        </>
    );
}