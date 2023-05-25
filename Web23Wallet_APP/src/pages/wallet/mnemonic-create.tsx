import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { PrivateKey, Mnemonic } from "@hashgraph/sdk";
import { useTranslation } from "react-i18next";

import CreateWallet from "./wallet-create";
import WalletPassword from "./wallet-password";
import SuccessWallet from "./wallet-success";

import { PageContainer, PageTitle, PageContent, PageAction } from "src/layout";

import { Web23Button, MnemonicBox, Web23Popup } from "src/components";

import { SettingContext } from "src/utility/context";
import useToast from "src/utility/useToast";

import apiHandler from "src/utility/apiHandler";

import { ReactComponent as KeySVG } from "src/assets/icons/key.svg";
import { ReactComponent as ContentCopySVG } from "src/assets/icons/content_copy.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";

import type { UserData } from "src/utility/context";

const CreateMnemonic: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { settings, saveSettings } = useContext(SettingContext);
  const { ToasterBox, showToast } = useToast();
  const [net, setNet] = useState<boolean>(true);
  const [showNet, setShowNet] = useState<boolean>(false);
  const [extendMode, setExtendMode] = useState<boolean>(false);
  const { t } = useTranslation();

  const createMnemonic = async () => {
    const mnemonic = extendMode
      ? await Mnemonic.generate()
      : await Mnemonic.generate12();
    const newAccountPrivateKey = await PrivateKey.fromMnemonic(mnemonic);
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    let newUser = [...(settings?.userData?.length ? settings?.userData : [])];

    if (!settings?.userData![0]?.accountId) {
      newUser = [
        {
          privKey: newAccountPrivateKey.toStringDer(),
          pubKey: newAccountPublicKey.toStringDer(),
          mnemonic: mnemonic._mnemonic.words,
          userName: "Wallet",
          token: "",
          accountId: "",
          themeColor: "lime",
          type: "initial",
          currency: { label: "USD", symbol: "$" },
          net: net,
          contacts: [{ userName: "", accountId: "", type: "initial" }],
        },
      ];
      saveSettings({ ...settings, userData: newUser });
    } else {
      if (settings?.userData[settings?.userData.length - 1].accountId !== "") {
        newUser.push({
          privKey: newAccountPrivateKey.toStringDer(),
          pubKey: newAccountPublicKey.toStringDer(),
          mnemonic: mnemonic._mnemonic.words,
          userName: "Wallet",
          accountId: "",
          themeColor: "lime",
          type: "initial",
          net: net,
          token: "",
          currency: { label: "USD", symbol: "$" },
          contacts: [{ userName: "", accountId: "", type: "initial" }],
        });
      } else {
        newUser.pop();
        newUser.push({
          privKey: newAccountPrivateKey.toStringDer(),
          pubKey: newAccountPublicKey.toStringDer(),
          mnemonic: mnemonic._mnemonic.words,
          userName: "Wallet",
          accountId: "",
          themeColor: "lime",
          type: "initial",
          net: net,
          token: "",
          currency: { label: "USD", symbol: "$" },
          contacts: [{ userName: "", accountId: "", type: "initial" }],
        });
      }
      saveSettings({ ...settings, userData: newUser });
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const { token, accountId } = await apiHandler("new_account", "", {
        privKey:
          settings.userData![(settings.userData?.length || 1) - 1].privKey,
        pubKey: settings.userData![(settings.userData?.length || 1) - 1].pubKey,
        mnemonicWord:
          settings.userData![
            (settings.userData?.length || 1) - 1
          ].mnemonic?.join(","),
        net: net,
      });

      const newUser = [
        ...(settings?.userData?.length ? settings?.userData : []),
      ];

      saveSettings({
        ...settings,
        userData: newUser.map((item, index) => {
          const res: UserData = item;

          if (index === (settings.userData?.length || 1) - 1) {
            res.accountId = accountId;
            res.token = token;
            res.userName =
              "Wallet " + (settings?.userData?.length || 1 - 1).toString();
            res.themeColor = "lime";
            res.type = "initial";
            res.net = net;
          }
          return res;
        }),
        selectedUser: accountId,
      });

      setLoading(false);

      if (settings.userKeyInfo) goTo(SuccessWallet);
      else goTo(WalletPassword);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    createMnemonic();
  }, [extendMode]);

  return (
    <>
      <PageContainer loading={loading} className="h-auto">
        {ToasterBox}
        <PageTitle
          title={t("Secret Phrase") || "Secret Phrase"}
          onClick={() => {
            goTo(CreateWallet);
          }}
        />
        <PageContent className="pt-6">
          <div className="flex justify-center w-full mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-grey-900 rounded-2xl">
              <KeySVG />
            </div>
          </div>
          <p className="text-grey-200 font-bold text-base text-center mb-3 px-[70px]">
            {t("These words are the keys to your wallet")}
          </p>
          <p className="mb-6 text-xs text-center text-grey-200">
            {t("Please write them down or store it somewhere safe.")}
          </p>
          <div className="w-full h-[210px]">
            <MnemonicBox
              phrase={
                settings?.userData![(settings.userData?.length || 1) - 1]
                  .mnemonic
              }
              extendMode={extendMode}
              setExtendMode={setExtendMode}
            />
          </div>
          <div className="flex justify-center px-4 py-1 mt-3 mb-[32px]">
            <div
              className="flex gap-2 cursor-pointer text-lime-500 active:text-green-500 fill-lime-500 active:fill-green-500"
              onClick={() => {
                navigator.clipboard.writeText(
                  settings?.userData![(settings.userData?.length || 1) - 1]
                    .mnemonic?.length
                    ? settings?.userData![
                        (settings.userData?.length || 1) - 1
                      ].mnemonic?.join(" ") || ""
                    : ""
                );
                showToast(t("Copied secret phrase"));
              }}
            >
              <p className="text-base font-bold">{t("Copy to clipboard")}</p>
              <ContentCopySVG />
            </div>
          </div>
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
        <PageAction>
          <Web23Button
            text={t("I have securely saved it") || "I have securely saved it"}
            onClick={handleRegister}
            disabled={loading}
          />
        </PageAction>
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

export default CreateMnemonic;
