import React, { useState, useEffect, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";

import SettingPage from "../setting/setting";
import DomainSectionDetail from "./domain/detail";

import { PageContainer, PageContent, PageAction } from "src/layout";

import SendHbarPage from "./send";
import DomainSection from "./domain";
import SwapTab from "./swap";

import {
  Web23Popup,
  Web23Avatar,
  Web23WalletCarousel,
  Web23Input,
  DashboardActionBar,
  Web23Toggle,
  Web23ChooseWallet,
  Web23Button,
} from "src/components";

import { SettingContext } from "src/utility/context";
import useToast from "src/utility/useToast";
import apiHandler from "src/utility/apiHandler";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as OnlineSVG } from "src/assets/icons/Online.svg";
import { ReactComponent as GearSVG } from "src/assets/icons/Gear.svg";
import { ReactComponent as SendSVG } from "src/assets/icons/Send.svg";
import { ReactComponent as PurchaseSVG } from "src/assets/icons/Purchase.svg";
import { ReactComponent as QRSVG } from "src/assets/icons/QR.svg";
import { ReactComponent as SwapSVG } from "src/assets/icons/Swap.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as ContentCopySVG } from "src/assets/icons/content_copy.svg";
import { ReactComponent as HbarSVG } from "src/assets/icons/hbar.svg";
import { ReactComponent as TransakLogoSVG } from "src/assets/icons/TransakLogo.svg";
import BanxaLogo from "src/assets/icons/BanxaLogo.png";
import MoonpayLogo from "src/assets/icons/MoonpayLogo.png";

const SEND = 0;
const PURCHASE = 1;
const RECEIVE = 2;
const SWAP = 3;

type Toggle = {
  name: string;
  address: string;
  checked: boolean;
  amount: string;
  image?: string;
};

type IKey = { key: string; _type: string };

type IPopularToken = {
  admin_key: IKey;
  auto_renew_account: string;
  auto_renew_period: string;
  created_timestamp: string;
  custom_fees: { fixed_fees: string[]; fractional_fees: string[] };
  decimals: string;
  deleted: boolean;
  freeze_key: IKey;
  initial_supply: string;
  max_supply: string;
  memo: string;
  name: string;
  pause_status: string;
  supply_key: IKey;
  supply_type: string;
  symbol: string;
  token_id: string;
  treasury_account_id: string;
  type: string;
  image?: string;
};

const DashboardWallet: React.FC<{ extended?: boolean }> = ({
  extended = false,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const { settings, saveSettings } = useContext(SettingContext);
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showTokenMng, setShowTokenMng] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);
  const [showReceive, setShowReceive] = useState<boolean>(false);
  const [showDeposit, setShowDeposit] = useState<boolean>(false);
  const { showToast } = useToast();
  const [tab, setTab] = useState(PURCHASE);
  const [hbarPrice, setHbarPrice] = useState<number>(0);
  const [searchKey, setSearchKey] = useState<string>("");
  const [toggles, setToggles] = useState<Toggle[]>();
  const [showAsset, setShowAsset] = useState<boolean>(false);
  const [balance, setBalance] = useState<{
    hbar: string;
    amount: string;
  }>({ hbar: "0.0", amount: "0.0" });
  const [allDomain, setAllDomain] = useState<{
    web2?: { name: string; expired?: string }[];
    web3?: { name: string; expired?: string; url: string }[];
  }>();
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser
  );
  const [popularTokens, setPopularTokens] = useState<IPopularToken[]>([]);
  const [associate, setAssociate] = useState<{
    name: string;
    address: string;
    checked: boolean;
  }>({ name: "", address: "", checked: false });
  const [showAssociate, setShowAssociate] = useState<boolean>(false);
  const tabHeaders = [
    {
      icon: <SendSVG className="stroke-current fill-transparent" />,
      title: t("Send"),
    },
    {
      icon: <PurchaseSVG className="stroke-current fill-transparent" />,
      title: t("Purchase"),
    },
    {
      icon: <QRSVG className="stroke-current fill-transparent" />,
      title: t("Receive"),
    },
    {
      icon: <SwapSVG className="stroke-current fill-transparent" />,
      title: t("Swap"),
    },
  ];

  const asyncOperations = async () => {
    setLoading(true);
    try {
      await getAllDomain();
      await getBalance();
      await getHbarPrice();
      await getTokens();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const getAllDomain = async () => {
    try {
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
    } catch (e) {}
  };

  const getBalance = async () => {
    const { hbar, amount } = await apiHandler(
      "get_balance",
      currentUser.token,
      {
        accountId: currentUser.accountId,
        net: currentUser.net,
        currency: currentUser.currency.label,
      }
    );

    setBalance({ hbar, amount });
  };

  const getTokens = async () => {
    const { popularToken } = await apiHandler(
      "get_tokenInfo",
      currentUser.token,
      {
        tokenId: "",
        accountId: currentUser.accountId,
        net: currentUser.net,
      }
    );
    setPopularTokens(popularToken);
  };

  const getHbarPrice = async () => {
    const { data } = await axios(
      `https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=usd&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8`
    );
    setHbarPrice(parseFloat(data.USD));
  };

  useEffect(() => {
    asyncOperations();
  }, [currentUser]);

  const changeAssociation = (changeToken: Toggle) => {
    setTimeout(() => {
      setAssociate({
        name: changeToken.name,
        address: changeToken.address,
        checked: changeToken.checked,
      });
      setShowAssociate(true);
    }, 300);
  };

  useEffect(() => {
    const states = [];
    for (const item of popularTokens) {
      states.push({
        name: item.name || "unknown",
        address: item.token_id,
        checked: false,
        amount: "0",
        image: item.image,
      });
    }
    setToggles(states);
  }, [popularTokens]);

  return (
    <>
      <PageContainer loading={loading}>
        <div
          className={`flex justify-center px-6 py-3 ${
            currentUser.net && "mb-6"
          }`}
        >
          <div className="w-[184px]">
            <div
              className="flex items-center w-full gap-3 p-2 pr-3 cursor-pointer bg-grey-900 active:bg-grey-800 rounded-3xl"
              onClick={() => {
                setShowWalletList(true);
                setShowTokenMng(false);
                setShowNetType(false);
                setShowEditWallet(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Web23Avatar
                  name={currentUser.userName}
                  color={currentUser.themeColor}
                  type={currentUser.type}
                />
                <span className="block overflow-hidden whitespace-nowrap truncate w-[96px] font-bold text-base text-grey-50 py-1">
                  {currentUser.userName}
                </span>
              </div>
              <ArrowDownSVG className="fill-grey-400" />
            </div>
          </div>
          <div className="flex gap-6 p-3 mt-1 ml-8">
            <OnlineSVG />
            <GearSVG
              className="stroke-current fill-transparent text-grey-50 active:text-grey-400"
              onClick={() => goTo(SettingPage)}
            />
          </div>
        </div>
        {!currentUser.net && (
          <div className="bg-[#FF9F0A] py-2 font-bold text-sm text-black text-center mb-4">
            {t("You are on Testnet")}
          </div>
        )}
        <div>
          <Web23WalletCarousel hbar={balance} currency={currentUser.currency} />
        </div>
        <PageContent className="h-auto mt-4 !px-6">
          <div className="flex justify-center gap-3 mb-6">
            {tabHeaders.map((tabInf, index) => (
              <div
                key={`${tabInf.title}_${index}`}
                className="flex flex-col items-center px-1 pt-2"
              >
                <div
                  className="active:bg-green-500 active:text-black text-white bg-grey-900 rounded-full flex justify-center items-center w-[48px] h-[48px] mb-2"
                  onClick={() => {
                    setTab(index);
                    switch (index) {
                      case RECEIVE:
                        setShowReceive(true);
                        break;
                      case PURCHASE:
                        setShowAsset(true);
                        break;
                      case SEND:
                        goTo(SendHbarPage);
                        break;
                      case SWAP:
                        goTo(SwapTab);
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  {tabInf.icon}
                </div>
                <span className="block text-sm font-bold text-center cursor-default text-grey-200">
                  {tabInf.title}
                </span>
              </div>
            ))}
          </div>

          <DomainSection
            extended={extended}
            setLoading={setLoading}
            setShowTokenMng={setShowTokenMng}
            allDomain={allDomain}
            setAllDomain={setAllDomain}
            balance={balance}
          />
        </PageContent>

        <PageAction className="px-0 pb-0">
          <DashboardActionBar selected={0} />
        </PageAction>
      </PageContainer>

      <Web23Popup
        show={showTokenMng}
        setShow={setShowTokenMng}
        title={t("Manage Tokens") || "Manage Tokens"}
      >
        <>
          <div className="relative mb-4">
            <Web23Input
              placeholder={t("Search by name or address")}
              className="pr-[62px]"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value as string)}
            />
            <p
              className="absolute top-4 right-[20px] font-medium text-sm text-lime-500"
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                setSearchKey(text);
              }}
            >
              {t("PASTE")}
            </p>
          </div>
          <div className="bg-grey-900 rounded-xl px-3 pt-[18px] pb-[10px] mb-4">
            <span className="block font-bold text-sm text-grey-200 mb-[10px]">
              {t("Enabled Tokens")}
            </span>
            <div className="overflow-auto max-h-[100px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full" />
                  <div className="py-1 text-base font-bold">
                    <span className="block mb-[2px] text-grey-50">HBAR</span>
                    <span className="block text-xs text-grey-400">
                      ℏ {balance.hbar}
                    </span>
                  </div>
                </div>
              </div>
              {toggles
                ?.filter((toggle) => toggle.checked)
                ?.map((item, index) => (
                  <div
                    className="flex items-center justify-between"
                    key={`${item.name}_${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full">
                        {item.image && <img src={item.image} alt="nft" />}
                      </div>
                      <div className="py-1 text-base font-bold">
                        <span className="block mb-[2px] text-grey-50">
                          {item.name}
                        </span>
                        <span className="block text-xs text-grey-400">
                          {item.amount}
                        </span>
                      </div>
                    </div>
                    <Web23Toggle
                      variant="secondary"
                      checked={item.checked}
                      setChecked={() => {
                        changeAssociation(item);
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <div className="px-3 pt-4 pb-2">
              <span className="block text-sm font-bold text-grey-200">
                {t("Available Tokens")}
              </span>
              <span className="block text-xs font-bold text-grey-400">
                {t("Associating a token with your wallet costs $0.05")}
              </span>
            </div>
            <div className="overflow-auto max-h-[150px] rounded-b-xl">
              {toggles?.filter(
                (toggle) =>
                  !toggle.checked &&
                  (toggle.name
                    .toLocaleLowerCase()
                    .includes(searchKey.toLowerCase()) ||
                    toggle.address
                      .toLowerCase()
                      .includes(searchKey.toLowerCase()))
              ).length
                ? toggles
                    ?.filter(
                      (toggle) =>
                        !toggle.checked &&
                        (toggle.name
                          .toLocaleLowerCase()
                          .includes(searchKey.toLowerCase()) ||
                          toggle.address
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()))
                    )
                    ?.map((item, index) => (
                      <div
                        className={`flex items-center justify-between ${
                          index !== toggles.length - 1 &&
                          "border-b border-b-grey-800"
                        }`}
                        key={`${item.name}_${index}`}
                      >
                        <div className="flex gap-3 py-[10px] px-3 items-center">
                          <div className="w-10 h-10 bg-white rounded-full" />
                          <div className="py-1">
                            <p className="pb-[2px] font-bold text-base text-grey-50">
                              {item.name}
                            </p>
                            <p className="text-xs font-bold text-grey-400">
                              {item.address}
                            </p>
                          </div>
                        </div>
                        <div className="pr-3">
                          <Web23Toggle
                            variant="secondary"
                            checked={item.checked}
                            setChecked={() => {
                              changeAssociation(item);
                            }}
                          />
                        </div>
                      </div>
                    ))
                : searchKey !== "" && (
                    <div>
                      <div
                        className={`flex items-center justify-between`}
                        key={`unknown`}
                      >
                        <div className="flex gap-3 py-[10px] px-3 items-center">
                          <div className="w-10 h-10 bg-white rounded-full" />
                          <div className="py-1">
                            <p className="pb-[2px] font-bold text-base text-grey-50">
                              {t("unknown")}
                            </p>
                            <p className="text-xs font-bold text-grey-400">
                              {searchKey}
                            </p>
                          </div>
                        </div>
                        <div
                          className="pr-3 text-lime-500 cursor-pointer"
                          onClick={async () => {
                            let data: any;
                            if (currentUser.net)
                              data = await axios(
                                `https://mainnet-public.mirrornode.hedera.com/v1/tokens/${searchKey}`
                              );
                            else
                              data = await axios(
                                `https://testnet.mirrornode.hedera.com/api/v1/tokens/${searchKey}`
                              );
                            if (data.data) {
                              setToggles((prev) =>
                                prev?.concat({
                                  address: searchKey,
                                  amount: "0",
                                  checked: false,
                                  name: data?.data.name,
                                })
                              );
                            }
                          }}
                        >
                          {t("Add")}
                        </div>
                      </div>
                    </div>
                  )}
            </div>
          </div>
        </>
      </Web23Popup>

      <Web23Popup
        title={t("Your QR Code") || "Your QR Code"}
        show={showReceive && tab === RECEIVE}
        setShow={() => setShowReceive(false)}
      >
        <div className="mt-4">
          <div className="flex justify-center">
            <div className="w-[240px] h-[240px] rounded-[32px] bg-white mb-4 flex justify-center items-center">
              <QRCode
                size={208}
                style={{ height: "auto", maxWidth: "100%", width: "208px" }}
                value={currentUser.accountId}
                viewBox={`0 0 208 208`}
              />
            </div>
          </div>
          <p className="mb-2 text-xl font-bold text-center text-white">
            {currentUser.userName}
          </p>
          <div className="flex justify-center">
            <div
              className="flex items-center gap-1 px-3 py-2 mb-6 bg-grey-800 rounded-3xl fill-grey-50 active:bg-grey-700 active:fill-lime-500"
              onClick={() => {
                navigator.clipboard.writeText(currentUser.accountId);
                showToast(t("Copied to clipboard"));
              }}
            >
              <p className="text-sm font-bold text-center text-grey-50">
                {currentUser.accountId}
              </p>
              <ContentCopySVG />
            </div>
          </div>
          <div
            className="flex items-center justify-between px-3 mb-8 bg-grey-900 rounded-xl active:bg-grey-800"
            onClick={() => {
              setShowReceive(false);
              setShowDeposit(true);
            }}
          >
            <div className="flex items-center gap-3 py-2 text-base font-bold text-grey-50">
              <HbarSVG />
              <p className="py-2">Deposit HBAR</p>
            </div>
            <ArrowDownSVG className="-rotate-90 fill-grey-400" />
          </div>
        </div>
      </Web23Popup>

      <Web23Popup
        title={t("Deposit HBAR") || "Deposit HBAR"}
        show={showDeposit}
        setShow={setShowDeposit}
      >
        <p className="my-4 text-sm font-bold text-grey-200">
          {t("Buy HBAR using Transak")}
        </p>
        <div className="flex items-center justify-between mb-8 px-3 py-[10px] bg-grey-900 rounded-xl active:bg-grey-800">
          <div className="flex items-center gap-3 text-base font-bold text-grey-50">
            <TransakLogoSVG />
            <p>Transak</p>
          </div>
          <ArrowDownSVG className="-rotate-90 fill-grey-400" />
        </div>
      </Web23Popup>

      <Web23Popup
        title={t("Buy Assets") || "Buy Assets"}
        show={showAsset}
        setShow={setShowAsset}
      >
        <div className="mb-8 bg-grey-900 rounded-xl">
          <h3 className="px-3 pt-[18px] pb-[2px] text-sm font-bold text-grey-200">
            {t("Buy using Banxa or Moonpay")}
          </h3>
          <div
            className="flex items-center justify-between px-3 py-[10px] active:bg-grey-800"
            onClick={() => goTo(DomainSectionDetail)}
          >
            <div className="flex items-center gap-3">
              <div>
                <img src={BanxaLogo} alt="Banxa logo" />
              </div>
              <p className="py-1 text-base font-bold text-grey-50">Banxa</p>
            </div>
            <ArrowDownSVG className="-rotate-90 fill-grey-400" />
          </div>
          <hr className="border-grey-800" />
          <div className="flex items-center justify-between px-3 py-[10px] rounded-b-xl active:bg-grey-800">
            <div className="flex items-center gap-3">
              <div>
                <img src={MoonpayLogo} alt="Banxa logo" />
              </div>
              <p className="py-1 text-base font-bold text-grey-50">Moonpay</p>
            </div>
            <ArrowDownSVG className="-rotate-90 fill-grey-400" />
          </div>
        </div>
      </Web23Popup>

      <Web23Popup
        title={t("Associate Token") || "Associate Token"}
        show={showAssociate}
        setShow={setShowAssociate}
      >
        <p className="my-4 font-bold text-base text-grey-200">
          {t(
            "Associating or Dissociating with your wallet costs $0.05. Do you want to continue?"
          )}
        </p>
        <Web23Button
          text={t("Confirm") || "Confirm"}
          onClick={async () => {
            try {
              setLoading(true);
              setShowAssociate(false);
              setShowTokenMng(false);
              await apiHandler("change_association", currentUser.token, {
                tokenId: associate.address,
                net: currentUser.net,
                type: associate.checked,
                accountId: currentUser.accountId,
                priv: currentUser.privKey,
              });

              setToggles((toggles) => {
                const newState = toggles?.map((item) =>
                  item.address === associate.address
                    ? { ...item, checked: !item.checked }
                    : item
                );
                return newState;
              });

              setLoading(false);
              showToast(t("Association or Dissociation is succeeded."));
            } catch (e) {
              setLoading(false);
              showToast(t("Association or Dissociation is failed."), "error");
            }
          }}
        />
        <p
          className="mt-4 mb-8 p-4 underline text-lime-500 font-bold text-sm text-center active:text-green-500"
          onClick={() => {
            setAssociate({ name: "", address: "", checked: false });
            setShowAssociate(false);
          }}
        >
          Cancel
        </p>
      </Web23Popup>

      <Web23ChooseWallet
        extraOpt={asyncOperations}
        setShowEditWallet={setShowEditWallet}
        setShowNetType={setShowNetType}
        setShowWalletList={setShowWalletList}
        showEditWallet={showEditWallet}
        showNetType={showNetType}
        showWalletList={showWalletList}
      />
    </>
  );
};

export default DashboardWallet;
