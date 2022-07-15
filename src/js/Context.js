//in this file we initalize "global" variables that can be given to any component
//https://www.youtube.com/watch?v=lnL6gRkQ5g8&ab_channel=PedroTech
import { createContext } from 'react';

export const AddressContext = createContext({});
export const HistoryArray = createContext({});
export const DestinationContext = createContext({});
export const OriginContext = createContext({});
export const UserSettingsContext = createContext({});

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
export const DEFAULT_WIKI = "No Wikipedia found for this destination :(";
export const DEFAULT_USER_SETTINGS = {
  language: {
    name: 'Language',
    value: 'en',
    options: ["en"]
  },
  showRouting: {
    name: 'Show routing',
    value: false
  },
  darkMode: {
    name: 'Dark Mode',
    value: false,
  }
}