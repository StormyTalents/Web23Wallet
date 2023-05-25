import React, { useState, useLayoutEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import CreateMnemonic from "./mnemonic-create";
import Web2ConfigPage from "./web2config";

import { Web23Popup } from "src/components";

import { ReactComponent as Web23LogoSVG } from "src/assets/icons/logo_title.svg";
import { ReactComponent as GodaddySVG } from "src/assets/icons/GoDaddy.svg";
import { ReactComponent as NameCheapSVG } from "src/assets/icons/NameCheap_md.svg";
import { ReactComponent as DynadotSVG } from "src/assets/icons/Dynadot_md.svg";
import { ReactComponent as Option2SVG } from "src/assets/icons/create_wallet_option2.svg";
import { ReactComponent as Option3SVG } from "src/assets/icons/create_wallet_option3.svg";
import { ReactComponent as MDHBarSVG } from "src/assets/icons/hbar_md.svg";
import { ReactComponent as ReceiveSVG } from "src/assets/icons/call_received.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";

const CreateWallet: React.FC = () => {
  const [showDomainProvider, setShowDomainProvider] = useState<boolean>(false);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="px-8 pt-6 mb-[154px]">
        <Web23LogoSVG />
      </div>
      <div className="px-6 pb-8">
        <p className="mb-4 text-xl font-bold text-grey-400">
          {t("What would you like to do?")}
        </p>
        <div className="p-4 mb-4 bg-grey-900 rounded-xl">
          <div className="flex justify-between mb-[70px]">
            <div>
              <MDHBarSVG />
            </div>
            <div
              onClick={() => {
                goTo(CreateMnemonic);
              }}
            >
              <ReceiveSVG />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xl font-bold text-lime-500">
              {t("Create / Import a Wallet")}
            </p>
            <p className="text-sm font-bold text-grey-200">
              {t(
                "Create a New Wallet or Import an Existing Wallet on the Hedera Ecosystem"
              )}
            </p>
          </div>
        </div>
        <div className="p-4 bg-grey-900 rounded-xl">
          <div className="flex justify-between mb-[70px]">
            <div className="flex gap-2">
              <div>
                <Option2SVG />
              </div>
              <div>
                <Option3SVG />
              </div>
            </div>
            <div onClick={() => setShowDomainProvider(true)}>
              <ReceiveSVG />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xl font-bold text-lime-500">
              {t("Create / Manage Domains")}
            </p>
            <p className="text-sm font-bold text-grey-200">
              {t(
                "Manage your Domains on GoDaddy, Namecheap and other providers"
              )}
            </p>
          </div>
        </div>
      </div>
      <Web23Popup
        title={t("Select Domain Provider") || "Select Domain Provider"}
        show={showDomainProvider}
        setShow={setShowDomainProvider}
      >
        <div className="pt-4 pb-8">
          <div className="bg-grey-900 rounded-xl">
            <p className="font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]">
              {t("Supported Providers")}
            </p>
            <div
              className="px-3 py-[10px] flex justify-between border-b border-b-grey-800 active:bg-grey-800 items-center"
              onClick={() => goTo(Web2ConfigPage, { type: "godaddy" })}
            >
              <div className="flex items-center gap-2">
                <GodaddySVG />
                <p className="text-base font-bold text-grey-50">GoDaddy</p>
              </div>
              <ArrowDownSVG className="-rotate-90 fill-grey-400" />
            </div>
            <div
              className="px-3 py-[10px] flex justify-between border-b border-b-grey-800 active:bg-grey-800 items-center"
              onClick={() => goTo(Web2ConfigPage, { type: "namecheap" })}
            >
              <div className="flex items-center gap-2">
                <NameCheapSVG />
                <p className="text-base font-bold text-grey-50">Namecheap</p>
              </div>
              <ArrowDownSVG className="-rotate-90 fill-grey-400" />
            </div>
            <div
              className="px-3 py-[10px] flex justify-between rounded-b-xl active:bg-grey-800 items-center"
              onClick={() => goTo(Web2ConfigPage, { type: "dynadot" })}
            >
              <div className="flex items-center gap-2">
                <DynadotSVG />
                <p className="text-base font-bold text-grey-50">Dynadot</p>
              </div>
              <ArrowDownSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
        </div>
      </Web23Popup>
    </div>
  );
};

export default CreateWallet;
