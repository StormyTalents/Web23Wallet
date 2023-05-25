import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Router } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import { SettingContext } from "src/utility/context";

import WelcomePage from "./pages/home/welcome";

function App() {
  const { settings, saveSettings } = useContext(SettingContext);
  const { i18n } = useTranslation();

  const setLanguage = async () => {
    if (!localStorage.getItem("language")) {
      try {
        const { data } = await axios("http://ip-api.com/json");
        switch (data.country) {
          case "Spain": {
            i18n.changeLanguage("es");
            saveSettings({ ...settings, language: "es" });
            break;
          }
          case "Italy": {
            i18n.changeLanguage("italian");
            saveSettings({ ...settings, language: "italian" });
            break;
          }
          case "Germany": {
            i18n.changeLanguage("de");
            saveSettings({ ...settings, language: "de" });
            break;
          }
          case "France": {
            i18n.changeLanguage("french");
            saveSettings({ ...settings, language: "french" });
            break;
          }
          case "India": {
            i18n.changeLanguage("hindi");
            saveSettings({ ...settings, language: "hindi" });
            break;
          }
          case "Egypt": {
            i18n.changeLanguage("arabic");
            saveSettings({ ...settings, language: "arabic" });
            break;
          }
          case "Japan": {
            i18n.changeLanguage("jp");
            saveSettings({ ...settings, language: "jp" });
            break;
          }
          case "China": {
            i18n.changeLanguage("mandarin");
            saveSettings({ ...settings, language: "mandarin" });
            break;
          }
          case "Poland": {
            i18n.changeLanguage("polish");
            saveSettings({ ...settings, language: "polish" });
            break;
          }
          default: {
            i18n.changeLanguage("en");
            saveSettings({ ...settings, language: "en" });
            break;
          }
        }
      } catch (e) {
        saveSettings({ ...settings, language: "en" });
      }
    } else i18n.changeLanguage(settings.language);
  };

  useEffect(() => {
    setLanguage();
  }, [settings]);

  return (
    <Router>
      <WelcomePage />
    </Router>
  );
}

export default App;
