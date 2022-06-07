import React from 'react';
import {
  Page,
  Link,
  Toolbar,
  Icon,
  Fab,
  Button,
  Panel,
  BlockTitle,
  View,
} from 'framework7-react';
import WikiBox from '../components/WikiBox';
import History from '../components/History';


const HomePage = () => (
  
  <Page name="home" className='home'>
    
    {/* Toolbar */}
    <Toolbar tabbar bottom>
      <Button panelOpen="left"><Icon f7="memories"></Icon></Button>
      <Button> <Icon f7="map"></Icon></Button>
      <Button panelOpen="right"><Icon f7="person_crop_circle"></Icon></Button>
    </Toolbar>
    {/* Page content */}
    <Fab position="right-bottom" slot="fixed">
      <Icon f7="placemark_fill" ios="f7:placemark_fill" aurora="f7:placemark_fill"></Icon>
    </Fab>
    <WikiBox></WikiBox>


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
  </Page>
);
export default HomePage;