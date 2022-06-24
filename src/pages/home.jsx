import React from 'react';
import {
    Page,
    Toolbar,
    Icon,
    Button,
    Panel,
    BlockTitle,
    View
} from 'framework7-react';
import { CoordContext } from '../js/Context';
import { AdressContext } from '../js/Context';
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from '../components/Maps';
import SearchBar from '../components/SearchBar';
import '../css/app.css';
import '../css/home.css';


const HomePage = () => {
  const [coord, setCoord] = useState({lat: null, lng: null});
  const [adress, setAdress] = useState("");

  return (
  <Page name="home" className='home'>
      {/*Only for testing purpose replace later*/}
      <CoordContext.Provider value={{coord, setCoord}}>
      <AdressContext.Provider value={{adress, setAdress}}>
      {/*Only for testing purpose replace later*/}
      <WikiBox />
     {/* Toolbar */}
    <Toolbar tabbar bottom className='toolbar'>
      <Button panelOpen="left" className='toolbutton'><Icon f7="memories" className='toolicon'></Icon></Button>
      <Button className='toolbutton'> <Icon f7="map" className='toolicon'></Icon></Button>
      <Button panelOpen="right" className='toolbutton'><Icon f7="person_crop_circle" className='toolicon'></Icon></Button>
    </Toolbar>
    {/* Page content */}
    <SearchBar></SearchBar>
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
    </AdressContext.Provider>
      </CoordinatesContext.Provider>
      </Page>
)};
export default HomePage;