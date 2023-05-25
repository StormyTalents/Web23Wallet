import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import SendHbarPage from ".";

import { PageContainer, PageContent, PageTitle, PageAction } from "src/layout";

import {
  Web23Avatar,
  Web23Button,
  Web23SearchBox,
  Web23Popup,
  Web23Input,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";
import useToast from "src/utility/useToast";

import { ReactComponent as SMHBarSVG } from "src/assets/icons/sm_hbar.svg";
import { ReactComponent as MDHBarSVG } from "src/assets/icons/md_hbar.svg";
import { ReactComponent as EditSVG } from "src/assets/icons/edit_fill.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CheckCircleSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as LgHBarSVG } from "src/assets/icons/lg_hbar.svg";
import { ReactComponent as DoubleArrowSVG } from "src/assets/icons/double_arrow.svg";
import { ReactComponent as XlHBarSVG } from "src/assets/icons/xl_hbar.svg";
import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";

const SendDetail: React.FC<{
  accountId: string;
  userName: string;
  type: "initial" | "icon";
}> = ({ accountId, userName, type }) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [showChooseToken, setShowChooseToken] = useState<boolean>(false);
  const [showEditContact, setShowEditContact] = useState<boolean>(false);
  const [walletName, setWalletName] = useState<string>(userName);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [memo, setMemo] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { settings, saveSettings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [editType, setEditType] = useState<"initial" | "icon">(type);
  const currentSendUser = currentUser.contacts.filter(
    (item) => item.accountId === accountId && accountId
  )[0] || { accountId, userName, type };
  const [hbarPrice, setHbarPrice] = useState<number>(0.0);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast, ToasterBox } = useToast();

  const getHbarPrice = async () => {
    setLoading(true);
    const { data } = await axios(
      `https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=${currentUser.currency.label.toLowerCase()}&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8`
    );
    setHbarPrice(parseFloat(data[`${currentUser.currency.label}`]));
    setLoading(false);
  };

  useEffect(() => {
    getHbarPrice();
  }, [currentUser]);

  return (
    <>
      <PageContainer loading={loading}>
        <PageTitle
          title={t("Send") || "Send"}
          onClick={() => goTo(SendHbarPage)}
        />
        <PageContent>
          <div className="my-4 bg-grey-900 px-3 py-[10px] flex justify-between items-center rounded-xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Web23Avatar
                  name={currentSendUser.userName}
                  type={currentSendUser.type}
                  color="red"
                />
                <div>
                  <SMHBarSVG className="absolute right-0 translate-y-1/2 translate-x-1/4 bottom-1" />
                </div>
              </div>
              <div className="py-1">
                <span className="block text-base font-bold text-grey-50 mb-[2px]">
                  {currentSendUser.userName}
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  {currentSendUser.accountId}
                </span>
              </div>
            </div>
            <EditSVG
              className="fill-grey-400 active:fill-grey-800"
              onClick={() => setShowEditContact(true)}
            />
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <div className="px-3 py-[10px] flex justify-between">
              <div className="py-[6px] pl-[1px]">
                <input
                  className="text-xl font-bold bg-transparent outline-none text-grey-400 w-[126px]"
                  placeholder={t("Enter amount") || "Enter amount"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div
                className="flex items-center gap-1 p-2 rounded-[100px] bg-grey-800 active:bg-grey-700"
                onClick={() => setShowChooseToken(true)}
              >
                <MDHBarSVG />
                <div className="flex items-center gap-2">
                  <span className="block text-base font-bold text-white uppercase">
                    hbar
                  </span>
                  <ArrowSVG className="fill-grey-400" />
                </div>
              </div>
            </div>
            <hr className="border-grey-800" />
            <div className="flex justify-between px-3 py-4 text-xs font-bold">
              <span className="block text-green-500">MAX</span>
              <span className="block text-grey-400">
                {t("Current Balance") + ": 12,321 HBAR"}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200">
            <span className="block">{t("Transaction Fees")}</span>
            <div className="flex items-center gap-4">
              <span className="block">ℏ0.5</span>
              <ArrowSVG className="rotate-180 fill-grey-400" />
            </div>
          </div>
        </PageContent>
        <PageAction>
          <Web23Button
            text={t("Review") || "Review"}
            disabled={amount.length ? false : true}
            onClick={() => setShowReview(true)}
          />
        </PageAction>
      </PageContainer>
      <Web23Popup
        show={showChooseToken}
        setShow={setShowChooseToken}
        title={t("Choose token to send") || "Choose token to send"}
      >
        <div className="relative my-4">
          <Web23SearchBox
            placeholder="Search Currency"
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </div>
        <div className="mb-8 bg-grey-900 rounded-xl">
          <div className="px-3 py-[10px] flex items-center justify-between rounded-t-xl active:bg-grey-800">
            <div className="flex items-center gap-3">
              <MDHBarSVG />
              <div className="py-1">
                <span className="text-base font-bold text-grey-50 block mb-[2px]">
                  HBAR
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  ℏ291,469.62
                </span>
              </div>
            </div>
            <CheckCircleSVG className="fill-lime-500" />
          </div>
          <hr className="border-grey-800" />
          <div className="px-3 py-[10px] flex items-center justify-between rounded-b-xl active:bg-grey-800">
            <div className="flex items-center gap-3">
              <MDHBarSVG />
              <div className="py-1">
                <span className="text-base font-bold text-grey-50 block mb-[2px]">
                  HBARX
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  ℏ291,469.62
                </span>
              </div>
            </div>
          </div>
        </div>
      </Web23Popup>
      <Web23Popup
        show={showEditContact}
        setShow={setShowEditContact}
        title={t("Edit Contact") || "Edit Contact"}
      >
        <div className="absolute top-[14px] right-6">
          <Web23Button
            text={t("Delete") || "Delete"}
            className="px-6 py-3"
            variant="danger"
            onClick={() => {
              const newUser = settings.userData.map((item) => {
                if (item.accountId === currentUser.accountId) {
                  const cons = item.contacts.filter(
                    (contact) => contact.accountId !== accountId
                  );
                  item.contacts = cons;
                }
                return item;
              });
              saveSettings({ ...settings, userData: newUser });
              goTo(SendHbarPage);
            }}
          />
        </div>
        <div className="px-3 pt-4 pb-[14px] bg-grey-900 rounded-xl mb-4">
          <div className="flex justify-center mb-4">
            <Web23Avatar
              name={walletName}
              color="red"
              size="lg"
              type={editType}
            />
          </div>
          <Web23Input
            placeholder={t("Enter name")}
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
                {accountId}
              </span>
            </div>
          </div>
          <CheckCircleSVG className="fill-lime-500" />
        </div>
        <div className="mb-8 bg-grey-900 rounded-xl">
          <h3 className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200">
            {t("Wallet Customization")}
          </h3>
          <div className="flex justify-between px-6 py-[10px]">
            <div
              className={`flex items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent ${
                editType === "initial" && "border-lime-500"
              }`}
              onClick={() => setEditType("initial")}
            >
              <Web23Avatar name={walletName} color="red" type="initial" />
              <div className="py-1">
                <span className="block font-bold text-base text-grey-50 mb=[2px]">
                  {t("Initial")}
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  {t("Character")}
                </span>
              </div>
            </div>
            <div
              className={`flex items-center gap-2 px-2 py-1 border-2 rounded-xl border-transparent ${
                editType === "icon" && "border-lime-500"
              }`}
              onClick={() => setEditType("icon")}
            >
              <Web23Avatar name={walletName} color="red" type="icon" />
              <div className="py-1">
                <span className="block font-bold text-base text-grey-50 mb=[2px]">
                  {t("Icon")}
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  {t("Wallet Icon")}
                </span>
              </div>
            </div>
          </div>
          <hr className="border-grey-800" />
          <div className="p-1">
            <Web23Button
              text={t("Save changes") || "Save changes"}
              onClick={() => {
                const newUser = settings.userData.map((item) => {
                  let contact = item.contacts;
                  if (item.accountId === currentUser.accountId)
                    contact = item.contacts.map((it) => {
                      if (it.accountId === accountId)
                        return {
                          accountId,
                          userName: walletName,
                          type: editType,
                        };
                      else return it;
                    });
                  return { ...item, contacts: contact };
                });
                saveSettings({ ...settings, userData: newUser });
                setShowEditContact(false);
              }}
            />
          </div>
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Review Transaction") || "Review Transaction"}
        show={showReview}
        setShow={setShowReview}
      >
        <div className="flex justify-between p-6 my-4 bg-grey-900 rounded-xl">
          <div>
            <div className="flex justify-center">
              <XlHBarSVG />
            </div>
            <div className="py-1 mt-3">
              <span className="block text-base font-bold text-grey-50 mb-[2px] text-center">
                {amount} HBAR
              </span>
              <span className="block text-xs font-bold text-center text-grey-400">
                {currentUser.currency.symbol}
                {(hbarPrice * parseFloat(amount)).toFixed(3)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="animate-bounce">
              <DoubleArrowSVG />
            </div>
          </div>
          <div>
            <div className="relative flex justify-center">
              <Web23Avatar
                color="red"
                name={currentSendUser.userName}
                size="md"
                type={currentSendUser.type}
              />
              <div className="absolute right-0 -translate-x-1/3 top-[48px]">
                <MDHBarSVG />
              </div>
            </div>
            <div className="py-1 mt-3 font-bold">
              <span className="mb-[2px] block text-base text-grey-50 text-center">
                {currentSendUser.userName}
              </span>
              <span className="block text-xs text-center text-grey-400">
                {currentSendUser.accountId}
              </span>
            </div>
          </div>
        </div>
        <Web23Input
          placeholder={t("Add Memo(optional)") || "Add Memo(optional)"}
          value={memo}
          onChange={(e) => {
            setMemo(e.target.value);
          }}
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
                setShowReview(false);
                setLoading(true);
                const checksum = currentSendUser.accountId.slice(0, 4);
                let sendUserId = currentSendUser.accountId;
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
                await apiHandler("send_hbar", currentUser.token, {
                  accountId: currentUser.accountId,
                  sendAccountId: sendUserId,
                  amount: parseFloat(amount).toFixed(8).toString(),
                  net: currentUser.net,
                  memo,
                  priv: currentUser.privKey,
                });
                setLoading(false);
                setShowSuccess(true);
              } catch (e) {
                showToast(t("Invalid operation"), "error");
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

export default SendDetail;
