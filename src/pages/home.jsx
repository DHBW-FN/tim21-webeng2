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
import {
  AddressContext,
  HistoryArray,
  DestinationContext,
  UserSettingsContext,
  OriginContext,
  DEFAULT_DESTINATION, DEFAULT_USER_SETTINGS
} from "../js/Context";
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from "../components/Maps";
import SearchBar from '../components/SearchBar';
import '../css/app.css';
import '../css/home.css';
import Account from "../components/Account";

function loadUserSettings() {
  let settings = JSON.parse(localStorage.getItem('userSettings'));

  if (settings === null) {
    console.log("No user settings found, using default settings");
    settings = DEFAULT_USER_SETTINGS;
  }

  // add default values if missing
  Object
    .keys(DEFAULT_USER_SETTINGS)
    .filter(key => settings[key] === undefined)
    .forEach(key => settings[key] = DEFAULT_USER_SETTINGS[key]);

  // remove deprecated values
  Object
    .keys(settings)
    .filter(k => !(k in DEFAULT_USER_SETTINGS))
    .forEach(k => delete settings[k]);

  return settings;
}


const HomePage = () => {
  const [userSettings, setUserSettings] = useState(loadUserSettings());
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [destination, setDestination] = useState(DEFAULT_DESTINATION);
  const [origin, setOrigin] = useState({});



  return (
  <UserSettingsContext.Provider value={{userSettings, setUserSettings}}>
  <AddressContext.Provider value={{address, setAddress}}>
  <HistoryArray.Provider value={{history, setHistory}}>
  <DestinationContext.Provider value={{destination, setDestination}}>
  <OriginContext.Provider value={{origin, setOrigin}}>
  <Page name="home" className='home'>
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
    <Panel resizable left reveal swipeOnlyClose>
      <View>
        <Page>
          <BlockTitle>
            <History></History>
          </BlockTitle>
        </Page>
      </View>
    </Panel>
    <Panel resizable right reveal>
      <View>
        <Account />
      </View>
    </Panel>
    <Map/>

      </Page>
  </OriginContext.Provider>
  </DestinationContext.Provider>
  </HistoryArray.Provider>
  </AddressContext.Provider>
  </UserSettingsContext.Provider>
)};
export default HomePage;