import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DetailNFTGallery from "./detail";

import {
  Web23Input,
  Web23Avatar,
  Web23Popup,
  Web23Button,
} from "src/components";

import { PageContainer, PageTitle, PageContent } from "src/layout";

import getSelectedUser from "src/utility/getSelectedUser";
import { SettingContext } from "src/utility/context";
import useToast from "src/utility/useToast";
import apiHandler from "src/utility/apiHandler";

import { ReactComponent as ClearSVG } from "src/assets/icons/clear.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as SMHBarSVG } from "src/assets/icons/sm_hbar.svg";
import { ReactComponent as MDHBarSVG } from "src/assets/icons/md_hbar.svg";
import { ReactComponent as LgHBarSVG } from "src/assets/icons/lg_hbar.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";

const PASTE = 0;
const COPY = 1;
const CLEAR = 2;

const SendNFT: React.FC<{
  name: string;
  description: string;
  category: string;
  photo: string;
  token: string;
  attribute: string[];
  collection: string;
  external_link: string;
  alternate_text: string;
}> = ({
  name,
  description,
  category,
  photo,
  token,
  attribute,
  collection,
  external_link,
  alternate_text,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const { settings, saveSettings } = useContext(SettingContext);
  const [copyState, setCopyState] = useState<number>(PASTE);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const { showToast, ToasterBox } = useToast();
  const [showTransaction, setShowTransaction] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [sendAccountInfo, setSendAccountInfo] = useState<{
    userName: string;
    accountId: string;
    type: "initial" | "icon";
  }>({ userName: "", accountId: "", type: "initial" });
  const [memo, setMemo] = useState<string>("");
  const { t } = useTranslation();

  return (
    <>
      <PageContainer loading={loading}>
        <PageTitle
          title={t("Send") + " NFT"}
          onClick={() =>
            goTo(DetailNFTGallery, {
              name,
              description,
              category,
              photo,
              token,
              attribute,
              collection,
              external_link,
              alternate_text,
            })
          }
        />
        <PageContent className="h-auto">
          <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
            <p className="pt-[18px] px-3 pb-[2px] font-bold text-grey-200 text-sm">
              {t("Send") + " NFT"}
            </p>
            <div className="px-3 py-[10px] flex gap-3 items-center">
              <div>
                <img src={photo} width="40" height="40" alt="nft" />
              </div>
              <div className="py-[2px]">
                <p className="mb-1 text-base font-bold text-grey-50">{name}</p>
                <p className="text-grey-400">{token}</p>
              </div>
            </div>
          </div>
          <div className="relative mb-4">
            <Web23Input
              placeholder={
                t("Search by name or address") || "Search by name or address"
              }
              value={searchKey}
              className="pr-[60px]"
              onChange={(e) => {
                setSearchKey(e.target.value);
                if ((e.target.value as string).length > 0) setCopyState(CLEAR);
                else setCopyState(PASTE);
              }}
            />
            <label
              className="absolute text-sm font-medium text-lime-500 active:font-bold top-4 right-5"
              onClick={async () => {
                switch (copyState) {
                  case PASTE:
                    const value = await navigator.clipboard.readText();
                    setSearchKey(value);
                    setCopyState(CLEAR);
                    showToast(t("Copied to clipboard"));
                    break;
                  case CLEAR:
                    setSearchKey("");
                    setCopyState(PASTE);
                    break;
                  default:
                    break;
                }
              }}
            >
              {copyState === COPY ? (
                t("SAVE")
              ) : copyState === PASTE ? (
                t("PASTE")
              ) : (
                <ClearSVG />
              )}
            </label>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl max-h-[252px] overflow-y-auto">
            <h3 className="text-sm font-bold text-grey-200 pt-[18px] pb-[2px] px-3">
              {t("My wallets")}
            </h3>
            {settings.userData.map((item, index) => (
              <div key={`${index}_${item.accountId}`}>
                <div
                  className={`px-3 py-[10px] flex items-center justify-between active:bg-grey-800 ${
                    index === settings.userData.length - 1 && "rounded-b-xl"
                  }`}
                  onClick={() => {
                    saveSettings({ ...settings, selectedUser: item.accountId });
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Web23Avatar
                        type={item.type}
                        name={item.userName}
                        color={item.themeColor}
                      />
                      <SMHBarSVG className="absolute right-0 translate-y-1/2 translate-x-1/4 bottom-1" />
                    </div>
                    <div className="py-1 font-bold">
                      <p className="text-base text-grey-50 mb-[2px]">
                        {item.userName}
                      </p>
                      <p className="text-xs text-grey-400">{item.accountId}</p>
                    </div>
                  </div>
                  {currentUser.accountId === item.accountId && (
                    <CircleCheckSVG className="fill-lime-500" />
                  )}
                </div>
                {index !== settings.userData.length - 1 && (
                  <hr className="border-grey-800" />
                )}
              </div>
            ))}
          </div>
          <div className="mb-8 bg-grey-900 rounded-xl">
            <h3 className="px-3 pt-4 pb-2 text-sm font-bold text-grey-200">
              {searchKey.length > 0
                ? `${t("Search results in wallets for")} "${searchKey}"`
                : t("Contacts")}
            </h3>
            {searchKey.length === 0 ||
            currentUser.contacts.filter(
              (item) =>
                item.accountId.includes(searchKey) ||
                item.userName.toLowerCase().includes(searchKey.toLowerCase())
            ).length > 0 ? (
              <div className="grid grid-cols-3 px-6 pt-2 pb-4">
                {currentUser?.contacts
                  ?.filter(
                    (contact) =>
                      searchKey === "" ||
                      contact.accountId.includes(searchKey) ||
                      contact.userName
                        .toLowerCase()
                        .includes(searchKey.toLowerCase())
                  )
                  .map(
                    (item) =>
                      item.accountId !== "" && (
                        <div
                          key={item.accountId}
                          className="py-2 border border-transparent hover:bg-grey-800 hover:border-grey-50 active:bg-grey-800 active:border-grey-50 rounded-xl"
                          onClick={() => {
                            setSendAccountInfo(item);
                            setShowTransaction(true);
                          }}
                        >
                          <div className="relative flex justify-center">
                            <Web23Avatar
                              color="red"
                              name={item.userName}
                              type={item.type}
                              size="md"
                            />
                            <div className="absolute right-0 translate-y-1/4 translate-x-1/5 bottom-1">
                              <MDHBarSVG />
                            </div>
                          </div>

                          <p className="mt-3 mb-[2px] font-bold text-sm text-grey-50 text-center w-full overflow-hidden truncate">
                            {item.userName}
                          </p>
                          <span className="block text-xs font-medium text-center text-grey-400">
                            {item.accountId}
                          </span>
                        </div>
                      )
                  )}
              </div>
            ) : (
              <div
                className="px-3 py-[10px] rounded-b-xl flex items-center justify-between active:bg-grey-800"
                onClick={() => {
                  setSendAccountInfo({
                    userName: "Unknown",
                    accountId: searchKey,
                    type: "initial",
                  });
                  setShowTransaction(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <LgHBarSVG />
                  <div className="py-1">
                    <span className="block text-base font-bold text-grey-50">
                      {searchKey}
                    </span>
                    <span className="block text-xs font-bold text-grey-400">
                      Hedera chain
                    </span>
                  </div>
                </div>
                <CircleCheckSVG className="fill-lime-500" />
              </div>
            )}
          </div>
        </PageContent>
      </PageContainer>

      <Web23Popup
        title={t("Review Transaction") || "Review Transaction"}
        show={showTransaction}
        setShow={setShowTransaction}
      >
        <div className="mt-4 mb-4 bg-grey-900 rounded-xl">
          <p className="pt-[18px] px-3 pb-[2px] font-bold text-sm text-grey-200">
            {t("Sending")}
          </p>
          <div className="px-3 py-[10px] border-b border-b-grey-800 flex gap-3 items-center">
            <div>
              <img src={photo} width="40" height="40" alt="nft" />
            </div>
            <div className="py-[2px]">
              <p className="mb-1 text-base font-bold text-grey-50">{name}</p>
              <p className="text-xs font-bold text-grey-400">{token}</p>
            </div>
          </div>
          <div className="px-3 py-[10px] flex items-center gap-3">
            <div className="relative">
              <Web23Avatar
                type={sendAccountInfo.type}
                name={sendAccountInfo.userName}
                color="red"
                size="sm"
              />
              <SMHBarSVG className="absolute right-0 translate-y-1/2 translate-x-1/4 bottom-1" />
            </div>
            <div className="py-1 font-bold">
              <p className="text-base text-grey-50 mb-[2px]">
                {sendAccountInfo.userName}
              </p>
              <p className="text-xs text-grey-400">
                {sendAccountInfo.accountId}
              </p>
            </div>
          </div>
        </div>
        <Web23Input
          placeholder={t("Add Memo (optional)")}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <div className="flex items-center justify-between px-3 py-4 my-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200">
          <span className="block">{t("Transaction Fees")}</span>
          <div className="flex items-center gap-4">
            <span className="block">ℏ0.5</span>
            <ArrowSVG className="rotate-180 fill-grey-400" />
          </div>
        </div>
        <div className="mb-8">
          <Web23Button
            text={t("Confirm transaction") || "Confirm transaction"}
            onClick={async () => {
              try {
                setShowTransaction(false);
                setLoading(true);
                const checksum = sendAccountInfo.accountId.slice(0, 4);
                let sendUserId = sendAccountInfo.accountId;
                if (checksum !== "0.0.") {
                  const { accountId } = await apiHandler(
                    "resolve_domain",
                    currentUser.token,
                    {
                      resolveId: sendUserId,
                    }
                  );
                  sendUserId = accountId[0]?.ownerAddress;
                }
                await apiHandler("send_nft", currentUser.token, {
                  accountId: currentUser.accountId,
                  sendAccountId: sendUserId,
                  net: currentUser.net,
                  memo,
                  priv: currentUser.privKey,
                  token,
                });
                setShowSuccess(true);
                setLoading(false);
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </div>
      </Web23Popup>

      <Web23Popup
        title={t("Transaction Initiated") || "Transaction Initiated"}
        show={showSuccess}
        setShow={setShowSuccess}
      >
        <div className="flex justify-center mt-4 mb-3">
          <CompleteSVG />
        </div>
        <p className="mb-8 text-base font-medium text-center text-grey-200">
          {t(
            "Your transaction is initiated and will go through in a few minutes. We shall keep you updated."
          )}
        </p>
      </Web23Popup>

      {ToasterBox}
    </>
  );
};

export default SendNFT;
