import React from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import CreateSmartPage from "./smart-page";
import SmartSetupPage from "src/pages/smart/setup";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button } from "src/components";

import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";
import { ReactComponent as CheckSVG } from "src/assets/icons/check.svg";

const ConfirmPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title={t("You are all set!") || "You are all set!"}
        onClick={() => goTo(CreateSmartPage)}
      />
      <PageContent className="items-center ">
        <div className="flex justify-center w-full mb-4">
          <CompleteSVG />
        </div>
        <p className="mb-3 text-2xl font-bold text-center text-white">
          {t("Congratulations!")}
        </p>
        <p className="mb-6 text-base font-medium text-center text-grey-200">
          {t("You can now setup your smart page")}
        </p>
        <div className="flex justify-center">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <CheckSVG className="fill-[#29741B]" />
              <p className="font-medium text-sm text-grey-200 w-[274px]">
                {t("Post NFTs, photos, videos, articles & more")}
              </p>
            </div>
            <div className="flex gap-1">
              <CheckSVG className="fill-[#29741B]" />
              <p className="font-medium text-sm text-grey-200 w-[274px]">
                {t(
                  "Build a dedicated community and reward your best followers with unique social coins"
                )}
              </p>
            </div>
            <div className="flex gap-1">
              <CheckSVG className="fill-[#29741B]" />
              <p className="font-medium text-sm text-grey-200 w-[274px]">
                {t(
                  "Monentize your artwork and content on the go and get paid to your web2 wallet"
                )}
              </p>
            </div>
          </div>
        </div>
      </PageContent>
      <PageAction>
        <Web23Button
          text={t("Continue to my Smart page") || "Continue to my Smart page"}
          onClick={() => {
            goTo(SmartSetupPage);
          }}
        />
      </PageAction>
    </PageContainer>
  );
};

export default ConfirmPage;
