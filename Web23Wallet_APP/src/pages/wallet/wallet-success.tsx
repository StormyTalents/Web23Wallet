import React from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardWallet from "src/pages/dashboard/wallet";
import WalletPassword from "./wallet-password";

import { PageContainer, PageTitle, PageContent, PageAction } from "src/layout";

import { Web23Button } from "src/components";

import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";

const SuccessWallet: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title={t("You are all set!") || "You are all set!"}
        onClick={() => goTo(WalletPassword)}
      />
      <PageContent className="items-center ">
        <div className="flex justify-center w-full mb-4">
          <CompleteSVG />
        </div>
        <p className="mb-3 text-2xl font-bold text-center text-white">
          {t("Congratulations!")}
        </p>
        <p className="text-base font-medium text-center text-grey-200">
          {t("Your Hedera super wallet is ready to go")}
        </p>
      </PageContent>
      <PageAction>
        <Web23Button
          text={t("Let’s see my dashboard") || "Let’s see my dashboard"}
          onClick={() => goTo(DashboardWallet)}
        />
      </PageAction>
    </PageContainer>
  );
};

export default SuccessWallet;
