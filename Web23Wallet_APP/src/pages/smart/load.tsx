import React, { useState, useContext, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import SmartSetupPage from "./setup";
import PostNFTPage from "./post";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";

const LoadNFTPage: React.FC = () => {
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [loading, setLoading] = useState<boolean>(false);
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
  const { t } = useTranslation();

  const getNFTs = async () => {
    try {
      setLoading(true);
      const { nfts } = await apiHandler("get_nfts", currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: "0.0.1680808",
        net: true,
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
                img: "https://ipfs.io/ipfs/" + binData.data.image.slice(7),
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
  }, [currentUser]);

  return (
    <PageContainer loading={loading}>
      <PageTitle title="Add from Wallet" onClick={() => goTo(SmartSetupPage)} />
      <PageContent className="!px-6 h-auto">
        <p className="mt-4 py-[10px] font-bold text-sm text-grey-200 mb-[14px]">
          {t("Your") + " NFTs "} ({countNFT})
        </p>
        <p className="font-sm text-grey-400 font-bold w-[265px] mb-4">
          {t("NFTs that are posted already have a grey overlay")}
        </p>
        <div className="grid grid-cols-2 mt-4 mb-8">
          {nfts.map((it, index) =>
            it.nft.map((item, idx) => (
              <div
                key={`${item.name}_${index}_${idx}`}
                onClick={() =>
                  idx === it.nft.length - 2 &&
                  goTo(PostNFTPage, {
                    img: item.img,
                    tokenId: item.token,
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    attribute: item.attribute,
                    external_link: item.external_link,
                    collection: item.collection,
                    alternate_text: item.alternate_text,
                  })
                }
                className={`${
                  idx === it.nft.length - 2 ? "opacity-100" : "opacity-25"
                }`}
              >
                <img src={item.img} alt={item.name} />
              </div>
            ))
          )}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default LoadNFTPage;
