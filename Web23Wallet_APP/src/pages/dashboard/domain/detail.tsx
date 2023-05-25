import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardDomain from ".";
import DashboardWallet from "../wallet";

import { PageContainer, PageAction, PageContent } from "src/layout";

import {
  DashboardActionBar,
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23Toggle,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";

import { ReactComponent as ArrowBackSVG } from "src/assets/icons/arrow_back.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as RenewSVG } from "src/assets/icons/Send.svg";
import { ReactComponent as TransferSVG } from "src/assets/icons/Purchase.svg";
import { ReactComponent as ShareSVG } from "src/assets/icons/QR.svg";
import { ReactComponent as HeartSVG } from "src/assets/icons/monitor_heart.svg";
import { ReactComponent as ImageSVG } from "src/assets/icons/image.svg";
import { ReactComponent as GoDaddySVG } from "src/assets/icons/GoDaddy.svg";
import { ReactComponent as GoDaddyLGSVG } from "src/assets/icons/GoDaddyLG.svg";

const tabHeaders = [
  {
    icon: <RenewSVG className="stroke-current fill-transparent" />,
    title: "Renew",
  },
  {
    icon: <TransferSVG className="stroke-current fill-transparent" />,
    title: "Transfer",
  },
  {
    icon: <ShareSVG className="stroke-current fill-transparent" />,
    title: "Share",
  },
];

const RENEW = 0;
const TRANSFER = 1;
const SHARE = 2;

const DomainDetails: React.FC<{
  name: string;
  expired: string;
  img: string;
  back?: "wallet" | "domain";
}> = ({ name, expired, img, back = "wallet" }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState(RENEW);
  const [renewChecked, setRenewChecked] = useState(false);
  const [lockChecked, setLockChecked] = useState(false);
  const [domainChecked, setDomainChecked] = useState(false);
  const { settings } = useContext(SettingContext);
  const [showWhoIs, setShowWhoIs] = useState<boolean>(false);
  const [contact, setContact] = useState<string>("");
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser
  );
  const [info, setInfo] = useState<any>();

  const asyncOperation = async () => {
    try {
      setLoading(true);
      const domainInfo = await apiHandler("domain_info", currentUser.token, {
        sso: `sso-key ${settings.godaddyInfo.gkey}:${settings.godaddyInfo.gsecret}`,
        domain: name,
      });
      if (domainInfo?.info) {
        setInfo(domainInfo?.info);
        setRenewChecked(domainInfo?.info.renewable);
        setLockChecked(domainInfo?.info.locked);
        setDomainChecked(domainInfo?.info.transferProtected);
        setContact(domainInfo?.info?.contactAdmin.email);
      }
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    asyncOperation();
  }, []);

  // const asyncUpdate = async () => {
  //   try {
  //     const domainInfo = await apiHandler(
  //       "update_domain_info",
  //       currentUser.token,
  //       {
  //         domain: name,
  //         sso: `sso-key ${settings.godaddyInfo.gkey}:${settings.godaddyInfo.gsecret}`,
  //         renewChecked,
  //         lockChecked,
  //         domainChecked,
  //       }
  //     );
  //     console.log(domainInfo);
  //   } catch (e) {}
  // };

  // useEffect(() => {
  //   asyncUpdate();
  // }, [renewChecked, lockChecked, domainChecked]);

  return (
    <>
      <PageContainer loading={loading}>
        <PageContent className="h-auto px-0">
          <div className="bg-[linear-gradient(180deg,_#212121_0%,_rgba(33,_33,_33,_0)_100%)]">
            <div className="px-4 py-6">
              <ArrowBackSVG
                className="fill-grey-200"
                onClick={() =>
                  back === "wallet"
                    ? goTo(DashboardWallet)
                    : goTo(DashboardDomain)
                }
              />
            </div>
            <div className="flex justify-center mb-3">
              {img ? (
                <img
                  src={img}
                  width="72px"
                  height="72px"
                  className="rounded-full"
                  alt="web3 domain"
                />
              ) : (
                <GoDaddyLGSVG />
              )}
            </div>
            <p className="mb-2 text-2xl font-bold text-center text-white">
              {name}
            </p>
            <p className="px-10 mb-6 text-xs font-bold text-center text-grey-400">
              <span>
                {t("Auto Renews") + " "}{" "}
                {new Date(expired).toLocaleDateString()}
              </span>
              <span> • </span>
              <span>
                {t("Added via") + " "} {img ? "Web23" : "Godaddy"}{" "}
              </span>
            </p>
          </div>
          <div className="flex justify-center gap-3 px-3 mb-4">
            {tabHeaders.map((tabInf, index) => (
              <div
                key={`${tabInf.title}_${index}`}
                className="flex flex-col items-center px-3 pt-2"
              >
                <div
                  className={`active:bg-green-500 text-white bg-grey-900 rounded-full flex justify-center items-center w-[48px] h-[48px] mb-2 ${
                    tab === index && "bg-lime-500 text-black"
                  }`}
                  onClick={() => setTab(index)}
                >
                  {tabInf.icon}
                </div>
                <span className="block text-sm font-bold text-center cursor-default text-grey-200">
                  {tabInf.title}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6">
            <div className="mb-4 bg-grey-900 rounded-xl">
              <p className="pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-200">
                {t("Preferences")}
              </p>
              <div className="flex items-center justify-between px-3 py-4 text-base font-bold active:bg-grey-800 text-grey-50">
                <div className="flex items-center gap-3">
                  <HeartSVG />
                  <p>{t("Status")}</p>
                </div>
                <div className="flex items-center gap-2 uppercase">
                  <p>{info?.status}</p>
                  <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                </div>
              </div>
              <hr className="border-b border-grey-800" />
              <div className="flex items-center justify-between px-3 py-4 text-base font-bold active:bg-grey-800 text-grey-50 rounded-b-xl">
                <div className="flex items-center gap-3">
                  <ImageSVG />
                  <p>{t("Thumbnail")}</p>
                </div>
                <div className="flex items-center gap-2 uppercase">
                  <p>{t("Added")}</p>
                  <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                </div>
              </div>
            </div>
            <div className="mb-4 bg-grey-900 rounded-xl">
              <p className="pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-200">
                {t("Settings")}
              </p>
              <div className="flex items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800">
                <div className="py-1">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("Redirect Domain")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {t("Update where the domain redirects to")}
                  </p>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-b border-grey-800" />
              <div className="flex items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800">
                <div className="py-1">
                  <p className="text-base text-grey-50 mb-[2px]">DNS</p>
                  <p className="text-xs text-grey-400">
                    {t("Update DNS settings")}
                  </p>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-b border-grey-800" />
              <div
                className="flex items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800"
                onClick={() => setShowWhoIs(true)}
              >
                <div className="py-1">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("Whois")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {t("Update contact info")}
                  </p>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-b border-grey-800" />
              <div className="flex items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800">
                <div className="py-1">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("Auto Renews")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {t("Renew automatically when expiring")}
                  </p>
                </div>
                <Web23Toggle
                  checked={renewChecked}
                  setChecked={() => setRenewChecked(!renewChecked)}
                />
              </div>
              <hr className="border-b border-grey-800" />
              <div className="flex items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800">
                <div className="py-1">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("Transfer Lock")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {t("Lock domain from being transferred")}
                  </p>
                </div>
                <Web23Toggle
                  checked={lockChecked}
                  setChecked={() => setLockChecked(!lockChecked)}
                />
              </div>
              <hr className="border-b border-grey-800" />
              <div className="flex items-center justify-between px-3 py-[10px] font-bold active:bg-grey-800 rounded-b-xl">
                <div className="py-1">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("Domain Privacy")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {t("Protect your contact information")}
                  </p>
                </div>
                <Web23Toggle
                  checked={domainChecked}
                  setChecked={() => setDomainChecked(!domainChecked)}
                />
              </div>
            </div>
            <div className="bg-grey-900 rounded-xl">
              <p className="font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]">
                {t("Shared with")}
              </p>
              <div className="flex items-center justify-between px-3 py-[10px] active:bg-grey-800">
                <div className="flex items-center gap-2">
                  <Web23Avatar
                    color="blue"
                    type="icon"
                    name="Wayne"
                    walletColor="white"
                  />
                  <div className="py-1 font-bold">
                    <p className="text-base text-grey-50">Wayne x Rooney</p>
                    <p className="text-sm text-grey-400">hedera...m23p9</p>
                  </div>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-grey-800" />
              <div className="flex items-center justify-between px-3 py-[10px] active:bg-grey-800">
                <div className="flex items-center gap-2">
                  <Web23Avatar
                    color="indigo"
                    type="icon"
                    name="Wayne"
                    walletColor="white"
                  />
                  <div className="py-1 font-bold">
                    <p className="text-base text-grey-50">Mini x Momosa</p>
                    <p className="text-sm text-grey-400">hedera...po2b9a</p>
                  </div>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
              <hr className="border-grey-800" />
              <p className="px-3 py-4 mb-4 font-bold text-lime-500 active:bg-grey-800 rounded-b-xl">
                {t("Manage Permissions")}
              </p>
            </div>
            <div className="mb-8 bg-grey-900 rounded-xl">
              <p className="px-3 pt-4 text-sm font-bold text-grey-200">
                {t("Connected Account")}
              </p>
              <div className="flex items-center justify-between px-3 py-[10px] active:bg-grey-800 rounded-b-xl">
                <div className="flex items-center gap-2">
                  <GoDaddySVG />
                  <div className="py-1 font-bold">
                    <p className="text-base text-grey-50">GoDaddy</p>
                    <p className="text-sm text-grey-400">User ID: 32120921</p>
                  </div>
                </div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
          </div>
        </PageContent>
        <PageAction className="px-0 pb-0">
          <DashboardActionBar selected={1} />
        </PageAction>
      </PageContainer>
      <Web23Popup
        title={t("WhoIs") || "WhoIs"}
        show={showWhoIs}
        setShow={setShowWhoIs}
      >
        <div className="py-4">
          <Web23Input
            placeholder={t("Update Contact Info") || "Update Contact Info"}
            value={contact}
            onChange={(e: any) => setContact(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <Web23Button
            text={t("Update") || "Update"}
            size="sm"
            onClick={() => setShowWhoIs(false)}
          />
        </div>
      </Web23Popup>
    </>
  );
};

export default DomainDetails;
