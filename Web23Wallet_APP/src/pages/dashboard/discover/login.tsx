import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import DashboardCompass from ".";
import SmartSetupPage from "src/pages/smart/setup";

import { PageContainer } from "src/layout";

import {
  Web23Button,
  Web23Input,
  DashboardActionBar,
  Web23Popup,
} from "src/components";

import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";

import { API_SMART_ENDPOINT_URL } from "src/config/index";
import { SettingContext } from "src/utility/context";

import { ReactComponent as PageSVG } from "src/assets/icons/pages_sm.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";

const LoginSmartPage: React.FC = () => {
  const { t } = useTranslation();
  const [web3, setWeb3] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { settings, saveSettings } = useContext(SettingContext);
  const [showDomainList, setShowDomainList] = useState<boolean>(false);
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser
  );
  const [domainList, setDomainList] = useState<string[]>([]);

  const loginSmartPage = async () => {
    setLoading(true);
    try {
      const data = await axios({
        method: "post",
        url: API_SMART_ENDPOINT_URL + "auth/login",
        data: {
          domainName: web3,
          password: password,
          email: email,
        },
      });
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
    }
  };

  const getAllDomain = async () => {
    try {
      setLoading(true);
      const { web3Domain } = await apiHandler("get_tld", currentUser.token, {
        accountId: currentUser.accountId,
      });
      const web3List = await Promise.all(
        web3Domain.map((url: any) => axios(url))
      );

      setDomainList(web3List.map((item) => item.data.name));

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDomain();
  }, []);

  return (
    <>
      <PageContainer loading={loading}>
        <div className="h-full flex flex-col justify-between px-0">
          <div className="px-3 flex flex-col justify-between h-full">
            <div>
              <div>
                <h3 className="text-xl font-bold cursor-pointer text-grey-50 px-6 py-5 text-center">
                  {t("Login Web23 SmartPage")}
                </h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-center mb-4">
                  <div className="w-[48px] h-[48px] rounded-full bg-grey-900 flex justify-center items-center">
                    <PageSVG />
                  </div>
                </div>
                <p className="mb-6 text-sm font-bold text-center text-grey-200">
                  {t("Sign In with your Email, Web3 domain and password")}
                </p>
              </div>
              <div className="flex flex-col gap-4 mb-8">
                <Web23Input
                  placeholder={t("Email") || "Email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div
                  className="flex justify-between px-3 py-4 border rounded-xl border-grey-800 cursor-pointer active:bg-grey-700"
                  onClick={() => setShowDomainList(true)}
                >
                  <span className="block text-sm font-bold text-grey-200">
                    {web3 || "Choose your web3 domain"}
                  </span>
                  <div className="flex items-center gap-2">
                    <ArrowDownSVG className="fill-grey-400" />
                  </div>
                </div>
                <Web23Input
                  placeholder={t("Login password")}
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mb-6 text-xs font-bold text-center text-grey-200">
                  {t("New to Web23 SmartPage?")}{" "}
                  <span
                    className="underline cursor-pointer active:text-grey-400"
                    onClick={() => goTo(DashboardCompass)}
                  >
                    {t("Create an Account")}
                  </span>
                </p>
              </div>
            </div>
            <div className="mb-8">
              <Web23Button
                text={t("Proceed") || "Proceed"}
                onClick={async () => {
                  const data = await loginSmartPage();

                  if (data?.data?.data?.user.id) {
                    const newData = settings.userData.map((user) => {
                      if (user.accountId === settings.selectedUser) {
                        return { ...user, smartUid: data?.data?.data?.user.id };
                      }
                      return { ...user };
                    });
                    saveSettings({ ...settings, userData: newData });
                    goTo(SmartSetupPage);
                  }
                }}
                disabled={web3.length === 0 || password.length === 0}
              />
            </div>
          </div>
          <DashboardActionBar selected={4} />
        </div>
      </PageContainer>
      <Web23Popup
        title="Web3 Domains"
        show={showDomainList}
        setShow={setShowDomainList}
      >
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          <p className="pt-[18px] pb-[2px] px-3 text-grey-200 text-base font-bold">
            {t("Choose one of your web3 domains")}
          </p>
          {domainList.map((item, index) => (
            <div
              key={item + index}
              className="px-3 py-[10px] border-b border-grey-800 active:bg-grey-800"
              onClick={() => {
                setWeb3(item);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <p className="py-1 text-base font-bold text-grey-50">
                    {item}
                  </p>
                </div>
                <ArrowSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
          ))}
        </div>
      </Web23Popup>
    </>
  );
};

export default LoginSmartPage;
