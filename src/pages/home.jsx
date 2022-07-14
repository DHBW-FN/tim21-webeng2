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
  DEFAULT_DESTINATION
} from "../js/Context";
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from "../components/Maps";
import SearchBar from '../components/SearchBar';
import '../css/app.css';
import '../css/home.css';


const HomePage = () => {
  const [userSettings, setUserSettings] = useState({
    language: 'en',
    showRouting: false,
    }
  );
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
          <Page>
            <BlockTitle>
              <h1>
                Account
              </h1>
            </BlockTitle>
          </Page>
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