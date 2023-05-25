import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import SmartSetupPage from "./setup";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import {
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23Avatar,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as MoneySVG } from "src/assets/icons/attach_money_black.svg";
import { ReactComponent as TokenSVG } from "src/assets/icons/token_sm.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";

const TopUpBalancePage: React.FC<{
  name: string;
  value: number;
  amount: number;
  tokenId: string;
}> = ({ name, value, amount, tokenId }) => {
  const [supply, setSupply] = useState<string>("");
  const { settings } = useContext(SettingContext);
  const [tokenValue, setTokenValue] = useState<string>("");
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        <PageTitle
          title={t("Top-up balance") || "Top-up balance"}
          onClick={() => goTo(SmartSetupPage, { initialTab: 2 })}
        />
        <PageContent>
          <div className="flex items-center justify-center my-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-grey-900">
              <MoneySVG />
            </div>
          </div>
          <p className="mb-6 text-base font-bold text-center text-grey-200">
            {t("How much do you want to top-up?")}
          </p>
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 w-[288px]">
              <Web23Input
                placeholder={t("Supply")}
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
              />
              <Web23Input
                placeholder={t("Value")}
                value={tokenValue}
                onChange={(e) => setTokenValue(e.target.value)}
              />
              <p className="text-sm font-bold text-center text-grey-400">
                {`Top-up value of your ${name} would be ${value} (~${amount} HBAR)`}
              </p>
            </div>
          </div>
        </PageContent>
        <PageAction>
          <div className="px-6">
            <Web23Button
              text={t("Continue to Review") || "Continue to Review"}
              size="sm"
              onClick={() => setShowReview(true)}
            />
          </div>
        </PageAction>
      </PageContainer>
      <Web23Popup
        title={t("Review Transaction") || "Review Transaction"}
        show={showReview}
        setShow={setShowReview}
      >
        <div className="mt-4 bg-grey-900 rounded-xl">
          <p className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200">
            {t("Creating")}
          </p>
          <div className="flex items-center gap-3 border-b border-grey-800 px-3 py-[10px] active:bg-grey-800">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full">
              <TokenSVG />
            </div>
            <div className="py-[2px]">
              <p className="mb-1 text-base font-bold text-grey-50">
                {amount} tokens of {name}
              </p>
              <p className="text-xs font-bold text-grey-400">
                {t("Total Value = $")} {value}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-b-xl px-3 py-[10px] active:bg-grey-800 mb-4">
            <Web23Avatar
              name={currentUser.userName}
              color={currentUser.themeColor}
              size="sm"
              type={currentUser.type}
            />
            <div className="py-[2px]">
              <p className="mb-1 text-base font-bold text-grey-50">
                {currentUser.userName}
              </p>
              <p className="text-xs font-bold text-grey-400">
                {currentUser.accountId}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-3 py-4 mb-4 border rounded-xl border-grey-800">
          <span className="block text-sm font-bold text-grey-200">
            {t("Transaction Fees")}
          </span>
          <div className="flex items-center gap-2">
            <span className="block text-sm font-bold text-grey-200">ℏ0.5</span>
            <ArrowDownSVG className="-rotate-180 fill-grey-400" />
          </div>
        </div>
        <div className="mb-8">
          <Web23Button
            text={t("Confirm transaction") || "Confirm transaction"}
            onClick={() => {
              setShowSuccess(true);
              setShowReview(false);
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
    </>
  );
};

export default TopUpBalancePage;
