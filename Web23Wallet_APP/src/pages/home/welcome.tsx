import React, { useEffect, useContext } from "react";
import { goTo } from "react-chrome-extension-router";

import SplashPage from "./splash";
import LoginPage from "./login";
import { WalletPassword } from "../wallet";

import { PageContainer, PageContent } from "src/layout";

import { Web23Logo } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

const WelcomePage: React.FC = () => {
  const { settings, saveSettings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  useEffect(() => {
    setTimeout(() => {
      try {
        if (
          settings.userData.length > 1 &&
          settings.userData[settings.userData.length - 1].accountId === ""
        ) {
          const newUserData = settings.userData.slice(0, -1);
          saveSettings({ ...settings, userData: newUserData });
        }
        if (settings.userKeyInfo !== "" && currentUser.accountId !== "")
          goTo(LoginPage);
        else {
          if (currentUser.accountId && !settings.userKeyInfo)
            goTo(WalletPassword);
          if (currentUser.accountId === "" && settings.userKeyInfo === "") {
            goTo(SplashPage);
          }
        }
      } catch (e) {}
    }, 1500);
  }, [settings]);

  return (
    <PageContainer>
      <PageContent className="items-center">
        <Web23Logo />
      </PageContent>
    </PageContainer>
  );
};

export default WelcomePage;
