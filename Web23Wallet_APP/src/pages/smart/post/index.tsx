import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";

import LoadNFTPage from "../load";
import SmartSetupPage from "../setup";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import {
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as LocalOfferSVG } from "src/assets/icons/local_offer.svg";
import { ReactComponent as SpaSVG } from "src/assets/icons/spa.svg";
import { ReactComponent as BidSVG } from "src/assets/icons/Bid.svg";

const PostNFTPage: React.FC<{
  img: string;
  tokenId: string;
  name: string;
  description: string;
  category: string;
  attribute: string[];
  external_link: string;
  collection: string;
  alternate_text: string;
}> = ({
  img,
  tokenId,
  name,
  description,
  category,
  attribute,
  external_link,
  collection,
  alternate_text,
}) => {
  const [tab, setTab] = useState<number>(-1);
  const [priceDetail, setPriceDetail] = useState<{
    price: string;
    royalty: string;
  }>({ price: "", royalty: "" });
  const [auctionDetail, setAuctionDetail] = useState<{
    price: string;
    royalty: string;
    startDate: string;
    endDate: string;
  }>({ price: "", royalty: "", startDate: "", endDate: "" });
  const [showReview, setShowReview] = useState<boolean>(false);
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  return (
    <>
      <PageContainer>
        <PageTitle title="Post NFT" onClick={() => goTo(LoadNFTPage)} />
        <PageContent className="h-auto">
          <div className="my-4 rounded-xl bg-grey-900">
            <p className="font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]">
              Posting
            </p>
            <div className="flex items-center gap-3 p-3 border-b border-grey-800">
              <div className="w-10 h-10 rounded-[4px]">
                <img src={img} alt="nft" />
              </div>
              <div>
                <p className="mb-1 text-base font-bold text-grey-50">{name}</p>
                <p className="text-xs font-bold text-grey-400">{tokenId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-b-xl">
              <Web23Avatar
                size="sm"
                type={currentUser.type}
                name={currentUser.userName}
                color={currentUser.themeColor}
              />
              <div>
                <p className="mb-1 text-base font-bold text-grey-50">
                  {currentUser.userName}
                </p>
                <p className="text-xs font-bold text-grey-400">
                  {currentUser.accountId}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`rounded-xl bg-grey-900 ${
              tab === 1 || tab === -1 ? "mb-12" : "mb-4"
            }`}
          >
            <p className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200">
              Marketplace Listing
            </p>
            <div className="flex gap-3 p-3">
              <div
                className={`p-2 border rounded-xl ${
                  tab === 0 ? "border-lime-500" : "border-grey-800"
                }`}
                onClick={() => setTab(0)}
              >
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center">
                    <div
                      className={`bg-grey-800 w-12 h-12 rounded-full flex justify-center items-center ${
                        tab === 0 ? "fill-lime-500" : "fill-grey-400"
                      }`}
                    >
                      <LocalOfferSVG />
                    </div>
                  </div>
                  <p className="text-base font-bold text-center text-white">
                    Fixed Price
                  </p>
                </div>
              </div>
              <div
                className={`p-2 border rounded-xl ${
                  tab === 1 ? "border-lime-500" : "border-grey-800"
                }`}
                onClick={() => setTab(1)}
              >
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      <div
                        className={`bg-grey-800 w-12 h-12 rounded-full flex justify-center items-center ${
                          tab === 1 ? "fill-lime-500" : "fill-grey-400"
                        }`}
                      >
                        <BidSVG />
                      </div>
                    </div>
                  </div>
                  <p className="text-base font-bold text-center text-white">
                    Open for Bids
                  </p>
                </div>
              </div>
              <div
                className={`p-2 border rounded-xl ${
                  tab === 2 ? "border-lime-500" : "border-grey-800"
                }`}
                onClick={() => setTab(2)}
              >
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center">
                    <div
                      className={`bg-grey-800 w-12 h-12 rounded-full flex justify-center items-center ${
                        tab === 2 ? "fill-lime-500" : "fill-grey-400"
                      }`}
                    >
                      <SpaSVG />
                    </div>
                  </div>
                  <p className="text-base font-bold text-center text-white">
                    Not for Sale
                  </p>
                </div>
              </div>
            </div>
            {tab === 0 && (
              <div className="px-3">
                <p className="mb-2 text-sm font-bold text-grey-200">
                  Fixed Price details
                </p>
                <div className="flex gap-4 mb-2">
                  <Web23Input
                    placeholder="Price"
                    value={priceDetail.price}
                    onChange={(e) =>
                      setPriceDetail((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                  <Web23Input
                    placeholder="Royalty"
                    value={priceDetail.royalty}
                    onChange={(e) =>
                      setPriceDetail((prev) => ({
                        ...prev,
                        royalty: e.target.value,
                      }))
                    }
                  />
                </div>
                <p className="pb-4 text-sm font-bold text-grey-400">
                  ~$11.14 in USD
                </p>
              </div>
            )}
            {tab === 2 && (
              <div className="px-3 pb-4">
                <p className="mb-2 text-sm font-bold text-grey-200">
                  Auction details
                </p>
                <div className="flex gap-4 mb-2">
                  <Web23Input
                    placeholder="Min bid price"
                    value={auctionDetail.price}
                    onChange={(e) =>
                      setAuctionDetail((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                  <Web23Input
                    placeholder="Royalty"
                    value={auctionDetail.royalty}
                    onChange={(e) =>
                      setAuctionDetail((prev) => ({
                        ...prev,
                        royalty: e.target.value,
                      }))
                    }
                  />
                </div>
                <p className="mb-4 text-sm font-bold text-grey-400">
                  ~$11.14 in USD
                </p>
                <div className="flex flex-col gap-4">
                  <Web23Input
                    placeholder="Auction start time (IST)"
                    value={auctionDetail.startDate}
                    onChange={(e) =>
                      setAuctionDetail((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                  <Web23Input
                    placeholder="Auction end time (IST)"
                    value={auctionDetail.endDate}
                    onChange={(e) =>
                      setAuctionDetail((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </PageContent>
        <PageAction>
          <Web23Button
            text="Continue to review"
            disabled={
              ((priceDetail.price === "" || priceDetail.royalty === "") &&
                tab === 0) ||
              (tab === 2 &&
                (auctionDetail.startDate === "" ||
                  auctionDetail.royalty === "" ||
                  auctionDetail.startDate === "" ||
                  auctionDetail.endDate === "")) ||
              tab === -1
            }
            onClick={() => setShowReview(true)}
          />
        </PageAction>
      </PageContainer>
      <Web23Popup
        title="Review NFT Post"
        show={showReview}
        setShow={setShowReview}
      >
        <div className="my-4 rounded-xl bg-grey-900">
          <p className="font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]">
            Posting
          </p>
          <div className="flex items-center gap-3 p-3 border-b border-grey-800">
            <div className="w-10 h-10 rounded-md">
              <img src={img} alt="nft" />
            </div>
            <div>
              <p className="mb-1 text-base font-bold text-grey-50">{name}</p>
              <p className="text-xs font-bold text-grey-400">{tokenId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-b-xl">
            <Web23Avatar
              size="sm"
              type={currentUser.type}
              name={currentUser.userName}
              color={currentUser.themeColor}
            />
            <div>
              <p className="mb-1 text-base font-bold text-grey-50">
                {currentUser.userName}
              </p>
              <p className="text-xs font-bold text-grey-400">
                {currentUser.accountId}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 rounded-xl bg-grey-900">
          <p className="font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]">
            Marketplace Listing
          </p>
          <div className="flex items-center gap-3 p-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-grey-700">
              {tab === 0 && <LocalOfferSVG className="fill-lime-500" />}
              {tab === 1 && <BidSVG className="fill-lime-500" />}
              {tab === 2 && <SpaSVG className="fill-lime-500" />}
            </div>
            <div>
              <p className="mb-1 text-base font-bold text-grey-50">
                32 HBAR (~11.14 USD)
              </p>
              <p className="text-xs font-bold text-grey-400">Fixed Price</p>
            </div>
          </div>
        </div>
        <Web23Input placeholder="Add Comment (optional)" />
        <div className="mt-4 mb-8">
          <Web23Button
            text="Post NFT"
            onClick={() => {
              setShowReview(false);
              setTimeout(() => {
                goTo(SmartSetupPage);
              }, 300);
            }}
          />
        </div>
      </Web23Popup>
    </>
  );
};

export default PostNFTPage;
