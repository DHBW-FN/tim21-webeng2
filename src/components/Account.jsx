import { useContext, useEffect } from "react";
import { BlockTitle, List, ListItem, Page, Toggle } from "framework7-react";
import { UserSettingsContext } from "../js/Context";


export default function Account() {
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  }, [userSettings]);

  function getSetting(key) {
    console.log("getSetting: " + key);
    switch (typeof userSettings[key].value) {
      case "boolean":
        return (
          <ListItem key={key}>
            <span>{userSettings[key].name}</span>
            <Toggle checked={userSettings[key].value} onChange={() => {
              setUserSettings({ ...userSettings, [key]: { ...userSettings[key], value: !userSettings[key].value } });
            }} />
          </ListItem>
        );
    }
  }

  return (
    <Page>
      <BlockTitle>
        <h1>Account</h1>
      </BlockTitle>
      <List simpleList>
        {Object.keys(userSettings).map((key) => {
          return getSetting(key);
        })}
      </List>
    </Page>
  );
}