import React from 'react';
import {
    Page,
    Toolbar,
    Icon,
    Fab,
    Button,
    Panel,
    BlockTitle,
    View,
    PageContent, Navbar,
} from 'framework7-react';
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from '../components/Maps';
import '../css/app.css';
import '../css/home.css';

const HomePage = () => (
  
  <Page name="home" className='home'>
      {/*Only for testing purpose replace later*/}
      <Navbar>
          <WikiBox />
      </Navbar>
     {/* Toolbar */}
    <Toolbar tabbar bottom className='toolbar'>
      <Button panelOpen="left" className='toolbutton'><Icon f7="memories" className='toolicon'></Icon></Button>
      <Button className='toolbutton'> <Icon f7="map" className='toolicon'></Icon></Button>
      <Button panelOpen="right" className='toolbutton'><Icon f7="person_crop_circle" className='toolicon'></Icon></Button>
    </Toolbar>
     {/* Page content */}
    <Fab position="right-bottom" slot="fixed">
      <Icon f7="placemark_fill" ios="f7:placemark_fill" aurora="f7:placemark_fill"></Icon>
    </Fab>
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
    <PageContent className='page-content-map'>
      <Map/>
    </PageContent>
  </Page>
);
export default HomePage;