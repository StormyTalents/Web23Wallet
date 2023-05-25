import React, { useState } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardWallet from "..";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23Popup } from "src/components";

import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as MDHBarSVG } from "src/assets/icons/md_hbar.svg";
import { ReactComponent as VisaMasterSVG } from "src/assets/icons/visa_master.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";
import Banxa from "src/assets/icons/banxa_md.png";
import Web23Logo from "src/assets/icons/logo_md.png";
import BanxaImg from "src/assets/icons/Banxa LogoFull.png";

const DomainSectionDetail: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [receive, setReceive] = useState<string>("");
  const [progress, setProgress] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      {progress && (
        <div className="fixed top-0 left-0 w-full h-full z-[1]">
          <div className="w-full h-full bg-black opacity-90"></div>
          <div className="absolute px-6 -translate-y-1/2 top-1/2">
            <div className="flex items-center mb-3 px-[30px]">
              <div>
                <img src={Banxa} alt="banxa" />
              </div>
              <div className="w-[90px]">
                <div className="h-[1px] border-t-2 border-dashed animate-connecting" />
              </div>
              <div>
                <img src={Web23Logo} alt="web23" />
              </div>
            </div>
            <div className="flex items-center h-full text-base font-medium text-center text-grey-200">
              <p>{t("Kindly complete the transaction in Banxa window")}</p>
            </div>
          </div>
        </div>
      )}
      <PageContainer>
        <PageTitle onClick={() => goTo(DashboardWallet)} />
        <PageContent className="h-auto">
          <div className="px-3 pt-[18px] pb-[10px] bg-grey-900 rounded-xl mt-5 mb-4">
            <h3 className="text-sm font-bold text-grey-200 mb-[2px]">
              Pay using
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <input
                  className="text-xl font-bold bg-transparent outline-none text-grey-400 w-[126px]"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="p-2 rounded-[32px] flex gap-2 items-center bg-grey-800">
                <span className="block text-base font-bold text-white">
                  US Dollar
                </span>
                <ArrowDownSVG className="fill-grey-400" />
              </div>
            </div>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <h3 className="text-sm font-bold text-grey-200 px-3 pt-[18px] pb-[2px]">
              You'll receive
            </h3>
            <div className="flex items-center justify-between mb-4 px-3 py-[10px]">
              <div>
                <input
                  className="text-xl font-bold bg-transparent outline-none text-grey-400 w-[126px]"
                  placeholder="0"
                  value={receive}
                  onChange={(e) => setReceive(e.target.value)}
                />
              </div>
              <div className="p-2 rounded-[32px] flex gap-2 items-center bg-grey-800">
                <div className="flex items-center gap-1">
                  <MDHBarSVG />
                  <span className="block text-base font-bold text-white">
                    HBAR
                  </span>
                </div>
                <ArrowDownSVG className="fill-grey-400" />
              </div>
            </div>
            <hr className="border border-grey-800" />
            <span className="flex justify-end px-3 py-4 text-xs font-bold text-grey-400">
              {t("Current Balance") + ": ℏ212,321 HBAR"}
            </span>
          </div>
          <div className="px-3 py-[10px] bg-grey-900 flex gap-3 rounded-xl items-center mb-4">
            <VisaMasterSVG />
            <span className="block text-base font-bold text-grey-50">
              Visa / Mastercard
            </span>
          </div>
          <div className="flex items-center justify-between px-3 py-4 my-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200">
            <span className="block">{t("Transaction Fees")}</span>
            <div className="flex items-center gap-4">
              <span className="block">$0.06</span>
              <ArrowSVG className="rotate-180 fill-grey-400" />
            </div>
          </div>
          <Web23Button
            text={t("Continue") || "Continue"}
            onClick={() => {
              setProgress(true);
              setTimeout(() => {
                setProgress(false);
                setShowSuccess(true);
              }, 3000);
            }}
          />
        </PageContent>
      </PageContainer>
      <Web23Popup
        title="Order Initiated"
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
      <div
        className="absolute z-10 -translate-x-1/3 top-5 left-1/2"
        onClick={() => goTo(DashboardWallet)}
      >
        <img src={BanxaImg} alt="banxa" />
      </div>
    </>
  );
};

export default DomainSectionDetail;
