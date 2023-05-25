/*global chrome*/
import React from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import SettingPage from "./setting";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { ReactComponent as MailSVG } from "src/assets/icons/mail.svg";
import { ReactComponent as TwitterSVG } from "src/assets/icons/TwitterLogo.svg";
import { ReactComponent as DiscordSVG } from "src/assets/icons/DiscordLogo.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";

const ContactSupportPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title={t("Contact Support") || "Contact Support"}
        onClick={() => goTo(SettingPage)}
      />
      <PageContent className="!px-6">
        <div className="mt-4 bg-grey-900 rounded-xl">
          <div
            className="flex items-center justify-between px-3 py-4 border-b active:bg-grey-800 rounded-t-xl border-grey-800"
            onClick={() => {
              window.open("mailto:anthony@web23.io");
            }}
          >
            <div className="flex items-center gap-3">
              <MailSVG />
              <span className="block text-base font-bold text-grey-50">
                {t("Email us")}
              </span>
            </div>
            <ArrowDownSVG className="-rotate-90 fill-grey-400" />
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 border-b active:bg-grey-800 border-grey-800"
            onClick={() => {
              chrome.tabs.create({ url: "https://web23.io/discord" });
            }}
          >
            <div className="flex items-center gap-3">
              <DiscordSVG />
              <span className="block text-base font-bold text-grey-50">
                {t("Discord")}
              </span>
            </div>
            <ArrowDownSVG className="-rotate-90 fill-grey-400" />
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 active:bg-grey-800 rounded-b-xl"
            onClick={() => {
              chrome.tabs.create({
                url: "https://twitter.com/web23io?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
              });
            }}
          >
            <div className="flex items-center gap-3">
              <TwitterSVG className="fill-blue-400 stroke-current text-blue-400" />
              <span className="block text-base font-bold text-grey-50">
                {t("Twitter")}
              </span>
            </div>
            <ArrowDownSVG className="-rotate-90 fill-grey-400" />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default ContactSupportPage;
