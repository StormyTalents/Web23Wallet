import React, { useState } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardWallet from "./";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23Popup, Web23SearchBox } from "src/components";

import { ReactComponent as MDHBarSVG } from "src/assets/icons/md_hbar.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as ArrowDropDownSVG } from "src/assets/icons/arrow_drop_down.svg";
import { ReactComponent as SwapSVG } from "src/assets/icons/swap_con.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as DoubleArrowSVG } from "src/assets/icons/double_arrow.svg";
import { ReactComponent as XlHBarSVG } from "src/assets/icons/xl_hbar.svg";
import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";

const SwapTab: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [showChooseToken, setShowChooseToken] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [showChooseToToken, setShowChooseToToken] = useState<boolean>(false);
  const [swapto, setSwapto] = useState<string>("");
  const [showMax, setShowMax] = useState<boolean>(false);
  const [confirmPage, setConfirmPage] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [amountSwapto, setAmountSwapto] = useState<string>("");
  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        <PageTitle
          title={t("Swap Tokens") || "Swap Tokens"}
          onClick={() => goTo(DashboardWallet)}
        />
        <PageContent className="h-auto">
          {!confirmPage ? (
            <>
              <div className="my-4 bg-grey-900 rounded-xl">
                <h3 className="font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]">
                  {t("Swap from")}
                </h3>
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
                <div className="flex justify-between px-3 py-4 font-bold rounded-b-xl">
                  <span className="block text-xs text-green-500">
                    {t("SWAP ALL")}
                  </span>
                  <span className="block text-xs text-grey-400">
                    {t("Balance") + ": ℏ212,321 HBAR"}
                  </span>
                </div>
              </div>
              <div className="relative mb-4 bg-grey-900 rounded-xl">
                <h3 className="font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]">
                  {t("Swap to")}
                </h3>
                {swapto === "" ? (
                  <div className="flex justify-center py-4">
                    <button
                      className="flex items-center px-6 py-1 bg-white border-none outline-none rounded-[32px]"
                      onClick={() => setShowChooseToToken(true)}
                    >
                      <span className="block text-base font-bold text-grey-900">
                        {t("Choose Token")}
                      </span>
                      <ArrowDropDownSVG className="fill-grey-900" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="px-3 py-[10px] flex justify-between">
                      <div className="py-[6px] pl-[1px]">
                        <input
                          className="text-xl font-bold bg-transparent outline-none text-grey-400 w-[126px]"
                          placeholder="0"
                          value={amountSwapto}
                          onChange={(e) => setAmountSwapto(e.target.value)}
                        />
                      </div>
                      <div
                        className="flex items-center gap-1 p-2 rounded-[100px] bg-grey-800 active:bg-grey-700"
                        onClick={() => setShowChooseToToken(true)}
                      >
                        <MDHBarSVG />
                        <div className="flex items-center gap-2">
                          <span className="block text-base font-bold text-white uppercase">
                            {swapto}
                          </span>
                          <ArrowSVG className="fill-grey-400" />
                        </div>
                      </div>
                    </div>
                    <hr className="border-grey-800" />
                    <div className="flex justify-end px-3 py-4 text-xs font-bold text-grey-400">
                      <span>{t("Current Balance")}: ℏ321 HBARX</span>
                    </div>
                  </>
                )}
                <div className="absolute top-0 -translate-x-1/2 -translate-y-8 left-1/2">
                  <SwapSVG />
                </div>
              </div>
              <div
                className="flex justify-between px-3 py-4 mb-4 bg-grey-900 rounded-xl"
                onClick={() => setShowMax(true)}
              >
                <span className="block text-base font-bold text-grey-50">
                  {t("Max Slippage")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="block text-sm font-bold text-grey-50">
                    3%
                  </span>
                  <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                </div>
              </div>
              <div className="flex justify-between px-3 py-4 mb-6 border rounded-xl border-grey-800">
                <span className="block text-sm font-bold text-grey-200">
                  {t("Transaction Fees")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="block text-sm font-bold text-grey-200">
                    ℏ9.02
                  </span>
                  <ArrowDownSVG className="-rotate-180 fill-grey-400" />
                </div>
              </div>
              <div className="mb-8">
                <Web23Button
                  text={t("Review Swap") || "Review Swap"}
                  disabled={amount.length === 0 || amountSwapto.length === 0}
                  onClick={() => setConfirmPage(true)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between px-3 py-6 my-4 bg-grey-900 rounded-xl">
                <div>
                  <div className="flex justify-center">
                    <XlHBarSVG />
                  </div>
                  <div className="py-1 mt-3">
                    <span className="block text-base font-bold text-grey-50 mb-[2px] text-center">
                      120,300 HBAR
                    </span>
                    <span className="block text-xs font-bold text-center text-grey-400">
                      $30,136
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="animate-bounce">
                    <DoubleArrowSVG />
                  </div>
                </div>
                <div className="relative">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-white rounded-full" />
                  </div>
                  <div className="py-1 mt-3 font-bold">
                    <span className="mb-[2px] block text-base text-grey-50 text-center">
                      120,300 HBARX
                    </span>
                    <span className="block text-xs text-center text-grey-400">
                      ~$30,074
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-3 py-4 mb-4 bg-grey-900 rounded-xl">
                <span className="block text-base font-bold text-grey-50">
                  {t("Max Slippage")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="block text-sm font-bold text-grey-50">
                    3%
                  </span>
                  <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                </div>
              </div>
              <div className="flex justify-between px-3 py-4 mb-[114px] border rounded-xl border-grey-800">
                <span className="block text-sm font-bold text-grey-200">
                  {t("Transaction Fees")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="block text-sm font-bold text-grey-200">
                    ℏ9.02
                  </span>
                  <ArrowDownSVG className="-rotate-180 fill-grey-400" />
                </div>
              </div>
              <Web23Button
                text="Confirm Swap"
                onClick={() => setShowSuccess(true)}
              />
            </>
          )}
        </PageContent>
      </PageContainer>
      <Web23Popup
        show={showChooseToken}
        setShow={setShowChooseToken}
        title={t("Swap from") || "Swap from"}
      >
        <div className="relative my-4">
          <Web23SearchBox
            placeholder={t("Search Currency") || "Search Currency"}
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
            <CircleCheckSVG className="fill-lime-500" />
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
        show={showChooseToToken}
        setShow={setShowChooseToToken}
        title={t("Swap to") || "Swap to"}
      >
        <div className="relative my-4">
          <Web23SearchBox
            placeholder={t("Search Currency") || "Search Currency"}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </div>
        <div className="mb-8 bg-grey-900 rounded-xl">
          <div
            className="px-3 py-[10px] flex items-center justify-between rounded-t-xl active:bg-grey-800"
            onClick={() => {
              setSwapto("HBAR");
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}
          >
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
          </div>
          <hr className="border-grey-800" />
          <div
            className="px-3 py-[10px] flex items-center justify-between active:bg-grey-800"
            onClick={() => {
              setSwapto("BAMBOO");
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}
          >
            <div className="flex items-center gap-3">
              <MDHBarSVG />
              <div className="py-1">
                <span className="text-base font-bold text-grey-50 block mb-[2px]">
                  BAMBOO
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  ℏ291,469.62
                </span>
              </div>
            </div>
          </div>
          <hr className="border-grey-800" />
          <div
            className="px-3 py-[10px] flex items-center justify-between active:bg-grey-800"
            onClick={() => {
              setSwapto("BYZ");
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}
          >
            <div className="flex items-center gap-3">
              <MDHBarSVG />
              <div className="py-1">
                <span className="text-base font-bold text-grey-50 block mb-[2px]">
                  BYZ
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  ℏ291,469.62
                </span>
              </div>
            </div>
          </div>
          <hr className="border-grey-800" />
          <div
            className="px-3 py-[10px] flex items-center justify-between rounded-b-xl active:bg-grey-800"
            onClick={() => {
              setSwapto("DOV");
              setTimeout(() => {
                setShowChooseToToken(false);
              }, 500);
            }}
          >
            <div className="flex items-center gap-3">
              <MDHBarSVG />
              <div className="py-1">
                <span className="text-base font-bold text-grey-50 block mb-[2px]">
                  DOV
                </span>
                <span className="block text-xs font-bold text-grey-400">
                  ℏ291,469.62
                </span>
              </div>
            </div>
          </div>
        </div>
      </Web23Popup>
      <Web23Popup title="Max Slippage" show={showMax} setShow={setShowMax}>
        <div className="my-4 bg-grey-900 rounded-xl">
          <p className="px-3 pt-4 text-sm font-bold text-grey-200">
            {t(
              "Your transaction will not go through if the price changes more than this percentage"
            )}
          </p>
          <div className="flex justify-between px-3 py-4 active:bg-grey-800">
            <span className="justify-between block font-bold text-grey-50 font-base">
              1%
            </span>
          </div>
          <hr className="border-grey-800" />
          <div className="flex justify-between px-3 py-4 active:bg-grey-800">
            <span className="justify-between block font-bold text-grey-50 font-base">
              2%
            </span>
          </div>
          <hr className="border-grey-800" />
          <div className="flex justify-between px-3 py-4 active:bg-grey-800">
            <span className="justify-between block font-bold text-grey-50 font-base">
              3%
            </span>
            <CircleCheckSVG className="fill-lime-500" />
          </div>
          <hr className="border-grey-800" />
          <div className="flex justify-between px-3 py-4 rounded-b-xl active:bg-grey-800">
            <span className="justify-between block font-bold text-grey-50 font-base">
              4%
            </span>
          </div>
        </div>
        <div className="mb-8">
          <Web23Button
            text={t("Proceed") || "Proceed"}
            onClick={() => {
              setTimeout(() => {
                setShowMax(false);
              }, 500);
            }}
          />
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Swap Initiated") || "Swap Initiated"}
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
    </>
  );
};

export default SwapTab;
