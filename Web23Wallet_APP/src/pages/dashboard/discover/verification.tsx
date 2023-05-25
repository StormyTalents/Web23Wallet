import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import CreateSmartPage from "./smart-page";
import ConfirmPage from "./confirm";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23Input } from "src/components";

import { SettingContext } from "src/utility/context";

import { API_SMART_ENDPOINT_URL } from "src/config/index";

import { ReactComponent as KeySVG } from "src/assets/icons/key.svg";

const VerificationPage: React.FC<{
  uid?: string;
  email?: string;
  name?: string;
  password?: string;
  web3?: string;
}> = ({ uid = "", email = "", name = "", password = "", web3 = "" }) => {
  const { t } = useTranslation();
  const [code, setCode] = useState<string>("");
  const { settings, saveSettings } = useContext(SettingContext);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PageContainer loading={loading}>
      <PageTitle
        title={t("Enter verification code") || "Enter verification code"}
        onClick={() => goTo(CreateSmartPage)}
      ></PageTitle>
      <PageContent>
        <div className="flex justify-center my-4">
          <div className="bg-grey-900 w-12 h-12 rounded-2xl flex items-center justify-center">
            <KeySVG />
          </div>
        </div>
        <p className="font-bold text-base text-grey-200 mb-3 text-center">
          {t("2-Step Verification")}
        </p>
        <p className="font-bold text-sm text-grey-400 mb-6 text-center">
          {t("Please enter the 6-digit verification code sent to")}
          {" " + email || ` <${t("unknown email")}>`}
        </p>
        <Web23Input
          placeholder={t("Enter code")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <p className="font-bold text-sm text-grey-400 mt-4">
          {t("Didn’t receive the code yet?")}{" "}
          <strong
            className="text-lime-500 underline active:text-green-500"
            onClick={async () => {
              await axios.post(`${API_SMART_ENDPOINT_URL}auth`, {
                displayName: name,
                email: email,
                domainName: web3,
                password: password,
              });
            }}
          >
            {t("Resend code")}
          </strong>
        </p>
      </PageContent>
      <PageAction>
        <Web23Button
          text={t("Verify code") || "Verify code"}
          disabled={code.length === 0}
          onClick={async () => {
            try {
              setLoading(true);
              const { data } = await axios.post(
                `${API_SMART_ENDPOINT_URL}auth/${uid}/verify`,
                {
                  email,
                  code,
                }
              );
              if (data?.message === "Email Verification Success") {
                const newData = settings.userData.map((user) => {
                  if (user.accountId === settings.selectedUser) {
                    return { ...user, smartUid: uid };
                  }
                  return { ...user };
                });
                saveSettings({ ...settings, userData: newData });
                goTo(ConfirmPage);
              }
              setLoading(false);
            } catch (e) {
              console.log(e);
              setLoading(false);
            }
          }}
        />
      </PageAction>
    </PageContainer>
  );
};

export default VerificationPage;
