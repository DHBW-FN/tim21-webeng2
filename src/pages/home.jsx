import React from 'react';
import {
    Page,
    Toolbar,
    Icon,
    Button,
    Panel,
    BlockTitle,
    View,
    Navbar,
    PageContent
} from 'framework7-react';
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from '../components/Maps';
import '../css/app.css';
import '../css/home.css';

const HomePage = () => (
  
  <Page name="home" className='home'>
    {/*Only for testing purpose replace later*/}
    <WikiBox />
    {/* Toolbar */}
    <Toolbar tabbar bottom className='toolbar'>
      <Button panelOpen="left" className='toolbutton'><Icon f7="memories" className='toolicon'></Icon></Button>
      <Button className='toolbutton'> <Icon f7="map" className='toolicon'></Icon></Button>
      <Button panelOpen="right" className='toolbutton'><Icon f7="person_crop_circle" className='toolicon'></Icon></Button>
    </Toolbar>
    {/* Page content */}
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
);
export default HomePage;