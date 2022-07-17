/**
 * The Account component is used to display the account information.
 */
import React, { useContext, useEffect } from 'react';
import { BlockTitle, List, ListItem, Page, Toggle } from 'framework7-react';
import { UserSettingsContext } from '../js/Context';

/**
 * Generates the account page.
 *
 * @returns {JSX.Element} - The account page.
 */
export default function Account() {
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  }, [userSettings]);

  /**
   * Get the component for a setting.
   *
   * @param key - the key of the setting
   * @returns {JSX.Element} - the html code for the setting
   */
  function getSettingComponent(key) {
    switch (typeof userSettings[key].value) {
      case 'boolean':
        return (
          <ListItem key={key}>
            <span>{userSettings[key].name}</span>
            <Toggle
              checked={userSettings[key].value}
              onChange={() => {
                setUserSettings({
                  ...userSettings,
                  [key]: { ...userSettings[key], value: !userSettings[key].value }
                });
              }}
            />
          </ListItem>
        );
    }
  }

  return (
    <Page>
      <BlockTitle>
        <h1>Settings</h1>
      </BlockTitle>
      <List simpleList>
        {Object.keys(userSettings).map((key) => {
          return getSettingComponent(key);
        })}
      </List>
      <BlockTitle>
        <h1>Attributions</h1>
      </BlockTitle>
        <List simpleList>
          <ListItem>
            <span>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</span>
          </ListItem>
        </List>
        <BlockTitle>
            <h1>Contact</h1>
        </BlockTitle>
        <List simpleList>
          <ListItem>
            <span><a className="link external" href="https://github.com/DHBW-FN/web-eng-2">Github</a></span>
          </ListItem>
          <ListItem>
            <span><a className="link external" href="mailto:email@example.com">Mail</a></span>
          </ListItem>
          <ListItem>
            <span><a class="link external" href="tel:+44 (11) 7325 7425">Telephone</a></span>
          </ListItem>
        </List>
    </Page>
  );
}
