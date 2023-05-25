import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import DomainDetails from "./detail";
import CreateWallet from "../../wallet/wallet-create";

import { PageContainer, PageContent, PageAction } from "src/layout";

import {
  DashboardActionBar,
  Web23DomainTicker,
  Web23Input,
  Web23Popup,
  Web23Button,
  Web23Toggle,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";

import { ReactComponent as FavoriteSVG } from "src/assets/icons/favorite.svg";
import { ReactComponent as ShoppingSVG } from "src/assets/icons/shopping_cart.svg";
import { ReactComponent as SearchSVG } from "src/assets/icons/search.svg";
import { ReactComponent as SecuritySVG } from "src/assets/icons/security.svg";
import { ReactComponent as ManageSearchSVG } from "src/assets/icons/search_domain.svg";
import { ReactComponent as MoneySVG } from "src/assets/icons/attach_money.svg";
import { ReactComponent as TransitSVG } from "src/assets/icons/transit_enterexit.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as GoDaddySVG } from "src/assets/icons/GoDaddy.svg";
import { ReactComponent as Web23SVG } from "src/assets/icons/Web23.svg";
import { ReactComponent as SmileySVG } from "src/assets/icons/SmileyBlank.svg";
import { ReactComponent as ArrowForwardSVG } from "src/assets/icons/arrow_forward.svg";

const MODE_ALL = 0;
const MODE_WEB2 = 1;
const MODE_WEB3 = 2;

const DashboardDomain: React.FC = () => {
  const { t } = useTranslation();
  const [searchDomain, setSearchDomain] = useState<string>("");
  const { settings } = useContext(SettingContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<{
    keyword: string;
    web2: any;
    web3: any;
  }>();
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser
  );
  const [mode, setMode] = useState<number>(MODE_ALL);
  const [allDomain, setAllDomain] = useState<{
    web2?: { name: string; expired?: string }[];
    web3?: { name: string; expired?: string; url: string }[];
  }>();

  const getAllDomain = async () => {
    try {
      setLoading(true);
      const { web3Domain } = await apiHandler("get_tld", currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: "0.0.1680808",
      });
      const web3 = await Promise.all(web3Domain.map((url: any) => axios(url)));

      let domain = null;
      if (settings.godaddyInfo.gkey && settings.godaddyInfo.gsecret) {
        domain = await apiHandler("get_domain", currentUser.token, {
          sso: `sso-key ${settings.godaddyInfo.gkey}:${settings.godaddyInfo.gsecret}`,
        });
      }

      setAllDomain({
        web2: domain?.domain.map(
          (item: { domain: string; expires: string }) => ({
            name: item.domain,
            expired: item.expires,
          })
        ),
        web3: web3.map((item) => ({
          name: item.data.name,
          url: "https://ipfs.io/ipfs/" + item.data.image.slice(7),
        })),
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDomain();
  }, []);

  useEffect(() => {
    if (allDomain?.web2?.length && !allDomain?.web3?.length) setMode(MODE_WEB2);
    if (allDomain?.web3?.length && !allDomain?.web2?.length) setMode(MODE_WEB3);
  }, [allDomain]);

  const handleSearch = async () => {
    let domain: any = "";

    try {
      if (searchDomain !== "") {
        setLoading(true);
        domain = await apiHandler("search_domain", currentUser.token, {
          keyword: searchDomain,
          sso: `sso-key ${settings.godaddyInfo.gkey}:${settings.godaddyInfo.gsecret}`,
        });

        if (domain.web2?.domain) {
          setSearchResult({
            web2: domain?.web2,
            keyword: searchDomain,
            web3: "",
          });
        }

        if (
          domain.web3?.resData.filter((item: any) => item.price !== "NaN")
            .length > 0
        ) {
          setSearchResult({
            web2: "",
            web3: domain.web3,
            keyword: searchDomain,
          });
        }
        setLoading(false);
        if (
          domain.web2?.domain ||
          domain.web3?.resData.filter((item: any) => item.price !== "NaN")
            .length > 0
        )
          setShowSearchResult(true);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <PageContainer loading={loading}>
        <PageContent className="h-auto px-0">
          <div className="flex px-6 py-[18px] items-center justify-between bg-black">
            <p className="text-xl font-bold text-white">{t("Domains")}</p>
            <div className="flex items-center gap-4">
              <FavoriteSVG />
              <ShoppingSVG />
            </div>
          </div>
          <div className="pt-6 pb-4 bg-[#ADD6FF]">
            <Web23DomainTicker />
            <h3 className="px-6 mb-2 text-2xl font-bold text-black">
              {t("Find your place online")}
            </h3>
            <p className="px-6 mb-6 text-sm font-bold text-grey-900">
              {t(
                "Get started with your idea from more than 200 domain endings"
              )}
            </p>
            <div className="relative px-6 mb-8">
              <Web23Input
                placeholder={t("Search for your domain")}
                variant="secondary"
                value={searchDomain}
                onChange={(e) => setSearchDomain(e.target.value)}
              />
              <button
                className="absolute p-3 border rounded-full top-2 right-8 bg-lime-500 border-grey-900 active:bg-green-500"
                onClick={handleSearch}
              >
                <SearchSVG className="fill-black" />
              </button>
            </div>
            <div className="flex gap-4 px-6 mb-4">
              <div className="w-[92px] flex flex-col items-center">
                <ManageSearchSVG />
                <p className="text-xs font-bold text-center text-grey-900">
                  {t("Transparent Pricing")}
                </p>
              </div>
              <div className="w-[92px] flex flex-col items-center">
                <SecuritySVG />
                <p className="text-xs font-bold text-center text-grey-900">
                  {t("Industry top security")}
                </p>
              </div>
              <div className="w-[92px] flex flex-col items-center">
                <MoneySVG />
                <p className="px-4 text-xs font-bold text-center text-grey-900">
                  {t("Starting at") + " $4"}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold text-center text-black pb-[1px] underline">
              {t("More reasons to buy a Domain on Web23")}
            </p>
          </div>
          <div className="px-6">
            <div className="flex items-center gap-3 px-3 py-4 mt-6 mb-4 bg-grey-900 rounded-xl">
              <div>
                <TransitSVG />
              </div>
              <p className="text-base font-bold text-grey-50">
                {t("Transfer a Domain you own")}
              </p>
            </div>
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
                {(allDomain?.web2?.length || 0) +
                  (allDomain?.web3?.length || 0) >
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
                        (!allDomain?.web2?.length ||
                          !allDomain?.web3?.length) &&
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
                  {(allDomain?.web2?.length || 0) +
                    (allDomain?.web3?.length || 0) >
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
                                              ? "Valid until " +
                                                new Date(
                                                  domain?.expired || 1
                                                ).toLocaleDateString()
                                              : "Expiring in " +
                                                Math.floor(
                                                  (new Date(
                                                    domain?.expired || 1
                                                  ).valueOf() -
                                                    new Date().valueOf()) /
                                                    3600000 /
                                                    24
                                                ).toString() +
                                                " days"}
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

                {(allDomain?.web2?.length || 0) +
                  (allDomain?.web3?.length || 0) >
                0 ? (
                  <div
                    className="px-3 py-4 text-lime-500 rounded-b-xl bg-grey-900 active:bg-grey-800"
                    onClick={() => goTo(DashboardDomain)}
                  >
                    <span className="text-base font-bold">
                      {t("Manage Domains")}
                    </span>
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
            {(allDomain?.web2?.length || 0) + (allDomain?.web3?.length || 0) >
              0 && (
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
                    (!allDomain?.web3?.length || !allDomain?.web2?.length) &&
                    "hidden"
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
            <div className="mb-5 bg-grey-900 rounded-xl">
              <p className="pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-200">
                {t("Connected Accounts")}
              </p>
              <div className="flex items-center justify-between px-3 active:bg-grey-800">
                <div className="flex items-center gap-2 py-[10px]">
                  <div>
                    <GoDaddySVG />
                  </div>
                  <div className="py-1">
                    <p className="text-base font-bold text-grey-50 mb-[2px]">
                      GoDaddy
                    </p>
                    <p className="text-xs font-bold truncate text-grey-400 max-w-[120px] overflow-hidden">
                      {settings.godaddyInfo.gkey} :{" "}
                      {settings.godaddyInfo.gsecret}
                    </p>
                  </div>
                </div>
                <div>
                  <ArrowDownSVG className="-rotate-90 fill-grey-50" />
                </div>
              </div>
              <hr className="border-grey-800" />
              <p
                className="px-3 py-4 text-base font-bold active:bg-grey-800 rounded-b-xl text-lime-500"
                onClick={() => goTo(CreateWallet)}
              >
                {t("Manage Accounts")}
              </p>
            </div>
          </div>
        </PageContent>
        <PageAction className="px-0 pb-0">
          <DashboardActionBar selected={1} />
        </PageAction>
      </PageContainer>
      <Web23Popup
        title={t("Domain Search Result") || "Domain Search Result"}
        show={showSearchResult}
        setShow={setShowSearchResult}
      >
        {searchResult?.web2?.domain && (
          <div className="mt-4 last:mb-8 mb-0 bg-grey-900 rounded-xl">
            <p className="pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-50">
              {"Web2 " + t("Domains")}
            </p>
            <div className="flex justify-between px-3 py-4 text-sm font-bold border-b border-b-grey-800 text-grey-50">
              <p>{t("Name")}</p>
              <p>{searchResult?.web2.domain}</p>
            </div>
            <div className="items-center flex justify-between px-3 py-4 text-sm font-bold last:border-none border-b border-b-grey-800 text-grey-50">
              <p>{t("Available")}</p>
              <div>
                {searchResult?.web2.available ? (
                  <Web23Toggle
                    checked={true}
                    setChecked={() => {}}
                    variant="primary"
                  />
                ) : (
                  <Web23Toggle
                    checked={false}
                    setChecked={() => {}}
                    variant="primary"
                  />
                )}
              </div>
            </div>
            {searchResult?.web2?.available && (
              <div className="flex justify-between px-3 py-4 text-sm font-bold border-b last:border-none border-b-grey-800 text-grey-50">
                <p>{t("Price")}</p>
                <p>
                  {searchResult?.web2.price / 100000.0 +
                    " " +
                    searchResult?.web2.currency}
                </p>
              </div>
            )}
          </div>
        )}
        {searchResult?.web3?.resData?.length && (
          <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
            <p className="pt-[18px] pb-[2px] px-3 font-bold text-sm text-grey-50">
              {"Web3 " + t("Domains")}
            </p>
            <div className="max-h-[180px] overflow-auto">
              {searchResult?.web3?.resData.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="py-4 last:border-none border-b border-b-grey-800"
                >
                  <div className="flex justify-between px-3 text-xs font-medium text-grey-50">
                    <p>{t("Name")}</p>
                    <p>{item.name}</p>
                  </div>
                  <div className="flex justify-between px-3 text-xs font-medium border-b last:border-none border-b-grey-800 text-grey-50">
                    <p>{t("Price")}</p>
                    <p>{item.price + " ℏ"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Web23Popup>
    </>
  );
};

export default DashboardDomain;
