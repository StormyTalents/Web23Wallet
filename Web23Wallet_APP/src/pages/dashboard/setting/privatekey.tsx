import React, { useState, useEffect, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import SettingPage from "./setting";

import { PageContainer, PageTitle, PageContent } from "src/layout";

import { Web23Input } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import useToast from "src/utility/useToast";

import { ReactComponent as LockSVG } from "src/assets/icons/lock_open.svg";
import { ReactComponent as ContentCopySVG } from "src/assets/icons/content_copy.svg";
import { ReactComponent as KeySVG } from "src/assets/icons/key.svg";

const PrivateKeyPage: React.FC = () => {
  const { t } = useTranslation();
  const { settings } = useContext(SettingContext);
  const [value, setValue] = useState<string>("");
  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const { showToast, ToasterBox } = useToast();

  useEffect(() => {
    if (value === settings.userKeyInfo) setShowPhrase(true);
  }, [value]);

  return (
    <PageContainer>
      <PageTitle
        title={t("Secret Phrase") || "Secret Phrase"}
        onClick={() => goTo(SettingPage)}
      />
      <PageContent>
        {!showPhrase ? (
          <>
            <div className="mb-6">
              <div className="flex justify-center mt-4">
                <div className="bg-grey-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                  <LockSVG />
                </div>
              </div>
              <span className="block text-grey-200 font-bold text-base text-center px-9">
                {t("Enter wallet password to reveal the private key")}
              </span>
            </div>
            <Web23Input
              placeholder={t("Enter password") || "Enter password"}
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value as string)}
            />
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-center mt-4">
                <div className="bg-grey-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                  <KeySVG />
                </div>
              </div>
              <span className="block text-grey-200 font-bold text-base text-center px-[70px] mb-3">
                {t("This is the key to your wallet")}
              </span>
              <span className="text-grey-400 font-medium text-xs block text-center">
                {t("Please make sure no one is watching your screen")}
              </span>
            </div>
            <div className="border border-grey-800 rounded-xl bg-grey-900 p-4 font-medium text-xs text-white">
              <p className="break-words">{currentUser.privKey}</p>
            </div>
            <div className="flex justify-center px-4 py-1 mt-5">
              <div
                className="flex gap-2 cursor-pointer text-lime-500 active:text-green-500 fill-lime-500 active:fill-green-500"
                onClick={() => {
                  navigator.clipboard.writeText(currentUser.privKey);
                  showToast(t("Copied to clipboard"));
                }}
              >
                <p className="text-base font-bold">{t("Copy to clipboard")}</p>
                <ContentCopySVG />
              </div>
            </div>
            {ToasterBox}
          </>
        )}
      </PageContent>
    </PageContainer>
  );
};

export default PrivateKeyPage;
