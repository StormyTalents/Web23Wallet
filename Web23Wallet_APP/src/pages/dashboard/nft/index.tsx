import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";

import { PageContainer, PageContent, PageAction } from "src/layout";

import {
  DashboardActionBar,
  Web23Avatar,
  Web23Button,
  Web23ChooseWallet,
  Web23Popup,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";
import useToast from "src/utility/useToast";
import CreateNFT from "./create";

import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as LgHBarSVG } from "src/assets/icons/lg_hbar.svg";
import { ReactComponent as ArrowDropDownSVG } from "src/assets/icons/arrow_drop_down.svg";
import { ReactComponent as FilterSVG } from "src/assets/icons/filter_list.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as QRSVG } from "src/assets/icons/QR.svg";
import { ReactComponent as AddCircleSVG } from "src/assets/icons/control_point.svg";
import { ReactComponent as ContentCopySVG } from "src/assets/icons/content_copy.svg";
import DetailNFTGallery from "./detail";
import axios from "axios";

const DashboardNFT: React.FC = () => {
  const { t } = useTranslation();
  const [showSort, setShowSort] = useState<boolean>(false);
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [loading, setLoading] = useState<boolean>(false);
  const { ToasterBox, showToast } = useToast();
  const [showReceive, setShowReceive] = useState<boolean>(false);
  const [nfts, setNFTs] = useState<
    {
      nft: {
        name: string;
        description: string;
        creator: string;
        category: string;
        img: string;
        token: string;
        attribute: string[];
        external_link: string;
        collection: string;
        alternate_text: string;
      }[];
      type: string;
    }[]
  >([]);
  const [countNFT, setCountNFT] = useState<number>(0);
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);

  const getNFTs = async () => {
    try {
      setLoading(true);
      const { nfts } = await apiHandler("get_nfts", currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: "0.0.1680808",
        net: currentUser.net,
      });

      let count = 0;
      const resNFT = await Promise.all(
        nfts.map(async (nft: any) => {
          const bin = await Promise.all(
            nft.metaData.map(async (ipfs: any) => {
              count++;
              const binData = await axios(`https://ipfs.io/ipfs/${ipfs.meta}`);
              return {
                ...binData.data,
                img: "https://ipfs.io/ipfs/" + binData.data.img.slice(7),
                token: ipfs.token,
              };
            })
          );
          return { type: nft.type, nft: bin };
        })
      );

      setCountNFT(count);
      setNFTs(resNFT);
    } catch (e) {
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <>
      <PageContainer loading={loading}>
        <PageContent className="h-auto">
          <div className="px-3 py-[10px] flex items-center justify-between mb-[18px]">
            <h3 className="text-xl font-bold text-white">NFTs</h3>
            <div
              className="flex items-center gap-2 p-2 bg-grey-900 rounded-3xl active:bg-grey-800"
              onClick={() => setShowWalletList(true)}
            >
              <Web23Avatar
                name={currentUser.userName}
                color={currentUser.themeColor}
                type="initial"
                size="sm"
              />
              <ArrowDownSVG className="fill-grey-50" />
            </div>
          </div>
          <p className="mb-2 text-sm font-bold text-center uppercase text-grey-400">
            {t("total floor value")}
          </p>
          <div className="flex justify-center gap-2">
            <p className="mb-2 text-4xl font-bold text-white">
              <span className="text-grey-400">$</span>3,800.12
            </p>
            <LgHBarSVG />
          </div>
          <div className="flex justify-center gap-2 mb-6">
            <div className="flex items-center">
              <ArrowDropDownSVG className="text-xs font-bold rotate-180 fill-green-500" />
              <p className="text-green-500">+1.09%</p>
            </div>
            <p className=" text-grey-400">{t("Past 24 hours")}</p>
          </div>
          <div className="mb-4">
            <Web23Button
              text={t("Receive") + " NFT"}
              icon={<QRSVG className="stroke-current fill-transparent" />}
              size="sm"
              iconPosition="left"
              onClick={() => setShowReceive(true)}
            />
          </div>
          <Web23Button
            text={t("Create") + " NFT"}
            icon={<AddCircleSVG />}
            size="sm"
            iconPosition="left"
            variant="third"
            onClick={() => goTo(CreateNFT)}
          />
          <div className="flex items-center justify-between px-3 mt-6 mb-4">
            <h3 className="text-sm font-bold text-grey-200">
              {t("Your") + " NFTs (" + countNFT + ")"}
            </h3>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-grey-900 fill-white active:fill-green-500"
              onClick={() => {
                setShowSort(true);
              }}
            >
              <FilterSVG />
            </div>
          </div>
          <div className="grid grid-cols-2 px-3 mb-[28px] min-h-[170px]">
            {nfts.map((it, index) =>
              it.nft.map((item) => (
                <div
                  key={`${item.name}_${index}`}
                  className="pt-[14px] pb-1 flex justify-center"
                  onClick={() =>
                    goTo(DetailNFTGallery, {
                      name: item.name,
                      description: item.description,
                      category: item.category,
                      photo: item.img,
                      token: item.token,
                      attribute: item.attribute,
                      collection: item.collection,
                      external_link: item.external_link,
                      alternate_text: item.alternate_text,
                    })
                  }
                >
                  <div>
                    <div className="bg-white border rounded-xl w-[150px] h-[150px] mb-1 flex justify-center items-center">
                      <img
                        src={item.img}
                        width="146px"
                        height="146px"
                        alt={item.name}
                        className="border rounded-xl"
                      />
                    </div>
                    <span className="block text-xs font-bold text-center text-grey-400">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </PageContent>
        <PageAction className="px-0 pb-0">
          <DashboardActionBar selected={2} />
        </PageAction>
      </PageContainer>
      <Web23Popup
        title={t("Sort") || "Sort"}
        show={showSort}
        setShow={setShowSort}
      >
        <div className="my-4 bg-grey-900 rounded-xl">
          <div className="flex items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800 rounded-t-xl">
            <span className="block">{t("Sort by A-Z")}</span>
          </div>
          <hr className="border-grey-400" />
          <div className="flex items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800">
            <span className="block">{t("Sort by Z-A")}</span>
          </div>
          <hr className="border-grey-400" />
          <div className="flex items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800">
            <span className="block">{t("Recently Added")}</span>
            <CircleCheckSVG className="fill-lime-500" />
          </div>
          <hr className="border-grey-400" />
          <div className="flex items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800">
            <span className="block">{t("Price: Low to High")}</span>
          </div>
          <hr className="border-grey-400" />
          <div className="flex items-center justify-between px-3 py-4 text-base font-bold text-grey-50 active:bg-grey-800 rounded-b-xl">
            <span className="block">{t("Price: High to Low")}</span>
          </div>
        </div>
        <div className="mb-8">
          <Web23Button text={t("Apply") || "Apply"} />
        </div>
      </Web23Popup>

      <Web23Popup
        title={t("Your QR Code") || "Your QR Code"}
        show={showReceive}
        setShow={() => setShowReceive(false)}
      >
        <div className="mt-4">
          <div className="flex justify-center">
            <div className="w-[240px] h-[240px] rounded-[32px] bg-white mb-4 flex justify-center items-center">
              <QRCode
                size={208}
                style={{ height: "auto", maxWidth: "100%", width: "208px" }}
                value={currentUser.accountId}
                viewBox={`0 0 208 208`}
              />
            </div>
          </div>
          <p className="mb-2 text-xl font-bold text-center text-white">
            {currentUser.userName}
          </p>
          <div className="flex justify-center">
            <div
              className="flex items-center gap-1 px-3 py-2 mb-6 bg-grey-800 rounded-3xl fill-grey-50 active:bg-grey-700 active:fill-lime-500"
              onClick={() => {
                navigator.clipboard.writeText(currentUser.accountId);
                showToast(t("Copied to clipboard"));
              }}
            >
              <p className="text-sm font-bold text-center text-grey-50">
                {currentUser.accountId}
              </p>
              <ContentCopySVG />
            </div>
          </div>
        </div>
      </Web23Popup>

      <Web23ChooseWallet
        extraOpt={getNFTs}
        setShowEditWallet={setShowEditWallet}
        setShowNetType={setShowNetType}
        setShowWalletList={setShowWalletList}
        showEditWallet={showEditWallet}
        showNetType={showNetType}
        showWalletList={showWalletList}
      />
    </>
  );
};

export default DashboardNFT;
