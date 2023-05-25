import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import SettingPage from "./setting";
import ConnectionDetailPage from "./connection-detail";

import { PageContainer, PageContent, PageTitle, PageAction } from "src/layout";

import { Web23Button, Web23Popup, Web23Avatar } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as WalletConnectSVG } from "src/assets/icons/WalletConnect.svg";
import { ReactComponent as SiteAvatarSVG } from "src/assets/icons/connect_avatar.svg";
import { ReactComponent as WalletSVG } from "src/assets/icons/Wallet.svg";
import { ReactComponent as VerifiedSVG } from "src/assets/icons/verified.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";
import logo from "src/assets/icons/logo_md.png";

const ConnectSitePage: React.FC = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false);
  const [showSwitchWallet, setShowSwitchWallet] = useState<boolean>(false);
  const [showConnecting, setShowConnecting] = useState<boolean>(false);
  const [successConnect, setSuccessConnect] = useState<boolean>(false);
  const [connectedSites, setConnectedSites] = useState<boolean>(false);
  const { settings, saveSettings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        <PageTitle onClick={() => goTo(SettingPage)} />
        <PageContent>
          <h3 className="mb-3 text-2xl font-bold text-center text-white">
            {t("Connected Sites")}
          </h3>
          <span className="block px-10 mb-6 text-base font-medium text-center text-grey-200">
            {t("Connect your wallet to dApps to get started")}
          </span>
          <div className="bg-grey-900 rounded-xl">
            {connectedSites ? (
              <>
                <span className="font-bold text-sm text-grey-200 block pt-[18px] pl-3 pb-[2px]">
                  {"1" + t("Connected Site")}
                </span>
                <div
                  className="flex items-center justify-between px-3 py-[10px] rounded-b-xl active:bg-grey-800"
                  onClick={() => goTo(ConnectionDetailPage)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 font-bold bg-white rounded-full">
                      SR
                    </div>
                    <div className="py-1">
                      <span className="block font-bold text-base text-grey-50 mb-[2px]">
                        Superrare
                      </span>
                      <span className="block text-xs font-bold text-grey-400">
                        superrare.com
                      </span>
                    </div>
                  </div>
                  <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center pt-6 pb-2">
                  <WalletConnectSVG />
                </div>
                <span className="block mb-1 text-base font-bold text-center text-white">
                  {t("No sites connected")}
                </span>
                <span className="block pb-6 text-sm font-bold text-center text-grey-400">
                  {t("Wallet 1 isn’t connected to any sites")}
                </span>
              </>
            )}
          </div>
        </PageContent>
        <PageAction>
          <Web23Button
            text={t("Manually Connect") || "Manually Connect"}
            onClick={() => setShowConnect(true)}
          />
        </PageAction>
      </PageContainer>
      <Web23Popup
        title={t("Connect with Web23") || "Connect with Web23"}
        show={showConnect}
        setShow={setShowConnect}
      >
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-center mb-3">
            <SiteAvatarSVG />
          </div>
          <span className="block mb-2 text-xl font-bold text-center text-white">
            https://superrare.com
          </span>
          <span className="block mb-4 text-xs font-bold text-center text-grey-400">
            {t("wants to connect with your wallet")}
          </span>
          <div className="p-4 mb-4 border border-grey-800 rounded-xl">
            <span className="block mb-1 text-sm font-bold text-grey-200">
              {"Superrare " + t("will be able to")}
            </span>
            <div className="flex items-center gap-3 px-2 py-1">
              <WalletSVG className="text-grey-400 fill-grey-400" />
              <p className="text-xs font-bold text-grey-50">
                {t("Access your wallet address, activity and balance")}
              </p>
            </div>
            <div className="flex items-center gap-3 px-2 py-1">
              <VerifiedSVG />
              <p className="text-xs font-bold text-grey-50">
                {t("Request approval for transactions")}
              </p>
            </div>
          </div>
          <div className="bg-grey-900 rounded-xl pt-[18px] mb-4">
            <span className="block px-3 pb-3 text-sm font-bold text-grey-200 ">
              {t("Connecting to this wallet")}
            </span>
            <div
              className="px-3 pb-[12px] rounded-b-xl flex justify-between items-center active:bg-grey-800"
              onClick={() => setShowSwitchWallet(true)}
            >
              <div className="flex items-center gap-3">
                <Web23Avatar
                  type={currentUser.type}
                  color={currentUser.themeColor}
                  name={currentUser.userName}
                />
                <div className="py-1">
                  <span className="block font-bold text-base text-grey-50 mb-[2px]">
                    {currentUser.userName}
                  </span>
                  <span className="block text-xs font-bold text-grey-400">
                    {currentUser.accountId}
                  </span>
                </div>
              </div>
              <ArrowDownSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
          <Web23Button
            text={t("Connect") || "Connect"}
            onClick={() => {
              setSuccessConnect(false);
              setShowConnect(false);
              setShowConnecting(true);
              setTimeout(() => {
                setSuccessConnect(true);
                setConnectedSites(true);
              }, 3000);
            }}
          />
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Switch Wallet") || "Switch Wallet"}
        show={showSwitchWallet}
        setShow={setShowSwitchWallet}
      >
        <p className="py-4 text-sm font-bold text-grey-200">
          {t("Choose the wallet to connect with Superrare")}
        </p>
        <div className="mb-8 bg-grey-900 rounded-xl">
          <span className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200 block">
            {t("My wallets")}
          </span>
          {settings.userData.map((item, index) => (
            <div
              key={`${item.accountId}_${index}`}
              className={`pl-3 pr-6 py-[10px] active:bg-grey-800 border-b border-grey-800 flex justify-between items-center ${
                index === settings.userData.length - 1 &&
                "border-b-0 rounded-b-xl"
              }`}
              onClick={() => {
                saveSettings({ ...settings, selectedUser: item.accountId });
                setTimeout(() => {
                  setShowSwitchWallet(false);
                }, 300);
              }}
            >
              <div className="flex items-center gap-3">
                <Web23Avatar
                  name={item.userName}
                  type={item.type}
                  color={item.themeColor}
                />
                <div className="py-1">
                  <span className="font-bold text-grey-50 text-base block mb-[2px]">
                    {item.userName}
                  </span>
                  <span className="block text-xs font-bold text-grey-400">
                    {item.accountId}
                  </span>
                </div>
              </div>
              {item.accountId === settings.selectedUser && (
                <CircleCheckSVG className="fill-lime-500" />
              )}
            </div>
          ))}
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Connect with Web23") || "Connect with Web23"}
        show={showConnecting}
        setShow={setShowConnecting}
      >
        <div className="flex items-center justify-center">
          {!successConnect ? (
            <>
              <SiteAvatarSVG />
              <div className="w-[90px]">
                <div className="h-[1px] border-t-2 border-dashed animate-connecting" />
              </div>
              <div>
                <img src={logo} alt="logo" />
              </div>
            </>
          ) : (
            <CompleteSVG />
          )}
        </div>
        <p
          className={`mt-3 mb-8 font-medium text-base text-center text-grey-200 ${
            !successConnect && 'after:content-["."] after:animate-dots'
          }`}
        >
          {!successConnect ? t("Connecting") : t("Connection successful")}
        </p>
      </Web23Popup>
    </>
  );
};

export default ConnectSitePage;
