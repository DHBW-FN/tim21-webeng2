import { useContext, useEffect } from "react";
import { BlockTitle, List, ListItem, Page, Toggle } from "framework7-react";
import { UserSettingsContext } from "../js/Context";


export default function Account() {
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  }, [userSettings]);

  return (
    <Page>
      <BlockTitle>
        <h1>Account</h1>
      </BlockTitle>
      <List simpleList>
        <ListItem>
          <span>Dark Mode</span>
          <Toggle checked={userSettings.darkMode} onChange={() => {
            setUserSettings({ ...userSettings, darkMode: !userSettings.darkMode });
          }} />
        </ListItem>
      </List>
    </Page>
  );
}