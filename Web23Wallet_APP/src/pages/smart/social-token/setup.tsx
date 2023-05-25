import React from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import SmartSetupPage from "src/pages/smart/setup";
import SocialTokenSetupProcess from "./detail";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23ComingSoon } from "src/components";

import { ReactComponent as TokenSMSVG } from "src/assets/icons/token_sm.svg";
import { ReactComponent as LocalOfferSVG } from "src/assets/icons/local_offer.svg";
import { ReactComponent as LocalCafeSVG } from "src/assets/icons/local_cafe.svg";
import { ReactComponent as VideoCamSVG } from "src/assets/icons/videocam_sm.svg";
import { ReactComponent as SubscriptSVG } from "src/assets/icons/subscriptions.svg";

const SetupSocialToken: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title="Setup Social tokens"
        onClick={() => goTo(SmartSetupPage)}
      />
      <PageContent className="h-auto">
        <div className="flex justify-center my-4">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl bg-grey-900">
            <TokenSMSVG />
          </div>
        </div>
        <p className="mb-3 text-base font-bold text-center text-grey-200">
          {t("What are Social Tokens?")}
        </p>
        <p className="mb-4 text-sm font-bold text-center text-grey-400">
          {t(
            "Your tokens, once launched can be used by your fans to unlock your content & experiences"
          )}
        </p>
        <div className="mb-4 bg-grey-900 rounded-xl">
          <div className="flex items-center gap-3 px-3 py-4 border-b border-grey-800 active:bg-grey-800 rounded-t-xl">
            <div>
              <div className="flex items-center justify-center bg-green-400 rounded-full w-9 h-9">
                <LocalOfferSVG className="fill-indigo-900" />
              </div>
            </div>
            <div>
              <p className="mb-1 text-base font-bold text-grey-50">
                {t("Coupon Giveaways")}
              </p>
              <p className="text-sm font-bold text-grey-400">
                {t("Giveaway the coupons to purchase your art at a discount")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-4 active:bg-grey-800 rounded-b-xl">
            <div>
              <div className="flex items-center justify-center bg-purple-300 rounded-full w-9 h-9">
                <LocalCafeSVG className="fill-indigo-900" />
              </div>
            </div>
            <div>
              <p className="mb-1 text-base font-bold text-grey-50">
                {t("Let fans Say Thanks")}
              </p>
              <p className="text-sm font-bold text-grey-400">
                {t("Receive donations from your fans")}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="w-[112px]">
            <Web23ComingSoon />
          </div>
          <div className="mb-6 border border-yellow-600 rounded-tl-none rounded-xl">
            <div className="flex items-center gap-3 px-3 py-4 border-b border-yellow-600">
              <div>
                <div className="flex items-center justify-center bg-orange-500 rounded-full w-9 h-9">
                  <VideoCamSVG className="fill-indigo-900" />
                </div>
              </div>
              <div>
                <p className="mb-1 text-base font-bold text-grey-50">
                  {t("10 minute Video Call")}
                </p>
                <p className="text-sm font-bold text-grey-400">
                  {t("Let your fans can setup a 1:1 live video call with you")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-4 rounded-b-xl">
              <div>
                <div className="flex items-center justify-center bg-yellow-500 rounded-full w-9 h-9">
                  <SubscriptSVG className="fill-indigo-900" />
                </div>
              </div>
              <div>
                <p className="mb-1 text-base font-bold text-grey-50">
                  {t("Subscription to your club")}
                </p>
                <p className="text-sm font-bold text-grey-400">
                  {t("Sell recurring access to your content and experiences")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <Web23Button
            text={t("Continue") || "Continue"}
            variant="secondary"
            onClick={() => goTo(SocialTokenSetupProcess)}
          />
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SetupSocialToken;
