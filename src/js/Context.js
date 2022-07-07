//in this file we initalize "global" variables that can be given to any component
//https://www.youtube.com/watch?v=lnL6gRkQ5g8&ab_channel=PedroTech
import { createContext } from 'react';

export const CoordContext = createContext({});
export const AddressContext = createContext({});
export const HistoryArray = createContext({});
export const TargetLocation = createContext({});
export const START_LOCATION = { lat: 47.67989, lng: 9.47554 };
