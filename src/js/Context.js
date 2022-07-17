/**
 * In this file we initialize "global" variables that can be given to any component
 * like described at https://www.youtube.com/watch?v=lnL6gRkQ5g8&ab_channel=PedroTech
 *
 * We also define default values for global variables
 */
import { createContext } from 'react';

// Create variables for our context objects
export const DestinationContext = createContext({});
export const OriginContext = createContext({});
export const UserSettingsContext = createContext({});
export const CenterLocationContext = createContext({});

/**
 * This is the default Destination
 * @type {{address: {country: string, city: string, streetNumber: string, street: string}, coordinates: {lng: number, lat: number}}}
 */
export const DEFAULT_DESTINATION = {
  coordinates: {
    lat: 47.65673289999999,
    lng: 9.4649538
  },
  address: {
    country: 'Germany',
    city: 'Friedrichshafen',
    street: 'Hochstraße',
    streetNumber: '21'
  }
};

/**
 * This is the default Origin
 * @type {{address: {country: string, city: string, streetNumber: string, street: string}, coordinates: {lng: number, lat: number}}}
 */
export const DEFAULT_ORIGIN = {
  coordinates: {
    lat: 47.65673289999999,
    lng: 9.4649538
  },
  address: {
    country: 'Germany',
    city: 'Friedrichshafen',
    street: 'Hochstraße',
    streetNumber: '21'
  }
};

/**
 * This is the default wiki text
 * @type {string}
 */
export const DEFAULT_WIKI = "No Wikipedia found for this destination :(";

/**
 * This is the default User Settings
 * @type {{language: {name: string, options: string[], value: string}, darkMode: {name: string, value: boolean}}}
 */
export const DEFAULT_USER_SETTINGS = {
  language: {
    name: 'Language',
    value: 'en',
    options: ["en"]
  },
  darkMode: {
    name: 'Dark Mode',
    value: false,
  }
}