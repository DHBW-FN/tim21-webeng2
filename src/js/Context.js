//in this file we initalize "global" variables that can be given to any component
//https://www.youtube.com/watch?v=lnL6gRkQ5g8&ab_channel=PedroTech
import { createContext } from 'react';

export const CoordContext = createContext({});
export const AdressContext = createContext({});
export const UnknownCity = "Unknown City";
export const NoWiki = "No Wiki data available!";
export const LoadWiki = "Loading Wiki data...";
