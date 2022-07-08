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
import { CoordContext, AddressContext, HistoryArray, DestinationContext } from '../js/Context';
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from '../components/Maps';
import SearchBar from '../components/SearchBar';
import '../css/app.css';
import '../css/home.css';


const HomePage = () => {
  const [coord, setCoord] = useState({lat: null, lng: null});
  const [address, setAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [destination, setDestination] = useState({});



  return (
  <CoordContext.Provider value={{coord, setCoord}}>
  <AddressContext.Provider value={{address, setAddress}}>
  <HistoryArray.Provider value={{history, setHistory}}>
  <DestinationContext.Provider value={{destination, setDestination}}>
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
          <Button panelOpen="right" className='toolbutton'><Icon f7="person_crop_circle" className='toolicon'></Icon></Button>
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
  </DestinationContext.Provider>
  </HistoryArray.Provider>
  </AddressContext.Provider>
  </CoordContext.Provider>
)};
export default HomePage;