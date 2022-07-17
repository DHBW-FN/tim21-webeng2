import React, { useState } from 'react';
import { Page, Toolbar, Icon, Button, Panel, BlockTitle, View } from 'framework7-react';
import {
  DestinationContext,
  UserSettingsContext,
  OriginContext,
  CenterLocationContext,
  DEFAULT_DESTINATION,
  DEFAULT_USER_SETTINGS
} from '../js/Context';
import WikiBox from '../components/WikiBox';
import History from '../components/History';
import Map from '../components/Maps';
import SearchBar from '../components/SearchBar';
import '../css/app.css';
import '../css/home.css';
import Account from '../components/Account';

function loadUserSettings() {
  let settings = JSON.parse(localStorage.getItem('userSettings'));

  if (settings === null) {
    console.log('No user settings found, using default settings');
    settings = DEFAULT_USER_SETTINGS;
  }

  // add default values if missing
  Object.keys(DEFAULT_USER_SETTINGS)
    .filter((key) => settings[key] === undefined)
    .forEach((key) => (settings[key] = DEFAULT_USER_SETTINGS[key]));

  // remove deprecated values
  Object.keys(settings)
    .filter((k) => !(k in DEFAULT_USER_SETTINGS))
    .forEach((k) => delete settings[k]);

  return settings;
}

const HomePage = () => {
  const [userSettings, setUserSettings] = useState(loadUserSettings());
  const [destination, setDestination] = useState(DEFAULT_DESTINATION);
  const [origin, setOrigin] = useState({});
  const [centerLocation, setCenterLocation] = useState(DEFAULT_DESTINATION);

  return (
    <UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
      <Page name="home" className="home">
        <Toolbar tabbar bottom className="toolbar">
          <Button panelOpen="left" className="toolbutton">
            <Icon f7="memories" className="toolicon"></Icon>
          </Button>
          <Button className="toolbutton">
            {' '}
            <Icon f7="map" className="toolicon"></Icon>
          </Button>
          <Button panelOpen="right" className="toolbutton">
            <Icon f7="gear" className="toolicon"></Icon>
          </Button>
        </Toolbar>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <CenterLocationContext.Provider value={{ centerLocation, setCenterLocation }}>
            <OriginContext.Provider value={{ origin, setOrigin }}>
              <SearchBar />
              <WikiBox />
              <Map />
            </OriginContext.Provider>
            <Panel resizable left reveal swipeOnlyClose>
              <View>
                <Page>
                  <BlockTitle>
                    <History />
                  </BlockTitle>
                </Page>
              </View>
            </Panel>
          </CenterLocationContext.Provider>
        </DestinationContext.Provider>
        <Panel resizable right reveal>
          <View>
            <Account />
          </View>
        </Panel>
      </Page>
    </UserSettingsContext.Provider>
  );
};
export default HomePage;
