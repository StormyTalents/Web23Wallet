import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import CreateSmartPage from "./smart-page";
import LoginSmartPage from "./login";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23Popup } from "src/components";

import { ReactComponent as PageSVG } from "src/assets/icons/pages.svg";
import { ReactComponent as Web23SVG } from "src/assets/icons/Web23.svg";
import { ReactComponent as ArrowRightSVG } from "src/assets/icons/arrow_forward.svg";
import { ReactComponent as AddSVG } from "src/assets/icons/add_circle.svg";
import { ReactComponent as LinkSVG } from "src/assets/icons/link.svg";

const DashboardCompass: React.FC = () => {
  const [showSetup, setShowSetup] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        <PageTitle
          title={t("Discover") || "Discover"}
          onClick={() => goTo(LoginSmartPage)}
        />
        <PageContent>
          <div className="px-3 pt-[18px] pb-4 mx-3 my-4 bg-grey-900 rounded-xl">
            <p className="mb-[10px] text-sm font-bold text-grey-200">
              {t("Smart Pages")}
            </p>
            <div className="flex justify-center mb-2">
              <PageSVG />
            </div>
            <p className="font-bold text-base text-white mb-1 text-center">
              {t("Smart Pages Setup Incomplete")}
            </p>
            <p className="font-bold text-sm text-grey-400 text-center mb-3">
              {t("Share and monetize your work with your dedicated community")}
            </p>
            <Web23Button
              text="Get Started"
              icon={<ArrowRightSVG />}
              size="sm"
              onClick={() => {
                setShowSetup(true);
              }}
            />
          </div>
          <div className="p-3 mx-3 bg-blue-800 rounded-xl mb-[55px]">
            <div className="flex items-center gap-2 mb-6">
              <div>
                <p className="mb-1 text-xl font-bold text-white">
                  {t("Web3 domains starting at") + " $3.99"}
                </p>
                <p className="text-xs font-medium text-grey-50">
                  {t(
                    "To get access to the Web3 domains, activate your Hedera wallet"
                  )}
                </p>
              </div>
              <div>
                <Web23SVG />
              </div>
            </div>
            <Web23Button
              text={t("Activate Hedera wallet") || "Activate Hedera wallet"}
              icon={<ArrowRightSVG />}
              size="sm"
              variant="secondary"
            />
          </div>
        </PageContent>
      </PageContainer>
      <Web23Popup
        title={t("Setup Smart Page") || "Setup Smart Page"}
        show={showSetup}
        setShow={setShowSetup}
      >
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          <div
            className="flex gap-[14px] px-3 py-4 border-b rounded-t-xl border-grey-800 items-center active:bg-grey-800"
            onClick={() => {
              goTo(CreateSmartPage);
            }}
          >
            <AddSVG className="fill-grey-400" />
            <p className="font-bold text-base text-grey-50">
              {t("Create new smart page")}
            </p>
          </div>
          <div
            className="flex gap-[14px] px-3 py-4 rounded-b-xl items-center active:bg-grey-800"
            onClick={() => {
              goTo(CreateSmartPage);
            }}
          >
            <LinkSVG className="fill-grey-400" />
            <p className="font-bold text-base text-grey-50">
              {t("Link an existing smart page")}
            </p>
          </div>
        </div>
      </Web23Popup>
    </>
  );
};

export default DashboardCompass;
