import React, { useState, useContext, useLayoutEffect } from "react";
import { goTo } from "react-chrome-extension-router";

import DashboardWallet from "..";
import SendDetail from "./detail";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import {
  Web23Input,
  Web23Button,
  Web23Avatar,
  Web23Popup,
} from "src/components";

import { SettingContext } from "src/utility/context";
import useToast from "src/utility/useToast";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as SMHBarSVG } from "src/assets/icons/sm_hbar.svg";
import { ReactComponent as MDHBarSVG } from "src/assets/icons/md_hbar.svg";
import { ReactComponent as LgHBarSVG } from "src/assets/icons/lg_hbar.svg";
import { ReactComponent as ClearSVG } from "src/assets/icons/clear.svg";
import { ReactComponent as CheckCircleSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as EditSVG } from "src/assets/icons/edit.svg";

const PASTE = 0;
const COPY = 1;
const CLEAR = 2;

const SendHbarPage: React.FC = () => {
  const { showToast, ToasterBox } = useToast();
  const { settings, saveSettings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [searchKey, setSearchKey] = useState<string>("");
  const [copyState, setCopyState] = useState<number>(PASTE);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [walletName, setWalletName] = useState<string>("New Contact");
  const [savedWalletType, setSavedWalletType] = useState<boolean>(false);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <PageContainer>
        <PageTitle title="Send" onClick={() => goTo(DashboardWallet)} />
        <PageContent className="h-auto">
          <div className="relative my-4">
            <Web23Input
              placeholder="Search by name or address"
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
                  case COPY:
                    setShowEdit(true);
                    break;
                  case PASTE:
                    const value = await navigator.clipboard.readText();
                    setSearchKey(value);
                    if (
                      currentUser.contacts.findIndex(
                        (item) => item.accountId === value
                      ) === -1
                    )
                      setCopyState(COPY);
                    else setCopyState(CLEAR);
                    showToast("Pasted Sending Address");
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
                "SAVE"
              ) : copyState === PASTE ? (
                "PASTE"
              ) : (
                <ClearSVG />
              )}
            </label>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl max-h-[252px] overflow-y-auto">
            <h3 className="text-sm font-bold text-grey-200 pt-[18px] pb-[2px] px-3">
              My wallets
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
                ? `Search results in wallets for "${searchKey}"`
                : "Contacts"}
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
                          onClick={() =>
                            goTo(SendDetail, {
                              accountId: item.accountId,
                              userName: item.userName,
                              type: item.type,
                            })
                          }
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
                onClick={() =>
                  goTo(SendDetail, {
                    accountId: searchKey,
                    userName: "Unknown",
                    type: "initial",
                  })
                }
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
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEdit(true);
                  }}
                >
                  <EditSVG className="fill-grey-400" />
                </div>
              </div>
            )}
          </div>
        </PageContent>
        {ToasterBox}
      </PageContainer>
      <Web23Popup show={showEdit} setShow={setShowEdit} title="Save Contact">
        <div className="px-3 pt-4 pb-[14px] bg-grey-900 rounded-xl mb-4">
          <div className="flex justify-center mb-4">
            <Web23Avatar
              name={walletName}
              color="red"
              size="lg"
              type={!savedWalletType ? "initial" : "icon"}
            />
          </div>
          <Web23Input
            placeholder="Enter name"
            limit={32}
            value={walletName}
            onChange={(e) => {
              if (e.target.value.length > 31)
                setWalletName(e.target.value.slice(0, 32));
              else setWalletName(e.target.value);
            }}
          />
        </div>
        <div className="bg-grey-900 px-3 py-[10px] rounded-xl flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <LgHBarSVG />
            <div className="py-1">
              <span className="block text-base font-bold text-grey-50 mb-[2px]">
                Hedera
              </span>
              <span className="block text-xs font-bold text-grey-400">
                {searchKey}
              </span>
            </div>
          </div>
          <CheckCircleSVG className="fill-lime-500" />
        </div>
        <div className="mb-8 bg-grey-900 rounded-xl">
          <h3 className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200">
            Wallet Customization
          </h3>
          <div className="flex justify-between px-6 py-[10px]">
            <div
              className={`flex items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent ${
                !savedWalletType && "border-lime-500"
              }`}
              onClick={() => setSavedWalletType(false)}
            >
              <Web23Avatar name={walletName} color="red" type="initial" />
              <div className="py-1">
                <span className="block font-bold text-base text-grey-50 mb=[2px]">
                  Initial
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  Character
                </span>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent ${
                savedWalletType && "border-lime-500"
              }`}
              onClick={() => setSavedWalletType(true)}
            >
              <Web23Avatar name={walletName} color="red" type="icon" />
              <div className="py-1">
                <span className="block font-bold text-base text-grey-50 mb=[2px]">
                  Icon
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  Wallet Icon
                </span>
              </div>
            </div>
          </div>
          <hr className="border-grey-800" />
          <div className="p-1">
            <Web23Button
              text="Save changes"
              onClick={() => {
                let newUser = settings.userData.map((item) => {
                  if (item.accountId === currentUser.accountId) {
                    let contact = [
                      {
                        userName: walletName,
                        accountId: searchKey,
                        type: savedWalletType
                          ? "icon"
                          : ("initial" as "icon" | "initial"),
                      },
                    ];
                    if (
                      item.contacts.length > 0 &&
                      item.contacts[0].accountId !== ""
                    ) {
                      contact = item.contacts.concat({
                        userName: walletName,
                        accountId: searchKey,
                        type: savedWalletType
                          ? "icon"
                          : ("initial" as "icon" | "initial"),
                      });
                    }
                    return { ...item, contacts: contact };
                  } else return { ...item };
                });
                saveSettings({ ...settings, userData: newUser });
                setShowEdit(false);
                setSearchKey("");
                setCopyState(PASTE);
              }}
            />
          </div>
        </div>
      </Web23Popup>
    </>
  );
};

export default SendHbarPage;
