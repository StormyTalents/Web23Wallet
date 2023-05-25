import React, { useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import SocialTokenSetupProcess from "./detail";
import SmartSetupPage from "src/pages/smart/setup";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button } from "src/components";

import { SettingContext } from "src/utility/context";

import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";
import PerksImg from "src/assets/png/perks.png";

const SuccessSocialTokenSetup: React.FC<{
  tokenName: string;
  supply: string;
  value: string;
  name: string;
}> = ({ tokenName, supply, value, name }) => {
  const { settings, saveSettings } = useContext(SettingContext);
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title={t("You are all set!") || "You are all set!"}
        onClick={() => goTo(SocialTokenSetupProcess)}
      />
      <PageContent>
        <div className="flex justify-center mt-2 mb-6">
          <CompleteSVG />
        </div>
        <p className="mb-3 text-2xl font-bold text-center text-white">
          {t("Congratulations!")}
        </p>
        <p className="mb-6 text-sm font-bold text-center text-grey-400 ">
          {t(
            "You have launched your unique token. You can find the following token card on your smart page dashboard."
          )}
        </p>
        <div className="relative p-4 mb-6 overflow-hidden bg-indigo-800 border border-indigo-300 rounded-xl">
          <div className="flex items-end justify-between mb-2">
            <p className="text-sm font-bold text-white opacity-70">
              {tokenName}
            </p>
            <div>
              <img src={PerksImg} alt="perks" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-black text-white text-[48px]">{supply}</p>
              <p className="mb-4 text-base font-bold text-white">
                {t("Tokens")}
              </p>
              <p className="text-xs font-bold text-white opacity-50">
                {t("Per token") + ": $"}
                {value}
              </p>
            </div>
            <p className="text-xs font-bold text-white opacity-50 [writing-mode:vertical-lr]">
              {name}
            </p>
          </div>
          <p className="absolute top-[96px] left-[-36px] font-black text-white opacity-10 text-[120px]">
            {tokenName}
          </p>
        </div>
      </PageContent>
      <PageAction>
        <Web23Button
          text={t("Go to Dashboard!") || "Go to Dashboard!"}
          onClick={() => {
            saveSettings({
              ...settings,
              userData: settings.userData.map((user) => {
                if (user.accountId === settings.selectedUser)
                  return { ...user, smart: true };
                else return user;
              }),
            });
            goTo(SmartSetupPage, { initialTab: 2 });
          }}
        />
      </PageAction>
    </PageContainer>
  );
};

export default SuccessSocialTokenSetup;
