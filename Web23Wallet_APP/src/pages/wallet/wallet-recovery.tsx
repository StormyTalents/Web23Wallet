import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { PrivateKey, Mnemonic } from "@hashgraph/sdk";
import { useTranslation } from "react-i18next";

import CreateWallet from "./wallet-create";
import WalletPassword from "./wallet-password";
import SuccessWallet from "./wallet-success";

import { PageContainer, PageTitle, PageContent } from "src/layout";

import { Web23Button, Web23TextArea, Web23Popup } from "src/components";

import { SettingContext } from "src/utility/context";

import apiHandler from "src/utility/apiHandler";

import { ReactComponent as KeySVG } from "src/assets/icons/key.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";

const RecoveryWallet: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { settings, saveSettings } = useContext(SettingContext);
  const [showNet, setShowNet] = useState<boolean>(false);
  const [net, setNet] = useState<boolean>(true);
  const { t } = useTranslation();

  const handleProceed = async () => {
    try {
      setLoading(true);
      let newAccountPrivateKey;
      let newAccountPublicKey;
      let words;

      if (value.includes(" ") || value.includes(",")) {
        words = value.split(/[,\s\r\n]+/);
        const mnemonic = await Mnemonic.fromWords(words);
        newAccountPrivateKey = await PrivateKey.fromMnemonic(mnemonic);
        newAccountPublicKey = newAccountPrivateKey.publicKey;
      } else {
        newAccountPrivateKey = await PrivateKey.fromString(value);
        newAccountPublicKey = newAccountPrivateKey.publicKey;
      }

      const { token, accountId } = await apiHandler("new_account", "", {
        privKey: newAccountPrivateKey?.toStringDer(),
        pubKey: newAccountPublicKey?.toStringDer(),
        mnemonicWord: words?.join(","),
        net: net,
      });

      if (!settings.userData?.find((item) => item.accountId === accountId)) {
        const newUser = [
          ...(settings?.userData?.length ? settings?.userData : []),
        ];

        newUser.push({
          privKey: newAccountPrivateKey.toStringDer(),
          pubKey: newAccountPublicKey.toStringDer(),
          mnemonic: words || [],
          accountId,
          token,
          userName: "Wallet Recovery",
          themeColor: "lime",
          type: "initial",
          net: net,
          currency: { label: "USD", symbol: "$" },
          contacts: [{ userName: "", accountId: "", type: "initial" }],
        });

        saveSettings({
          ...settings,
          userData: newUser,
          selectedUser: accountId,
        });
      }

      setLoading(false);
      if (!settings.userKeyInfo) goTo(WalletPassword);
      else goTo(SuccessWallet);
    } catch (e: any) {
      setLoading(false);
      console.log(e.message);
      setValue("");
    }
  };

  return (
    <>
      <PageContainer loading={loading} className="h-[inherit]">
        <PageTitle
          title={t("Secret Phrase") || "Secret Phrase"}
          onClick={() => {
            goTo(CreateWallet);
          }}
        />
        <PageContent className="pt-8">
          <div className="flex justify-center w-full mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-grey-900 rounded-2xl">
              <KeySVG />
            </div>
          </div>

          <p className="text-grey-200 font-bold text-sm text-center mb-6 px-[40px]">
            {t(
              "Enter 12, 24 word secret recovery phrase or private key to import your existing wallet"
            )}
          </p>

          <Web23TextArea
            value={value}
            placeholder={
              t("Enter Secret Phrase or Private Key") ||
              "Enter Secret Phrase or Private Key"
            }
            onChange={(e) => {
              setValue(e.target.value);
            }}
            rows={3}
            className="mb-6"
          />

          <Web23Button
            text={t("Proceed") || "Proceed"}
            disabled={value ? false : true}
            onClick={handleProceed}
          />

          <div
            className="bg-grey-800 rounded-[100px] px-3 py-2 flex gap-2 items-center absolute top-[14px] right-6 active:bg-grey-700 hover:bg-grey-700 cursor-pointer"
            onClick={() => setShowNet(true)}
          >
            <p className="text-base font-bold text-white">
              {net ? "Mainnet" : "Testnet"}
            </p>
            <ArrowDownSVG className="fill-grey-400" />
          </div>
        </PageContent>
      </PageContainer>
      <Web23Popup
        title={t("Network") || "Network"}
        show={showNet}
        setShow={setShowNet}
      >
        <div className="mb-8 rounded-xl bg-grey-900">
          <div
            className="py-[10px] border-b border-b-grey-800 active:bg-grey-800 rounded-t-xl"
            onClick={() => {
              setTimeout(() => {
                setNet(true);
                setShowNet(false);
              }, 300);
            }}
          >
            <div className="flex items-center justify-between px-3 pr-6">
              <div className="py-1 font-bold">
                <span className="block text-base text-grey-50 mb-[2px]">
                  Mainnet
                </span>
                <span className="block text-xs text-grey-400">
                  {t("All your real transactions here")}
                </span>
              </div>
              {net && <CircleCheckSVG className="fill-lime-500" />}
            </div>
          </div>
          <div
            className="py-[10px] px-3 pr-6 flex justify-between items-center active:bg-grey-800 rounded-b-xl"
            onClick={() => {
              setTimeout(() => {
                setNet(false);
                setShowNet(false);
              }, 300);
            }}
          >
            <div className="py-1 font-bold">
              <span className="block text-base text-grey-50 mb-[2px]">
                Testnet
              </span>
              <span className="block text-xs text-grey-400">
                {t("Used for testing only")}
              </span>
            </div>
            {!net && <CircleCheckSVG className="fill-lime-500" />}
          </div>
        </div>
      </Web23Popup>
    </>
  );
};

export default RecoveryWallet;
