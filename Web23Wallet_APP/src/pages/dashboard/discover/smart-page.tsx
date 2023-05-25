import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import DashboardCompass from ".";
import VerificationPage from "./verification";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23Input, Web23Popup } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";

import { API_SMART_ENDPOINT_URL } from "src/config/index";

import { ReactComponent as PageSVG } from "src/assets/icons/pages_sm.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as FacebookSVG } from "src/assets/icons/Facebook.svg";
import { ReactComponent as GoogleSVG } from "src/assets/icons/Google.svg";
import { ReactComponent as TwitterSVG } from "src/assets/icons/Twitter_md.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import SocialImg from "src/assets/png/socials.png";

const CreateSmartPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [web3, setWeb3] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [showContinue, setShowContinue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDomainList, setShowDomainList] = useState<boolean>(false);
  const { t } = useTranslation();
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(
    settings?.userData,
    settings.selectedUser
  );
  const [domainList, setDomainList] = useState<string[]>([]);

  const createSmartAccount = async () => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: API_SMART_ENDPOINT_URL + "auth",
        data: {
          displayName: name,
          email: email,
          domainName: web3,
          password: password,
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
        <PageTitle
          title={t("Create Smart Page") || "Create Smart Page"}
          onClick={() => goTo(DashboardCompass)}
        ></PageTitle>
        <PageContent className="h-auto">
          <div className="mt-4">
            <div className="flex justify-center mb-4">
              <div className="w-[48px] h-[48px] rounded-full bg-grey-900 flex justify-center items-center">
                <PageSVG />
              </div>
            </div>
            <p className="mb-6 text-base font-bold text-center text-grey-200">
              {t("Let’s setup some basic details")}
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-8">
            <Web23Input
              placeholder={t("Display name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Web23Input
              placeholder={t("Email address")}
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
            <Web23Input
              placeholder={t("Confirm password")}
              value={confirm}
              type="password"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <div
            className="bg-grey-900 rounded-xl px-3 py-[10px] flex items-center justify-between active:bg-grey-800 mb-[64px]"
            onClick={() => {
              setShowContinue(true);
            }}
          >
            <div className="flex items-center gap-3">
              <p className="py-1 text-base font-bold text-grey-50">
                {t("or continue with")}
              </p>
              <div>
                <img src={SocialImg} alt="social" />
              </div>
            </div>
            <ArrowSVG className="-rotate-90 fill-grey-400" />
          </div>
          <div className="mb-8">
            <Web23Button
              text={t("Proceed") || "Proceed"}
              onClick={async () => {
                const data = await createSmartAccount();
                if (data?.id) {
                  goTo(VerificationPage, {
                    uid: data?.id,
                    email,
                    name,
                    password,
                    web3,
                  });
                }
              }}
              disabled={
                name.length === 0 || email.length === 0 || password !== confirm
              }
            />
          </div>
        </PageContent>
      </PageContainer>
      <Web23Popup
        title={t("Continue with") || "Continue with"}
        show={showContinue}
        setShow={setShowContinue}
      >
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          <p className="pt-[18px] pb-[2px] px-3 text-grey-200 text-base font-bold">
            {t("Choose one of the options")}
          </p>
          <div
            className="px-3 py-[10px] border-b border-grey-800 active:bg-grey-800"
            onClick={() => {
              goTo(VerificationPage);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GoogleSVG />
                <p className="py-1 text-base font-bold text-grey-50">Google</p>
              </div>
              <ArrowSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
          <div
            className="px-3 py-[10px] border-b border-grey-800 active:bg-grey-800"
            onClick={() => {
              goTo(VerificationPage);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FacebookSVG />
                <p className="py-1 text-base font-bold text-grey-50">Google</p>
              </div>
              <ArrowSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
          <div
            className="px-3 py-[10px] rounded-b-xl active:bg-grey-800"
            onClick={() => {
              goTo(VerificationPage);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TwitterSVG />
                <p className="py-1 text-base font-bold text-grey-50">Google</p>
              </div>
              <ArrowSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
        </div>
      </Web23Popup>
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

export default CreateSmartPage;
