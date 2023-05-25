import type { FC, ReactNode } from "react";
import { useState, createContext, useEffect } from "react";

interface IContextProvider {
  children: ReactNode;
}

export type UserData = {
  token: string;
  pubKey: string;
  privKey: string;
  mnemonic: string[];
  accountId: string;
  userName: string;
  themeColor: string;
  type: "initial" | "icon";
  net: boolean;
  contacts: {
    userName: string;
    accountId: string;
    type: "initial" | "icon";
  }[];
  currency: { label: string; symbol: string };
  smart?: boolean;
  smartUid?: string;
};

type Settings = {
  userKeyInfo: string;
  userData: UserData[];
  selectedUser: string;
  godaddyInfo: { gsecret: string; gkey: string };
  language: string;
};

type SettingsContextValue = {
  settings: Settings;
  saveSettings: (update: Settings) => void;
};

export const initialSettings = {
  userKeyInfo: "",
  userData: [
    {
      token: "",
      pubKey: "",
      privKey: "",
      mnemonic: [""],
      accountId: "",
      userName: "",
      themeColor: "lime",
      type: "initial" as "initial" | "icon",
      net: false,
      smart: false,
      currency: { label: "USD", symbol: "$" },
      contacts: [
        {
          userName: "",
          accountId: "",
          type: "initial" as "initial" | "icon",
        },
      ],
      smartUid: "",
    },
  ],
  selectedUser: "",
  godaddyInfo: { gsecret: "", gkey: "" },
  language: "",
};

const restoreSettings = () => {
  let settings = null;
  try {
    let userKeyInfo = localStorage.getItem("userKeyInfo");
    let userData = localStorage.getItem("userData");
    let selectedUser = localStorage.getItem("selectedUser") || "";
    let godaddyInfo = localStorage.getItem("godaddyInfo") || "";
    let language = localStorage.getItem("language") || "";

    settings = {
      userKeyInfo:
        userKeyInfo !== null
          ? JSON.parse(userKeyInfo || "")
          : initialSettings.userKeyInfo,
      userData: userData ? JSON.parse(userData) : initialSettings.userData,
      selectedUser: userData
        ? JSON.parse(selectedUser)
        : initialSettings.selectedUser,
      godaddyInfo: godaddyInfo
        ? JSON.parse(godaddyInfo)
        : initialSettings.godaddyInfo,
      language,
    };
  } catch (e) {
    console.log(e);
  }

  return settings;
};

const storeSettings = (updatedSettings: Settings) => {
  localStorage.setItem(
    "userKeyInfo",
    JSON.stringify(updatedSettings.userKeyInfo)
  );
  localStorage.setItem("userData", JSON.stringify(updatedSettings.userData));
  localStorage.setItem(
    "selectedUser",
    JSON.stringify(updatedSettings.selectedUser)
  );
  localStorage.setItem(
    "godaddyInfo",
    JSON.stringify(updatedSettings.godaddyInfo)
  );
  localStorage.setItem("language", updatedSettings.language);
};

const SettingContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {},
});

const ContextProvider: FC<IContextProvider> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    const restored = restoreSettings();

    if (restored) {
      setSettings(restored);
    }
  }, []);

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  return (
    <SettingContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingContext };
export { ContextProvider };
