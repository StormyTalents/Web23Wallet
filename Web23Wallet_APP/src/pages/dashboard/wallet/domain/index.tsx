import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardDomain from "src/pages/dashboard/domain";
import DomainDetails from "src/pages/dashboard/domain/detail";
import CreateWallet from "../../../wallet/wallet-create";

import { Web23Avatar, Web23Button } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as HbarSVG } from "src/assets/icons/hbar.svg";
import { ReactComponent as BoltSVG } from "src/assets/icons/bolt.svg";
import { ReactComponent as DomainSVG } from "src/assets/icons/Domains.svg";
import { ReactComponent as SmileySVG } from "src/assets/icons/SmileyBlank.svg";
import { ReactComponent as GoDaddySVG } from "src/assets/icons/GoDaddy.svg";
import { ReactComponent as Web23SVG } from "src/assets/icons/Web23.svg";
import { ReactComponent as DomainLogoSVG } from "src/assets/icons/domain_logos.svg";
import { ReactComponent as ArrowForwardSVG } from "src/assets/icons/arrow_forward.svg";
import { ReactComponent as ContentCopySVG } from "src/assets/icons/content_copy_sm.svg";

const MODE_ALL = 0;
const MODE_WEB2 = 1;
const MODE_WEB3 = 2;

const DomainSection: React.FC<{
  extended: boolean;
  setLoading: (state: boolean) => void;
  setShowTokenMng: (state: boolean) => void;
  allDomain?: {
    web2?: { name: string; expired?: string }[];
    web3?: { name: string; expired?: string; url: string }[];
  };
  setAllDomain: (param: any) => void;
  balance: { hbar: string; amount: string };
}> = ({
  setLoading,
  setShowTokenMng,
  allDomain,
  setAllDomain,
  extended = false,
  balance,
}) => {
  const [mode, setMode] = useState<number>(MODE_ALL);
  const { settings, saveSettings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const { t } = useTranslation();

  useEffect(() => {
    if (allDomain?.web2?.length && !allDomain?.web3?.length) setMode(MODE_WEB2);
    if (allDomain?.web3?.length && !allDomain?.web2?.length) setMode(MODE_WEB3);
  }, [allDomain]);

  return (
    <div>
      {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) < 2 && (
        <div className="p-3 mb-4 bg-indigo-200 rounded-xl">
          <div className="flex gap-[7px] mb-6">
            <div>
              <p className="mb-1 text-xl font-bold text-block">
                {t("All your Domains here")}
              </p>
              <p className="text-sm font-medium text-grey-900">
                {t("Manage & Track all your domains through your Web23 wallet")}
              </p>
            </div>
            <DomainLogoSVG />
          </div>

          <button
            className="w-full py-[6px] bg-white border-2 border-grey-900 rounded-[32px] flex gap-1 justify-center items-center"
            onClick={() => goTo(CreateWallet)}
          >
            <p className="text-sm font-bold text-grey-900">
              {t("Get Started")}
            </p>
            <ArrowForwardSVG />
          </button>
        </div>
      )}
      <div
        className={`bg-grey-900 w-full rounded-xl ${
          allDomain?.web2?.length || allDomain?.web3?.length
            ? "min-h-[250px] mb-1"
            : "min-h-[228px] mb-4"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-4">
          <span className="block text-sm font-bold text-grey-200">
            {t("My Domains")}
          </span>
          {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
            0 && (
            <div className="text-xs font-bold text-white">
              <span
                className={`px-3 py-1 rounded-[10px] cursor-pointer ${
                  mode === MODE_WEB2 && "bg-grey-800"
                } ${!allDomain?.web2?.length && "hidden"}`}
                onClick={() => setMode(MODE_WEB2)}
              >
                Web 2
              </span>
              <span
                className={`px-3 py-1 rounded-[10px] cursor-pointer ${
                  mode === MODE_ALL && "bg-grey-800"
                } ${
                  (!allDomain?.web2?.length || !allDomain?.web3?.length) &&
                  "hidden"
                }`}
                onClick={() => setMode(MODE_ALL)}
              >
                {t("All")}
              </span>
              <span
                className={`px-3 py-1 rounded-[10px] cursor-pointer ${
                  mode === MODE_WEB3 && "bg-grey-800"
                } ${!allDomain?.web3?.length && "hidden"}`}
                onClick={() => setMode(MODE_WEB3)}
              >
                Web 3
              </span>
            </div>
          )}
        </div>
        <div className="max-h-[270px] flex flex-col justify-start">
          <div>
            {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
              0 && (
              <div className="scene">
                <div
                  className={`cube ${
                    mode === MODE_ALL
                      ? "show-all"
                      : mode === MODE_WEB2
                      ? "show-web2"
                      : "show-web3"
                  }`}
                >
                  <div className="cube__face cube__face--web2">
                    <div className="max-h-[210px] overflow-y-auto">
                      {allDomain?.web2?.map((domain, index) => (
                        <div key={index}>
                          {new Date().valueOf() <
                            new Date(domain?.expired || 1).valueOf() && (
                            <div
                              className="bg-grey-900 border-b border-grey-800 active:bg-grey-800"
                              onClick={() => {
                                goTo(DomainDetails, {
                                  name: domain.name,
                                  expired: domain?.expired,
                                  back: "wallet",
                                });
                              }}
                            >
                              <div className="px-3 py-[10px] flex justify-between items-center">
                                <div className="py-[5px] flex gap-3">
                                  <div className="relative">
                                    <div className="absolute z-[1]">
                                      <GoDaddySVG />
                                    </div>
                                    <div className="absolute z-0 w-10 h-10 top-0 left-[30px]">
                                      <Web23SVG />
                                    </div>
                                  </div>
                                  <div className="pl-[65px] font-bold">
                                    <span className="block text-base text-grey-50 mb-[2px] w-[120px] overflow-x-auto truncate">
                                      {domain.name}
                                    </span>
                                    <span
                                      className={`block text-xs text-grey-400 ${
                                        new Date(
                                          domain?.expired || 1
                                        ).valueOf() -
                                          new Date().valueOf() <=
                                          604800000 && "text-red-500"
                                      }`}
                                    >
                                      {new Date(
                                        domain?.expired || 1
                                      ).valueOf() -
                                        new Date().valueOf() >
                                      604800000
                                        ? t("Valid until") +
                                          " " +
                                          new Date(
                                            domain?.expired || 1
                                          ).toLocaleDateString()
                                        : t("Expiring in") +
                                          " " +
                                          Math.floor(
                                            (new Date(
                                              domain?.expired || 1
                                            ).valueOf() -
                                              new Date().valueOf()) /
                                              3600000 /
                                              24
                                          ).toString() +
                                          " " +
                                          t("days")}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <ArrowDownSVG className="-rotate-90 fill-grey-50" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cube__face cube__face--web3">
                    <div className="max-h-[210px] overflow-y-auto ">
                      {allDomain?.web3?.map((domain, index) => (
                        <div
                          key={index}
                          className="bg-grey-900 border-b border-grey-800 active:bg-grey-800"
                          onClick={() =>
                            goTo(DomainDetails, {
                              name: domain.name,
                              expired: domain?.expired,
                              img: domain.url,
                              back: "wallet",
                            })
                          }
                        >
                          <div className="px-3 py-[10px] flex justify-between items-center">
                            <div className="py-[5px] flex gap-3">
                              <div className="relative">
                                <div className="absolute z-[1] w-10 h-10">
                                  <img
                                    src={domain.url}
                                    width="40px"
                                    height="40px"
                                    className="rounded-full"
                                    alt="web3 domain"
                                  />
                                </div>
                                <div className="absolute z-[0] top-0 left-[30px]">
                                  <Web23SVG />
                                </div>
                              </div>
                              <div className="pl-[65px] font-bold pt-1 pb-2">
                                <span className="block text-base text-grey-50 mb-[2px] w-[120px]">
                                  {domain.name}
                                </span>
                                <span className="block text-xs text-grey-400">
                                  {domain?.expired}
                                </span>
                              </div>
                            </div>
                            <div>
                              <ArrowDownSVG className="-rotate-90 fill-grey-50" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
          0 ? (
            <div
              className="px-3 py-4 text-lime-500 rounded-b-xl bg-grey-900 active:bg-grey-800"
              onClick={() => goTo(DashboardDomain)}
            >
              <span className="text-base font-bold">{t("Manage Domains")}</span>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <div className="flex justify-center mb-2 mt-[10px]">
                <SmileySVG />
              </div>
              <span className="block mb-1 text-base font-bold text-center text-white">
                {t("Nothing to see here")}
              </span>
              <span className="block mb-3 text-sm font-bold text-center px-14 text-grey-400">
                {t("Add / Transfer / Get your new Domain today")}
              </span>
              <div className="px-3 mb-[10px]">
                <Web23Button
                  text={t("Get your Domain") || "Get your Domain"}
                  size="sm"
                  icon={<ArrowForwardSVG />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) > 0 && (
        <div className="flex justify-center gap-2 py-3 mb-4">
          <div
            className={`w-[6px] h-[6px] rounded-full cursor-pointer ${
              mode === MODE_WEB2 ? "bg-white" : "bg-grey-400"
            } ${!allDomain?.web2?.length && "hidden"}`}
            onClick={() => setMode(MODE_WEB2)}
          />
          <div
            className={`w-[6px] h-[6px] rounded-full cursor-pointer ${
              mode === MODE_ALL ? "bg-white" : "bg-grey-400"
            } ${
              (!allDomain?.web3?.length || !allDomain?.web2?.length) && "hidden"
            }`}
            onClick={() => setMode(MODE_ALL)}
          />
          <div
            className={`w-[6px] h-[6px] rounded-full cursor-pointer ${
              mode === MODE_WEB3 ? "bg-white" : "bg-grey-400"
            } ${!allDomain?.web3?.length && "hidden"}`}
            onClick={() => setMode(MODE_WEB3)}
          />
        </div>
      )}

      {!extended && (
        <div className="rounded-xl bg-[#8583EC] pt-4 pb-[10px] pl-4 pr-2 mb-4">
          <p className="mb-2 text-sm font-bold text-grey-900">
            {t("Your Hedera ID")}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Web23Avatar
                name={currentUser.userName}
                color={currentUser.themeColor}
                type={currentUser.type}
                size="sm"
              />
              <p className="text-xl font-bold text-black">
                {currentUser.accountId}
              </p>
            </div>
            <div
              className="w-8 h-8 bg-[#B9B8F4] flex items-center justify-center rounded-full active:bg-[#a4a2ea]"
              onClick={() =>
                navigator.clipboard.writeText(currentUser.accountId)
              }
            >
              <div>
                <ContentCopySVG />
              </div>
            </div>
          </div>
        </div>
      )}

      {!extended && allDomain?.web2?.length && allDomain?.web3?.length && (
        <div className="mb-4">
          <div className="flex gap-[2px] p-1 bg-yellow-500 rounded-t-[4px] w-[250px]">
            <BoltSVG />
            <span className="block text-xs font-bold text-black">
              {t("200+ extensions available")}
            </span>
          </div>
          <div className="flex items-center justify-between px-3 py-4 rounded-tl-none active:bg-lime-300 bg-lime-500 rounded-xl">
            <div className="flex items-center gap-3">
              <DomainSVG className="text-black stroke-current fill-transparent" />
              <span className="text-base font-bold">{t("Get a Domain")}</span>
            </div>
            <div>
              <ArrowDownSVG className="-rotate-90 fill-black" />
            </div>
          </div>
        </div>
      )}

      {!extended && (
        <div className="mb-[22px] bg-grey-900 rounded-xl">
          <div className="px-3 pt-[18px] font-bold text-sm text-grey-200">
            <span>{t("Available Tokens")}</span>
          </div>
          <div>
            <div className="border-b border-grey-800 active:bg-grey-800">
              <div className="px-3 py-[10px] flex justify-between items-center">
                <div className="py-[5px] flex gap-3">
                  <HbarSVG />
                  <div className="font-bold">
                    <span className="block text-base text-grey-50 mb-[2px] uppercase">
                      hbar
                    </span>
                    <span className="block text-xs text-grey-400">
                      ℏ{parseFloat(balance.hbar).toFixed(4)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col py-1 text-right text-bold">
                    <p className="text-sm text-grey-50 mb-[6px]">
                      {currentUser.currency.symbol}{" "}
                      {parseFloat(balance.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-green-500">+1.09%</p>
                  </div>
                  <div>
                    <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="px-3 py-4 text-lime-500 rounded-b-xl active:bg-grey-800"
              onClick={() => setShowTokenMng(true)}
            >
              <span className="text-base font-bold">{t("Manage Tokens")}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainSection;
