import React, {useState} from 'react';
import {
    Page,
    Toolbar,
    Icon,
    Button,
    Panel,
    BlockTitle,
    View
} from 'framework7-react';
import { AddressContext, HistoryArray, DestinationContext, UserSettingsContext } from '../js/Context';
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from "../components/Maps";
import SearchBar from '../components/SearchBar';
import '../css/app.css';
import '../css/home.css';
import {createContext} from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);


const HomePage = () => {
  const [userSettings, setUserSettings] = useState({
    language: 'en',
    showRouting: false,
    }
  );
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [destination, setDestination] = useState({
    coordinates: {
      lat: 47.65673289999999,
      lng: 9.4649538
    },
    address: {
      country: "Germany",
      city: "Friedrichshafen",
      street: "Hochstraße",
      streetNumber: "21"
    }
  });



  return (
  <ThemeContext.Provider value={{theme, toggleTheme}}>
  <UserSettingsContext.Provider value={{userSettings, setUserSettings}}>
  <AddressContext.Provider value={{address, setAddress}}>
  <HistoryArray.Provider value={{history, setHistory}}>
  <DestinationContext.Provider value={{destination, setDestination}}>
  <Page name="home" className={theme}>
      {/*Only for testing purpose replace later*/}

      {/*Only for testing purpose replace later*/}
      <WikiBox />
     {/* Toolbar */}

    {/* Page content */}
    <SearchBar></SearchBar>
          <Toolbar tabbar bottom className='toolbar'>
          <Button panelOpen="left" className='toolbutton'><Icon f7="memories" className='toolicon'></Icon></Button>
          <Button className='toolbutton'> <Icon f7="map" className='toolicon'></Icon></Button>
          <Button panelOpen="right" className='toolbutton'><Icon f7="gear" className='toolicon'></Icon></Button>
      </Toolbar>
    <Panel resizable left reveal swipeOnlyClose className={theme}>
      <View>
        <Page>
          <BlockTitle>
            <History></History>
          </BlockTitle>
        </Page>
      </View>
    </Panel>
    <Panel resizable right reveal className={theme}>
      <View>
        <Page>
        <BlockTitle>
          <h1>
          Account
          </h1>
          <div id="container">
          <h3>
          Light/Dark Mode
          </h3>
          <div className="switch">
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
          </div>
          </div>
        </BlockTitle>
        </Page>
      </View>
    </Panel>
    <Map/>

  </Page>
  </DestinationContext.Provider>
  </HistoryArray.Provider>
  </AddressContext.Provider>
  </UserSettingsContext.Provider>
  </ThemeContext.Provider>

)};

export default HomePage;