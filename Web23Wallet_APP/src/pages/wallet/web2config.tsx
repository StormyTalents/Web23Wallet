import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import CreateWallet from "./wallet-create";
import WalletPassword from "./wallet-password";
import SuccessWallet from "./wallet-success";
import CreateMnemonic from "./mnemonic-create";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23Input } from "src/components";

import { SettingContext } from "src/utility/context";

import { ReactComponent as GodaddySVG } from "src/assets/icons/GoDaddy.svg";
import { ReactComponent as NameCheapSVG } from "src/assets/icons/NameCheap_md.svg";
import { ReactComponent as DynadotSVG } from "src/assets/icons/Dynadot_md.svg";

const Web2ConfigPage: React.FC<{ type?: string }> = ({ type = "godaddy" }) => {
  const [secret, setSecret] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const { settings, saveSettings } = useContext(SettingContext);
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title={
          type === "godaddy"
            ? t("Continue using") + " GoDaddy"
            : type === "namecheap"
            ? t("Continue using") + " Namecheap"
            : type === "dynadot"
            ? t("Continue using") + " Dynadot"
            : t("Continue using") + " GoDaddy"
        }
        onClick={() => goTo(CreateWallet)}
      />
      <PageContent>
        <div className="flex justify-center my-4">
          {type === "godaddy" && <GodaddySVG />}
          {type === "namecheap" && <NameCheapSVG />}
          {type === "dynadot" && <DynadotSVG />}
        </div>
        <p className="mb-3 text-base font-bold text-center text-grey-200">
          {t("Copy the Keys to proceed")}
        </p>
        <p className="mb-6 text-xs font-medium text-center text-grey-400">
          {t(
            "To finish connecting your account, please click on “Copy and Continue” button."
          )}
        </p>
        <div className="px-6 mb-4">
          <div className="bg-white h-[200px]">
            <iframe
              title="32"
              src="https://sso.godaddy.com/?realm=idp&path=%2Fkeys&app=developer&auth_reason=1"
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
        <div className="mb-3">
          <Web23Input
            placeholder={t("Key")}
            type="password"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Web23Input
            placeholder={t("Secret")}
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
      </PageContent>
      <PageAction>
        <Web23Button
          text={t("Copy and Continue") || "Copy and Continue"}
          onClick={() => {
            if (keyword.length > 0 && secret.length > 0) {
              saveSettings({
                ...settings,
                godaddyInfo: { gkey: keyword, gsecret: secret },
              });
              if (settings.userKeyInfo.length > 0) {
                if (settings.selectedUser === "") goTo(CreateMnemonic);
                else goTo(SuccessWallet);
              } else goTo(WalletPassword, { back: "web2" });
            }
          }}
        />
      </PageAction>
    </PageContainer>
  );
};

export default Web2ConfigPage;
