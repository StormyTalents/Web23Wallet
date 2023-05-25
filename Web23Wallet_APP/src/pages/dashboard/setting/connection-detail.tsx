import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import ConnectSitePage from "./connect-site";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Avatar, Web23Modal } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as SiteAvatarSVG } from "src/assets/icons/connect_avatar.svg";
import { ReactComponent as WalletSVG } from "src/assets/icons/Wallet.svg";
import { ReactComponent as VerifiedSVG } from "src/assets/icons/verified.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";

const ConnectionDetailPage: React.FC = () => {
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <PageContainer isBlur={showConfirm}>
        <PageTitle
          title={t("Connection Details") || "Connection Details"}
          onClick={() => goTo(ConnectSitePage)}
        />
        <PageContent>
          <div className="mb-3 flex justify-center items-center mt-[18px]">
            <SiteAvatarSVG />
          </div>
          <span className="block mb-2 text-xl font-bold text-center text-white">
            https://superrare.com
          </span>
          <span className="block mb-4 text-xs font-bold text-center text-grey-400">
            {t("is connected to your wallet")}
          </span>
          <div className="p-4 mb-4 border border-grey-800 rounded-xl">
            <span className="block mb-1 text-sm font-bold text-grey-200">
              {"Superrare" + t("will be able to")}
            </span>
            <div className="flex items-center gap-3 px-2 py-1">
              <WalletSVG className="text-grey-400 fill-grey-400" />
              <p className="text-xs font-bold text-grey-50">
                {t("Access your wallet address, activity and balance")}
              </p>
            </div>
            <div className="flex items-center gap-3 px-2 py-1">
              <VerifiedSVG />
              <p className="text-xs font-bold text-grey-50">
                {t("Request approval for transactions")}
              </p>
            </div>
          </div>
          <div className="bg-grey-900 rounded-xl pt-[18px] mb-4">
            <span className="block px-3 pb-3 text-sm font-bold text-grey-200 ">
              {t("Connecting to this wallet")}
            </span>
            <div className="px-3 pb-[12px] rounded-b-xl flex justify-between items-center active:bg-grey-800">
              <div className="flex items-center gap-3">
                <Web23Avatar
                  type={currentUser.type}
                  color={currentUser.themeColor}
                  name={currentUser.userName}
                />
                <div className="py-1">
                  <span className="block font-bold text-base text-grey-50 mb-[2px]">
                    {currentUser.userName}
                  </span>
                  <span className="block text-xs font-bold text-grey-400">
                    {currentUser.accountId}
                  </span>
                </div>
              </div>
              <ArrowDownSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
          <div className="py-1">
            <p
              className="text-sm font-bold text-center text-red-500 underline"
              onClick={() => setShowConfirm(true)}
            >
              {t("Remove Connection")}
            </p>
          </div>
        </PageContent>
      </PageContainer>
      {
        <Web23Modal show={showConfirm} setShow={setShowConfirm}>
          <div className="w-[300px]">
            <p className="mb-3 text-base font-bold text-center text-white">
              {t("Remove Connection?")}
            </p>
            <p className="mb-4 text-sm font-bold text-grey-400">
              {t("Are you sure you want to remove connection with") +
                " Superrare?"}
            </p>
            <hr className="mb-4 border-grey-800" />
            <div className="flex gap-4">
              <button
                className="block w-full py-2 text-base font-bold text-center bg-white text-grey-900 rounded-[32px]"
                onClick={() => setShowConfirm(false)}
              >
                {t("Cancel")}
              </button>
              <button
                className="block w-full py-2 text-base font-bold text-center bg-red-500 text-white rounded-[32px]"
                onClick={() => setShowConfirm(false)}
              >
                {t("Remove")}
              </button>
            </div>
          </div>
        </Web23Modal>
      }
    </>
  );
};

export default ConnectionDetailPage;
