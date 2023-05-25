import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardWallet from "../dashboard/wallet";

import { PageContainer, PageContent, PageAction } from "src/layout";

import { Web23Button, Web23Input } from "src/components";

import { SettingContext } from "src/utility/context";

import { ReactComponent as DomainSVG } from "src/assets/icons/Domains_big.svg";
import { ReactComponent as LogoSVG } from "src/assets/icons/logo-yellow.svg";

const LoginPage: React.FC = () => {
  const { settings } = useContext(SettingContext);
  const [password, setPassword] = useState<string>("");
  const { t } = useTranslation();

  const handleLogin = () => {
    if (settings.userKeyInfo === password) goTo(DashboardWallet);
  };

  return (
    <PageContainer>
      <PageContent>
        <div className="flex justify-center w-full my-3">
          <LogoSVG />
        </div>
        <div className="my-4 flex justify-center">
          <DomainSVG />
        </div>
        <p className="text-white font-bold text-[20px] leading-7 text-center mb-2">
          {t("Welcome back")}
        </p>
        <p className="mb-4 text-sm font-bold text-center text-grey-400">
          {t("Manage all your domains from one wallet")}
        </p>
        <Web23Input
          id="password"
          placeholder={t("Enter password")}
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </PageContent>
      <PageAction>
        <Web23Button text={t("Unlock") || "Unlock"} onClick={handleLogin} />
        <div className="text-lime-500 text-sm text-center underline font-bold mt-5 cursor-pointer">
          {t("Forgot Password?")}
        </div>
      </PageAction>
    </PageContainer>
  );
};

export default LoginPage;
