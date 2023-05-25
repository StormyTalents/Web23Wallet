import React from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import DashboardNFT from ".";
import SendNFT from "./send";

import { PageContainer, PageContent, PageTitle, PageAction } from "src/layout";
import {
  Web23Button,
  DashboardActionBar,
  Web23Scrollbox,
} from "src/components";

import { ReactComponent as MDHBarSVG } from "src/assets/icons/md_hbar.svg";
import { ReactComponent as CircleWavyCheckSVG } from "src/assets/icons/CircleWavyCheck.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";

const DetailNFTGallery: React.FC<{
  name: string;
  description: string;
  category: string;
  photo: string;
  token: string;
  attribute: string[];
  collection: string;
  external_link: string;
  alternate_text: string;
}> = ({
  name,
  description,
  category,
  photo,
  token,
  attribute,
  collection,
  external_link,
  alternate_text,
}) => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitle title={name} onClick={() => goTo(DashboardNFT)} />
      <PageContent className="h-auto">
        <div className="flex justify-center mt-2 mb-6">
          <div className="w-[300px] h-[300px] rounded-xl bg-white flex items-center justify-center">
            <img
              src={photo}
              width="296px"
              height="296px"
              alt={name}
              className="border rounded-xl"
            />
          </div>
        </div>
        <div className="px-3">
          <Web23Button
            text={t("Send") || "Send"}
            onClick={() =>
              goTo(SendNFT, {
                name,
                description,
                category,
                photo,
                token,
                attribute,
                collection,
                external_link,
                alternate_text,
              })
            }
          />
          <div className="flex items-stretch py-3 my-6 border justify-evenly rounded-xl border-grey-800">
            <div>
              <p className="mb-1 text-xs font-bold text-center text-grey-400">
                {t("Last Sale Price")}
              </p>
              <div className="flex items-center gap-1">
                <MDHBarSVG />
                <span className="block text-xl font-bold text-white">
                  1,321.79
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="w-[1px] h-full border-r-[1px] border-grey-800" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold text-center text-grey-400">
                {t("Floor Value")}
              </p>
              <div className="flex items-center gap-1">
                <MDHBarSVG />
                <span className="block text-xl font-bold text-white">
                  1,100.00
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mb-2 text-sm font-bold text-grey-400">
            <p>{t("Category")}</p>
            <p>{t("Collection")}</p>
          </div>
          <div className="flex justify-between mb-6 text-base font-medium text-white">
            <p>{name}</p>
            <div className="flex items-center gap-1">
              <p>{collection}</p>
              <CircleWavyCheckSVG />
            </div>
          </div>
          <p className="mb-1 text-sm font-bold text-grey-400">
            {t("Description")}
          </p>
          <p className="mb-1 text-base font-medium text-white">{description}</p>
          <p className="mb-6 text-sm font-bold cursor-pointer text-lime-500 active:text-green-500">
            {t("Read more")}
          </p>
          <h3 className="mb-1 text-sm font-bold text-grey-400">
            {t("Attributes")}
          </h3>
          {attribute ? (
            <Web23Scrollbox>
              {attribute.map((item: any, id) => (
                <div key={id + item.name}>
                  <div className="p-3 rounded-[4px] border border-[rgb(255,_255,_255,_0.32)]">
                    <p className="mb-1 text-xs font-bold text-grey-400">
                      {item.name}
                    </p>
                    <p className="text-base font-medium text-white whitespace-nowrap">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </Web23Scrollbox>
          ) : (
            <div className="p-3 border border-white border-opacity-30">
              <p className="font-bold text-base text-grey-50 text-center mb-2">
                {t("Not added yet")}
              </p>
              <p className="font-bold text-xs text-grey-600 text-center px-10">
                {t("Add attributes and their respective percentages")}
              </p>
            </div>
          )}
          <div className="flex items-center justify-between px-3 py-4 mt-6 mb-8 border rounded-xl border-grey-800">
            <p className="text-sm font-bold text-grey-200">{t("Activity")}</p>
            <ArrowDownSVG className="rotate-180 fill-grey-400" />
          </div>
        </div>
      </PageContent>
      <PageAction className="px-0 pb-0">
        <DashboardActionBar selected={2} />
      </PageAction>
    </PageContainer>
  );
};

export default DetailNFTGallery;
