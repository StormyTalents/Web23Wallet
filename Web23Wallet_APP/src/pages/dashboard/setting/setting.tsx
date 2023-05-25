import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardWallet from "../wallet";

import LoginPage from "src/pages/home/login";
import SecretPhrasePage from "./secret-phrase";
import TermPrivacyPage from "./terms-privacy";
import ContactSupportPage from "./contact-support";
import ConnectSitePage from "./connect-site";
import PrivateKeyPage from "./privatekey";
import ManageContactPage from "./manage-contacts";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Popup, Web23SearchBox, Web23ComingSoon } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as LaunchSVG } from "src/assets/icons/launch.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as TranslateSVG } from "src/assets/icons/translate.svg";
import { ReactComponent as EuroSVG } from "src/assets/icons/euro.svg";
import { ReactComponent as PublicSVG } from "src/assets/icons/public.svg";
import { ReactComponent as DarkSVG } from "src/assets/icons/dark_mode.svg";
import { ReactComponent as KeySVG } from "src/assets/icons/golden_key.svg";
import { ReactComponent as LockSVG } from "src/assets/icons/lock.svg";
import { ReactComponent as GPPSVG } from "src/assets/icons/gpp_good.svg";
import { ReactComponent as SupportSVG } from "src/assets/icons/support.svg";
import { ReactComponent as USDSVG } from "src/assets/icons/setting_attach_money.svg";
import { ReactComponent as CheckCircleSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as PoundSVG } from "src/assets/icons/currency_pound.svg";
import { ReactComponent as RupeeSVG } from "src/assets/icons/currency_rupee.svg";
import { ReactComponent as AusUSDSVG } from "src/assets/icons/attach_money_aus.svg";
import { ReactComponent as CANDSVG } from "src/assets/icons/attach_money_can.svg";
import { ReactComponent as ChinaYuanSVG } from "src/assets/icons/currency_yuan.svg";
import { ReactComponent as SecurityUpdateSVG } from "src/assets/icons/system_security_update_good.svg";
import { ReactComponent as LightModeSVG } from "src/assets/icons/light_mode.svg";
import { ReactComponent as DarkModeSVG } from "src/assets/icons/dark_mode_grey.svg";
import { ReactComponent as LinkSVG } from "src/assets/icons/link.svg";
import { ReactComponent as NoteAddSVG } from "src/assets/icons/note_add.svg";
import { ReactComponent as UpdateSMSVG } from "src/assets/icons/update_sm.svg";

const currency = [
  {
    icon: <USDSVG />,
    text: "United States Dollar",
    value: "USD",
    symbol: "$",
  },
  {
    icon: <EuroSVG />,
    text: "Euro",
    value: "EUR",
    symbol: "€",
  },
  {
    icon: <PoundSVG />,
    text: "British Pound",
    value: "GBP",
    symbol: "£",
  },
  {
    icon: <RupeeSVG />,
    text: "Indian Rupee",
    value: "INR",
    symbol: "₹",
  },
  {
    icon: <AusUSDSVG />,
    text: "Australia Dollar",
    value: "AUD",
    symbol: "$",
  },
  {
    icon: <CANDSVG />,
    text: "Canada Dollar",
    value: "CAD",
    symbol: "$",
  },
  {
    icon: <ChinaYuanSVG />,
    text: "Chinese Yuan",
    value: "CNY",
    symbol: "¥",
  },
  {
    icon: <PoundSVG />,
    text: "Turkish Lira",
    value: "TRY",
    symbol: "₺",
  },
];

const languageArray = [
  {
    title: "English",
    value: "en",
  },
  {
    title: "Español",
    value: "es",
  },
  {
    title: "Italiano",
    value: "italian",
  },
  {
    title: "Polski",
    value: "polish",
  },
  {
    title: "Deutsch",
    value: "de",
  },
  {
    title: "Français",
    value: "french",
  },
  {
    title: "हिंदी",
    value: "hindi",
  },
  {
    title: "عربي",
    value: "arabic",
  },
  {
    title: "Mandarin",
    value: "mandarin",
  },
  {
    title: "日本",
    value: "jp",
  },
];

const SettingPage: React.FC = () => {
  const { settings, saveSettings } = useContext(SettingContext);
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [showLanguage, setShowLanguage] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showTheme, setShowTheme] = useState<boolean>(false);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const { t, i18n } = useTranslation();

  return (
    <>
      <PageContainer>
        <PageTitle title="Settings" onClick={() => goTo(DashboardWallet)} />
        <PageContent className="h-auto !px-6">
          <div className="mb-6 bg-grey-900 rounded-xl">
            <span className="block px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold">
              {t("General")}
            </span>
            <div
              className="active:bg-grey-700"
              onClick={() => goTo(DashboardWallet, { extended: true })}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <span className="block text-base font-bold text-grey-50">
                  {t("Expand View")}
                </span>
                <LaunchSVG />
              </div>
              <hr className="border-grey-800" />
            </div>
            <div
              className="active:bg-grey-700 rounded-b-xl"
              onClick={() => goTo(ManageContactPage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <span className="block text-base font-bold text-grey-50">
                    {t("Manage Contacts")}
                  </span>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
          </div>

          <div className="mb-6 bg-grey-900 rounded-xl">
            <span className="block px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold">
              {t("Preferences")}
            </span>
            <div>
              <div
                className="active:bg-grey-700"
                onClick={() => setShowNetType(true)}
              >
                <div className="flex items-center justify-between px-3 py-4">
                  <div className="flex items-center gap-3">
                    <PublicSVG />
                    <span className="block text-base font-bold text-grey-50">
                      {t("Network")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="block text-sm font-bold text-grey-50">
                      {currentUser.net ? "Main net" : "Test net"}
                    </span>
                    <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                  </div>
                </div>
                <hr className="border-grey-800" />
              </div>
              <div
                className="active:bg-grey-700"
                onClick={() => setShowLanguage(true)}
              >
                <div className="flex items-center justify-between px-3 py-4">
                  <div className="flex items-center gap-3">
                    <TranslateSVG />
                    <span className="block text-base font-bold text-grey-50">
                      {t("Language")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="block text-sm font-bold text-grey-50">
                      {
                        languageArray.find(
                          (item) => item.value === settings.language
                        )?.title
                      }
                    </span>
                    <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                  </div>
                </div>
                <hr className="border-grey-800" />
              </div>
              <div
                className="active:bg-grey-700"
                onClick={() => setShowCurrency(true)}
              >
                <div className="flex items-center justify-between px-3 py-4">
                  <div className="flex items-center gap-3">
                    <EuroSVG />
                    <span className="block text-base font-bold text-grey-50">
                      {t("Currency")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="block text-sm font-bold text-grey-50">
                      {currentUser.currency.label}
                    </span>
                    <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                  </div>
                </div>
                <hr className="border-grey-800" />
              </div>
              <div
                className="active:bg-grey-700 rounded-b-xl"
                onClick={() => setShowTheme(true)}
              >
                <div className="flex items-center justify-between px-3 py-4">
                  <div className="flex items-center gap-3">
                    <DarkSVG />
                    <span className="block text-base font-bold text-grey-50">
                      {t("Theme")}
                    </span>
                  </div>
                  <Web23ComingSoon />
                  <div className="flex items-center gap-2">
                    <span className="block text-sm font-bold text-grey-50">
                      {t("Dark")}
                    </span>
                    <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 bg-grey-900 rounded-xl">
            <span className="block px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold">
              {t("Protection")}
            </span>
            <div
              className="active:bg-grey-700"
              onClick={() => goTo(PrivateKeyPage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <NoteAddSVG />
                  <span className="block text-base font-bold text-grey-50">
                    {t("Private Key")}
                  </span>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-grey-800" />
            </div>
            <div
              className="active:bg-grey-700"
              onClick={() => goTo(SecretPhrasePage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <KeySVG />
                  <span className="block text-base font-bold text-grey-50">
                    {t("Secret Phrase")}
                  </span>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-grey-800" />
            </div>
            <div
              className="active:bg-grey-700"
              onClick={() => goTo(ConnectSitePage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <LinkSVG className="fill-[#0A84FF]" />
                  <span className="block text-base font-bold text-grey-50">
                    {t("Connected Sites")}
                  </span>
                </div>
                <Web23ComingSoon />
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-grey-800" />
            </div>
            <div
              className="active:bg-grey-700 rounded-b-xl"
              onClick={() => goTo(LoginPage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <LockSVG />
                  <span className="block text-base font-bold text-grey-50">
                    {t("Lock Wallet")}
                  </span>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
          </div>
          <div className="mb-6 bg-grey-900 rounded-xl">
            <span className="block px-3 pt-[18px] pb-[2px] text-grey-200 text-sm font-bold">
              {t("About Web23")}
            </span>
            <div
              className="active:bg-grey-700"
              onClick={() => goTo(TermPrivacyPage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <GPPSVG />
                  <span className="block text-base font-bold text-grey-50">
                    {t("Terms and Privacy")}
                  </span>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-grey-800" />
            </div>
            <div
              className="active:bg-grey-700"
              onClick={() => goTo(ContactSupportPage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <SupportSVG />
                  <span className="block text-base font-bold text-grey-50">
                    {t("Contact Support")}
                  </span>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-grey-800" />
            </div>
            <div
              className="active:bg-grey-700 rounded-b-xl"
              onClick={() => goTo(ContactSupportPage)}
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <UpdateSMSVG className="fill-[#B558E4]" />
                  <span className="block text-base font-bold text-grey-50">
                    {t("App Version")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block text-sm font-bold text-grey-50">
                    v1.1.01
                  </span>
                  <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </PageContainer>
      <Web23Popup
        title={t("Currency") || "Currency"}
        show={showCurrency}
        setShow={setShowCurrency}
      >
        <Web23SearchBox
          placeholder={t("Search Currency")}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          {currency.map((item) => (
            <div
              key={item.value}
              className="flex justify-between py-4 pl-3 pr-6 border-b active:bg-grey-800 rounded-t-xl border-grey-800"
              onClick={() => {
                const newUser = settings.userData.map((user) => {
                  if (user.accountId === currentUser.accountId) {
                    user.currency.label = item.value;
                    user.currency.symbol = item.symbol;
                  }
                  return user;
                });
                saveSettings({ ...settings, userData: newUser });
                setShowCurrency(false);
              }}
            >
              <div className="flex gap-3">
                {item.icon}
                <span className="block text-base font-bold text-grey-50">
                  {item.text}
                </span>
              </div>
              {item.value === currentUser.currency.label && (
                <CheckCircleSVG className="fill-lime-500" />
              )}
            </div>
          ))}
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Language") || "Language"}
        show={showLanguage}
        setShow={setShowLanguage}
      >
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          {languageArray.map((item, index) => (
            <div
              key={item.value + index}
              className="flex justify-between py-4 pl-3 pr-6 last:border-b-0 border-b active:bg-grey-800 rounded-none first:rounded-t-xl last:rounded-b-xl border-grey-800"
              onClick={() => {
                saveSettings({ ...settings, language: item.value });
                i18n.changeLanguage(item.value);
                setTimeout(() => {
                  setShowLanguage(false);
                }, 300);
              }}
            >
              <span className="block text-base font-bold text-grey-50">
                {item.title}
              </span>
              {settings.language === item.value && (
                <CheckCircleSVG className="fill-lime-500" />
              )}
            </div>
          ))}
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Network") || "Network"}
        show={showNetType}
        setShow={setShowNetType}
      >
        <div className="mb-8 rounded-xl bg-grey-900">
          <div
            className="py-[10px] border-b border-b-grey-800 active:bg-grey-800 rounded-t-xl"
            onClick={() => {
              saveSettings({
                ...settings,
                userData: settings.userData?.map((item) => {
                  const res = item;
                  if (item.accountId === settings.selectedUser) {
                    res.net = true;
                  }
                  return res;
                }),
              });
              setTimeout(() => {
                setShowNetType(false);
              }, 300);
            }}
          >
            <div className="flex items-center justify-between px-3 pr-6">
              <div className="py-1 font-bold">
                <span className="block text-base text-grey-50 mb-[2px]">
                  Mainnet
                </span>
                <span className="block text-xs text-grey-400">
                  {t("All your real transactions here")}
                </span>
              </div>
              {settings?.userData?.filter(
                (item) => item.accountId === settings.selectedUser
              )[0].net && <CheckCircleSVG className="fill-lime-500" />}
            </div>
          </div>
          <div
            className="py-[10px] px-3 pr-6 flex justify-between items-center active:bg-grey-800 rounded-b-xl"
            onClick={() => {
              setTimeout(() => {
                saveSettings({
                  ...settings,
                  userData: settings.userData?.map((item) => {
                    const res = item;
                    if (item.accountId === settings.selectedUser) {
                      res.net = false;
                    }
                    return res;
                  }),
                });
                setShowNetType(false);
              }, 300);
            }}
          >
            <div className="py-1 font-bold">
              <span className="block text-base text-grey-50 mb-[2px]">
                Testnet
              </span>
              <span className="block text-xs text-grey-400">
                {t("Used for testing only")}
              </span>
            </div>
            {!settings?.userData?.filter(
              (item) => item.accountId === settings.selectedUser
            )[0].net && <CheckCircleSVG className="fill-lime-500" />}
          </div>
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Theme") || "Theme"}
        show={showTheme}
        setShow={setShowTheme}
      >
        <div className="mb-8 bg-grey-900 rounded-xl">
          <div className="flex gap-3 px-3 py-4 pr-6 border-b active:bg-grey-800 rounded-t-xl border-grey-800">
            <SecurityUpdateSVG />
            <span className="block text-base font-bold text-grey-50">
              {t("System")}
            </span>
          </div>
          <div className="flex justify-between px-3 py-4 pr-6 border-b active:bg-grey-800 border-grey-800">
            <div className="flex items-center gap-3">
              <LightModeSVG />
              <span className="block text-base font-bold text-grey-50">
                {t("Light")}
              </span>
            </div>
            <Web23ComingSoon />
          </div>
          <div className="flex justify-between px-3 py-4 pr-6 active:bg-grey-800 rounded-b-xl">
            <div className="flex items-center gap-3">
              <DarkModeSVG />
              <span className="block text-base font-bold text-grey-50">
                {t("Dark")}
              </span>
            </div>
            <CheckCircleSVG className="fill-lime-500" />
          </div>
        </div>
      </Web23Popup>
    </>
  );
};

export default SettingPage;
