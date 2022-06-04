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
import WikiBox from '../js/WikiBox';
import History from '../js/History';


const HomePage = () => (
  
  <Page name="home" className='home'>
    
    {/* Toolbar */}
    <Toolbar tabbar bottom>
      <Button panelOpen="left">History</Button>
      <Link tabLink="tab2-map" tabLinkActive>Map</Link>
      <Button panelOpen="right">account</Button>
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
          Account
        </BlockTitle>
        </Page>
      </View>
    </Panel>
  </Page>
);
export default HomePage;