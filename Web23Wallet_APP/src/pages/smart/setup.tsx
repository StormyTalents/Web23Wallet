/*global chrome*/
import React, { useState, useContext, useEffect, useRef } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import LoadNFTPage from "./load";
import SetupSocialToken from "./social-token/setup";
import TopUpBalancePage from "./top-up";
import GiftTokenPage from "./gift/gift-token";
import LoginSmartPage from "src/pages/dashboard/discover/login";
import CreatePostNFT from "src/pages/smart/post/create-post-nft";
import DetailPostViewPage from "./nft-detail/detail";
import PostMediaPage from "./post/media";

import { PageContainer } from "src/layout";

import {
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23TextArea,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";
import useToast from "src/utility/useToast";

import { API_SMART_ENDPOINT_URL, PINATA } from "src/config";

import { ReactComponent as ArrowBackSVG } from "src/assets/icons/arrow_back.svg";
import { ReactComponent as MoreSVG } from "src/assets/icons/more_horiz.svg";
import { ReactComponent as ContentCopySVG } from "src/assets/icons/content_copy.svg";
import { ReactComponent as AddSVG } from "src/assets/icons/add.svg";
import { ReactComponent as DesktopSVG } from "src/assets/icons/desktop_windows.svg";
import { ReactComponent as LaunchSVG } from "src/assets/icons/launch.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as PhotoSVG } from "src/assets/icons/photo.svg";
import { ReactComponent as AccountSVG } from "src/assets/icons/account_circle.svg";
import { ReactComponent as PinSVG } from "src/assets/icons/pin_drop.svg";
import { ReactComponent as TextSVG } from "src/assets/icons/text_snippet.svg";
import { ReactComponent as LinkSVG } from "src/assets/icons/link.svg";
import { ReactComponent as TwitterSVG } from "src/assets/icons/TwitterLogo.svg";
import { ReactComponent as DeleteSVG } from "src/assets/icons/delete.svg";
import { ReactComponent as InstagramSVG } from "src/assets/icons/InstagramLogo.svg";
import { ReactComponent as NFTSVG } from "src/assets/icons/NFTs.svg";
import { ReactComponent as PhotoRedSVG } from "src/assets/icons/photo_red.svg";
import { ReactComponent as AudioTrackSVG } from "src/assets/icons/audiotrack.svg";
import { ReactComponent as VideoSVG } from "src/assets/icons/videocam.svg";
import { ReactComponent as ArticleSVG } from "src/assets/icons/article.svg";
import { ReactComponent as TrendingUpSVG } from "src/assets/icons/trending_up.svg";
import { ReactComponent as TokenMarkSVG } from "src/assets/icons/token_mark.svg";
import { ReactComponent as LocalOfferSVG } from "src/assets/icons/local_offer.svg";
import { ReactComponent as LocalCafeSVG } from "src/assets/icons/local_cafe.svg";
import { ReactComponent as LoupeSVG } from "src/assets/icons/loupe.svg";
import { ReactComponent as GiftSVG } from "src/assets/icons/card_giftcard.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import PerksImg from "src/assets/png/perks.png";
import mediaImg from "src/assets/png/img.png";

type IProfileLink = {
  twitter: string;
  facebook: string;
  instagram: string;
  customLink: string[];
};

const SmartSetupPage: React.FC<{ initialTab?: number }> = ({
  initialTab = 0,
}) => {
  const [showOption, setShowOption] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [customLink, setCustomLink] = useState<string[]>([""]);
  const [countNFT, setCountNFT] = useState<number>(0);
  const [profileLink, setProfileLink] = useState<IProfileLink>({
    twitter: "",
    facebook: "",
    instagram: "",
    customLink: [],
  });
  const [twitterLink, setTwitterLink] = useState<string>("");
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [facebookLink, setFacebookLink] = useState<string>("");
  const [showPost, setShowPost] = useState<boolean>(false);
  const [showPostNFT, setShowPostNFT] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(initialTab);
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [couponType, setCouponType] = useState<boolean>(false);
  const [showDonation, setShowDonation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [bannerImg, setBannerImg] = useState<string>("");
  const [avatarImg, setAvatarImg] = useState<string>("");
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);
  const [domain, setDomain] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const { t } = useTranslation();

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
  const [media, setMedia] = useState<
    {
      category: string;
      img: string;
      description: string;
      location: string;
      copyright: string;
    }[]
  >();
  const [socialToken, setSocialToken] = useState<{
    amount: number;
    name: string;
    value: number;
    tokenId: string;
  }>({ amount: 0, name: "", value: 5, tokenId: "" });
  const { ToasterBox, showToast } = useToast();

  const asyncOperation = async () => {
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
    } catch (e) {}

    try {
      const data = await axios({
        method: "post",
        url: API_SMART_ENDPOINT_URL + "socialToken/" + currentUser.smartUid,
        data: {
          user_id: currentUser.smartUid,
        },
      });

      if (data?.data) setSocialToken(data.data.data);
    } catch (e) {}

    try {
      const mediaResponse = await axios({
        method: "post",
        url: API_SMART_ENDPOINT_URL + "media/getMedia",
        data: {
          user_id: currentUser.smartUid,
        },
      });

      if (mediaResponse?.data?.data) {
        setMedia(
          mediaResponse?.data?.data.map((item: any) => ({
            category: item.category,
            img: "https://ipfs.io/ipfs/" + item.content,
            description: item.detail,
            location: item.location,
            copyright: item.copyright,
          }))
        );
      }
    } catch (e) {}

    try {
      const userDetail = await axios({
        method: "post",
        url: API_SMART_ENDPOINT_URL + "account",
        data: {
          user_id: currentUser.smartUid,
        },
      });
      if (userDetail?.data?.data) {
        setDomain(userDetail?.data?.data.domainName);
        setDisplayName(userDetail?.data?.data.displayName);
      }
    } catch (e) {}

    try {
      const userAccount = await axios.post(
        API_SMART_ENDPOINT_URL + `account/getAccount`,
        {
          user_id: currentUser.smartUid,
        }
      );

      if (userAccount?.data?.data?.coverImageURL.length > 0)
        setBannerImg(
          "https://ipfs.io/ipfs/" + userAccount?.data?.data?.coverImageURL
        );
      if (userAccount?.data?.data?.profileImageURL.length > 0)
        setAvatarImg(
          "https://ipfs.io/ipfs/" + userAccount?.data?.data?.profileImageURL
        );
    } catch (e) {}

    try {
      const userProfile = await axios({
        method: "post",
        url: API_SMART_ENDPOINT_URL + `account/getProfile`,
        data: {
          user_id: currentUser.smartUid,
        },
      });

      if (userProfile?.data?.data) {
        setLocation(userProfile?.data?.data?.location);
        setIntro(userProfile?.data?.data?.introduction);
        setCustomLink(userProfile?.data?.data?.links);
        setTwitterLink(userProfile?.data?.data?.twitter);
        setInstagramLink(userProfile?.data?.data?.website);
        setProfileLink({
          customLink: userProfile?.data?.data.links,
          twitter: userProfile?.data?.data.twitter,
          instagram: userProfile?.data?.data.website,
          facebook: "",
        });
      }
    } catch (e) {}

    setLoading(false);
  };

  useEffect(() => {
    asyncOperation();
  }, [currentUser]);

  const onSelectBannerFile = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setBannerImg("");
      return;
    }

    setLoading(true);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setBannerImg(objectUrl);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const uploadFile = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: `${PINATA.key}`,
          pinata_secret_api_key: `${PINATA.secret}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await axios({
      method: "post",
      url: API_SMART_ENDPOINT_URL + "/account/editImage",
      data: {
        user_id: currentUser.smartUid,
        coverImage: uploadFile.data.IpfsHash,
      },
    });

    setLoading(false);
  };

  const onSelectAvatarFile = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatarImg("");
      return;
    }
    setLoading(true);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setAvatarImg(objectUrl);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const uploadFile = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: `${PINATA.key}`,
          pinata_secret_api_key: `${PINATA.secret}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = await axios({
      method: "post",
      url: API_SMART_ENDPOINT_URL + "/account/editImage",
      data: {
        user_id: currentUser.smartUid,
        profileImage: uploadFile.data.IpfsHash,
      },
    });

    setLoading(false);
  };

  return (
    <>
      <PageContainer loading={loading}>
        <div className="px-6 pt-5 pb-[76px] bg-blue-900 relative flex flex-col">
          {bannerImg && (
            <img
              src={bannerImg}
              alt="banner"
              className="absolute w-full h-full top-0 left-0"
            />
          )}
          <input
            type="file"
            onChange={onSelectBannerFile}
            className="hidden"
            ref={bannerRef}
          />
          <div className="absolute top-5 left-6 z-10">
            <ArrowBackSVG
              className="fill-grey-200"
              onClick={() => goTo(LoginSmartPage)}
            />
          </div>
          <div className="w-[72px] h-[72px] bg-gradient-to-b from-[#70B7FF] to-[#68FFA1] rounded-full absolute -bottom-[36px]">
            {avatarImg && (
              <img
                src={avatarImg}
                alt="avatar"
                width="72px"
                height="72px"
                className="rounded-full"
              />
            )}
            <input
              type="file"
              onChange={onSelectAvatarFile}
              className="hidden"
              ref={avatarRef}
            />
          </div>
        </div>
        <div className="flex justify-end px-6 pt-1 pb-2">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-grey-900 active:fill-grey-200 fill-grey-50"
            onClick={() => setShowOption(true)}
          >
            <MoreSVG />
          </div>
        </div>
        <div className="flex justify-between px-6 mb-4">
          <div>
            <p className="mb-2 text-base font-bold text-grey-50">
              {domain}
              <span className="text-sm text-grey-200">
                {"  " + displayName}
              </span>
            </p>
            {intro.length > 0 ? (
              <p className="font-medium text-xs text-grey-400 w-[163px] break-words mb-2 line-clamp-3">
                {intro}
              </p>
            ) : (
              <p
                className="mb-2 text-sm font-medium underline text-grey-400 active:text-grey-600"
                onClick={() => setShowLocation(true)}
              >
                {t("Let’s add an intro here")}
              </p>
            )}
            {location.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <div>
                  <PinSVG />
                </div>
                <p className="text-xs font-medium text-grey-400">{location}</p>
              </div>
            )}

            <div className="w-[118px] flex gap-1 items-center px-3 py-2 rounded-3xl bg-grey-900">
              <p className="text-xs font-bold text-grey-50">
                {currentUser.accountId}
              </p>
              <ContentCopySVG
                className="fill-grey-50 active:fill-grey-400"
                onClick={() => {
                  showToast("Successfully copied");
                  navigator.clipboard.writeText(currentUser.accountId);
                }}
              />
            </div>
          </div>
          <div>
            <div className="max-h-[72px] overflow-auto">
              {profileLink.customLink.map((item, idx) => (
                <div key={item + idx} className="flex items-center gap-1">
                  <div>
                    <LinkSVG className="fill-white" />
                  </div>
                  <p className="font-bold text-xs text-white max-w-[60px] truncate overflow-hidden">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              {profileLink.instagram && (
                <div>
                  <InstagramSVG />
                </div>
              )}
              {profileLink.twitter && (
                <div>
                  <TwitterSVG className="text-white stroke-current fill-white" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-6 text-sm border-b border-grey-900">
          <div
            className={`flex items-center pb-2 gap-1 border-b ${
              tab === 0 ? "border-white" : "border-transparent"
            }`}
            onClick={() => setTab(0)}
          >
            <p className="font-bold text-white">{t("Timeline")}</p>
            <p className="font-medium text-grey-400">{countNFT}</p>
          </div>
          <div
            className={`flex pb-2 items-center gap-1 border-b ${
              tab === 1 ? "border-white" : "border-transparent"
            }`}
            onClick={() => setTab(1)}
          >
            <p className="font-bold text-white">{t("Market")}</p>
            <p className="font-medium text-grey-400">0</p>
          </div>
          <div
            className={`flex pb-2 items-center gap-1 border-b ${
              tab === 2 ? "border-white" : "border-transparent"
            }`}
            onClick={() => setTab(2)}
          >
            <p className="font-bold text-white">{t("Tokens")}</p>
            <div className="px-1 py-[2px] flex gap-[2px] items-center rounded-[4px] bg-yellow-500">
              <TrendingUpSVG />
              <p className="text-xs font-bold">{t("New")}</p>
            </div>
          </div>
        </div>
        {tab === 0 && (
          <div className="grid grid-cols-3 mt-4">
            {nfts.map((it, index) =>
              it.nft.map((item) => (
                <div
                  key={`${item.name}_${index}`}
                  onClick={() =>
                    goTo(DetailPostViewPage, {
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
                >
                  <img src={item.img} alt={item.name} />
                </div>
              ))
            )}
            {media?.map((item, index) => (
              <div
                key={`${item.category}_${index}`}
                onClick={() =>
                  goTo(DetailPostViewPage, {
                    img: item.img,
                    tokenId: "",
                    name: item.copyright,
                    description: item.description,
                    category: item.category,
                    attribute: [{ location: item.location }],
                    external_link: "",
                    collection: "",
                    alternate_text: "",
                  })
                }
              >
                <img
                  src={item.category === "photo" ? item.img : mediaImg}
                  alt={item.copyright}
                />
              </div>
            ))}
          </div>
        )}
        {tab === 2 &&
          (currentUser.smart ? (
            <div className="px-6 pb-8">
              <div className="mt-4 mb-6">
                <div className="relative p-4 mb-6 overflow-hidden bg-indigo-800 border border-indigo-300 rounded-xl">
                  <div className="flex items-end justify-between mb-2">
                    <p className="text-sm font-bold text-white opacity-70">
                      {socialToken.name}
                    </p>
                    <div>
                      <img src={PerksImg} alt="perks" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-white text-[48px]">
                        {socialToken.amount}
                      </p>
                      <p className="mb-4 text-base font-bold text-white">
                        {t("Tokens")}
                      </p>
                      <p className="text-xs font-bold text-white opacity-50">
                        {t("Per token") + ": "}
                        {socialToken.value}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-white opacity-50 [writing-mode:vertical-lr]">
                      {currentUser.userName}
                    </p>
                  </div>
                  <p className="absolute top-[96px] left-[-36px] font-black text-white opacity-10 text-[120px]">
                    {socialToken.name}
                  </p>
                </div>
              </div>
              <div className="mb-6 bg-grey-900 rounded-xl">
                <div
                  className="flex items-center gap-3 px-3 py-4 border-b border-grey-800 active:bg-grey-800 rounded-t-xl"
                  onClick={() => setShowCoupon(true)}
                >
                  <div>
                    <div className="flex items-center justify-center bg-green-400 rounded-full w-9 h-9">
                      <LocalOfferSVG className="fill-indigo-900" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-base font-bold text-grey-50">
                      {t("Coupons")}
                    </p>
                    <p className="text-sm font-bold text-grey-400">
                      {t("Fans can claim 1 free token")}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3 px-3 py-4 active:bg-grey-800 rounded-b-xl"
                  onClick={() => setShowDonation(true)}
                >
                  <div>
                    <div className="flex items-center justify-center bg-purple-300 rounded-full w-9 h-9">
                      <LocalCafeSVG className="fill-indigo-900" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-base font-bold text-grey-50">
                      {t("Donations")}
                    </p>
                    <p className="text-sm font-bold text-grey-400">
                      {t("Fans can donate you any amount")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Web23Button
                  text={t("Top-Up") || "Top-Up"}
                  size="sm"
                  iconPosition="left"
                  icon={<LoupeSVG />}
                  onClick={() =>
                    goTo(TopUpBalancePage, {
                      name: socialToken.name,
                      value: socialToken.value,
                      amount: socialToken.amount,
                      tokenId: socialToken.tokenId,
                    })
                  }
                />
                <Web23Button
                  text={t("Gift") || "Gift"}
                  size="sm"
                  variant="secondary"
                  icon={<GiftSVG />}
                  iconPosition="left"
                  onClick={() =>
                    goTo(GiftTokenPage, {
                      name: socialToken.name,
                      value: socialToken.value,
                      amount: socialToken.amount,
                      tokenId: socialToken.tokenId,
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="px-6 pb-8">
              <div className="py-6 mt-4 mb-3 bg-grey-900 rounded-xl">
                <div className="flex justify-center mb-2">
                  <TokenMarkSVG />
                </div>
                <p className="mb-1 text-base font-bold text-center text-white px-11">
                  {t("Setup your token and build your own economy in Web23")}
                </p>
                <p className="px-5 text-sm font-bold text-center text-grey-400">
                  {t(
                    "Create your unique token and reward your fans and followers with them"
                  )}
                </p>
              </div>
              <Web23Button
                text={t("Setup Social Tokens") || "Setup Social Tokens"}
                size="sm"
                icon={<ArrowBackSVG className="rotate-180 fill-grey-900" />}
                onClick={() => goTo(SetupSocialToken)}
              />
            </div>
          ))}
      </PageContainer>
      {tab === 0 && (
        <div
          className="fixed bottom-[48px] right-6 w-[48px] h-[48px] rounded-full bg-lime-500 border border-grey-900 flex justify-center items-center active:bg-green-500"
          onClick={() => setShowPost(true)}
        >
          <AddSVG />
        </div>
      )}
      <Web23Popup title="Options" show={showOption} setShow={setShowOption}>
        <div className="mt-4 mb-4 bg-grey-900 rounded-xl">
          <p className="px-3 pt-4 text-sm font-bold text-grey-200">
            {t("General")}
          </p>
          <div
            className="flex items-center gap-3 px-3 py-4 border-b cursor-pointer border-grey-800 active:bg-grey-800"
            onClick={() => {
              navigator.clipboard.writeText(
                "http://147.182.216.70:3000/onboarding"
              );
              showToast(t("Copied to clipboard"));
            }}
          >
            <ContentCopySVG className="fill-grey-400" />
            <p className="text-base font-bold text-grey-50">
              {t("Copy Profile URL")}
            </p>
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 cursor-pointer rounded-b-xl active:bg-grey-800"
            onClick={() => {
              chrome.tabs.create({
                url: "http://147.182.216.70:3000/onboarding",
              });
            }}
          >
            <div className="flex items-center gap-3">
              <DesktopSVG />
              <p className="text-base font-bold text-grey-50">
                {t("Open on Desktop")}
              </p>
            </div>
            <LaunchSVG />
          </div>
        </div>
        <div className="mb-8 rounded-xl bg-grey-900">
          <p className="px-3 pt-4 text-sm font-bold text-grey-200">
            {t("Edit Profile")}
          </p>
          <div
            className="flex items-center justify-between px-3 py-4 border-b cursor-pointer border-grey-800 active:bg-grey-800"
            onClick={() => {
              setShowOption(false);
              bannerRef.current?.click();
            }}
          >
            <div className="flex items-center gap-3">
              <PhotoSVG />
              <p className="text-base font-bold text-grey-50">
                {t("Edit Cover Photo")}
              </p>
            </div>
            <ArrowSVG className="-rotate-90 fill-grey-400" />
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 border-b cursor-pointer border-grey-800 active:bg-grey-800"
            onClick={() => {
              setShowOption(false);
              avatarRef.current?.click();
            }}
          >
            <div className="flex items-center gap-3">
              <AccountSVG />
              <p className="text-base font-bold text-grey-50">
                {t("Edit Profile Picture")}
              </p>
            </div>
            <ArrowSVG className="-rotate-90 fill-grey-400" />
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 border-b cursor-pointer border-grey-800 active:bg-grey-800"
            onClick={() => {
              setTimeout(() => {
                setShowOption(false);
                setShowLocation(true);
              }, 300);
            }}
          >
            <div className="flex items-center gap-3">
              <PinSVG />
              <p className="text-base font-bold text-grey-50">
                {t("Edit Location")}
              </p>
            </div>
            <ArrowSVG className="-rotate-90 fill-grey-400" />
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 border-b cursor-pointer border-grey-800 active:bg-grey-800"
            onClick={() => {
              setTimeout(() => {
                setShowOption(false);
                setShowLocation(true);
              }, 300);
            }}
          >
            <div className="flex items-center gap-3">
              <TextSVG />
              <p className="text-base font-bold text-grey-50">
                {t("Edit Intro")}
              </p>
            </div>
            <ArrowSVG className="-rotate-90 fill-grey-400" />
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 cursor-pointer rounded-b-xl active:bg-grey-800"
            onClick={() => {
              setTimeout(() => {
                setShowOption(false);
                setShowLink(true);
              }, 300);
            }}
          >
            <div className="flex items-center gap-3">
              <LinkSVG className="fill-grey-400" />
              <p className="text-base font-bold text-grey-50">
                {t("Manage Links")}
              </p>
            </div>
            <ArrowSVG className="-rotate-90 fill-grey-400" />
          </div>
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Edit Profile Details") || "Edit Profile Details"}
        show={showLocation}
        setShow={setShowLocation}
      >
        <div className="px-3 pb-4 mt-4 mb-8 bg-grey-900 rounded-xl">
          <p className="pt-[18px] pb-[2px] text-grey-200 font-bold text-sm">
            {t("Profile Details")}
          </p>
          <div className="mt-3 mb-4">
            <Web23Input
              placeholder={t("Enter Location")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Web23TextArea
            placeholder="Tell us more about yourself (Intro)"
            value={intro}
            rows={5}
            onChange={(e) => setIntro(e.target.value)}
            className="border border-grey-800 outline-1"
          />
        </div>
        <div className="mb-8">
          <Web23Button
            text={t("Save Profile") || "Save Profile"}
            size="sm"
            disabled={location.length === 0 || intro.length === 0}
            onClick={async () => {
              setShowLocation(false);
              await axios({
                method: "post",
                url: API_SMART_ENDPOINT_URL + "/account/editIntro",
                data: {
                  user_id: currentUser.smartUid,
                  introduction: intro,
                  location: location,
                },
              });
            }}
          />
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Manage Links") || "Manage Links"}
        show={showLink}
        setShow={setShowLink}
      >
        <div className="my-4 bg-grey-900 rounded-xl">
          <p className="px-3 pt-4 text-sm font-bold text-grey-200">
            {t("Social Networks")}
          </p>
          <div className="flex flex-col gap-4 pb-4 mb-4">
            <div className="flex items-center justify-between px-3">
              <p className="text-base font-bold text-grey-400">twitter.com/</p>
              <div className="w-[164px]">
                <Web23Input
                  placeholder="add here"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-3">
              <p className="text-base font-bold text-grey-400">facebook.com/</p>
              <div className="w-[164px]">
                <Web23Input
                  placeholder={t("add here")}
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-3">
              <p className="text-base font-bold text-grey-400">
                instagram.com/
              </p>
              <div className="w-[164px]">
                <Web23Input
                  placeholder={t("add here")}
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 pb-4 mb-4 bg-grey-900 rounded-xl">
          <div className="flex justify-between items-center pt-4 mb-[14px]">
            <p className="text-sm font-bold text-grey-200">
              {t("Add Custom Link")}
            </p>
            <DeleteSVG
              className="fill-red-500"
              onClick={() => {
                if (customLink.length > 1)
                  setCustomLink((prev) => prev.slice(1));
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            {customLink.map((custom, index) => (
              <div key={index}>
                <Web23Input
                  placeholder={t("Add here")}
                  value={custom}
                  onChange={(e) => {
                    setCustomLink((prev) =>
                      prev.map((item, idx) => {
                        if (idx === index) return e.target.value;
                        else return item;
                      })
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <Web23Button
            size="sm"
            variant="third"
            text={t("Add another link") || "Add another link"}
            onClick={() => setCustomLink((prev) => prev.concat(""))}
          />
          <Web23Button
            size="sm"
            text={t("Save") || "Save"}
            onClick={async () => {
              setCustomLink((prev) => prev.filter((item) => item.length));
              setProfileLink({
                twitter: twitterLink,
                facebook: facebookLink,
                customLink: customLink.filter((item) => item.length),
                instagram: instagramLink,
              });
              setShowLink(false);

              await axios({
                method: "post",
                url: API_SMART_ENDPOINT_URL + "/account/editIntro",
                data: {
                  user_id: currentUser.smartUid,
                  website: instagramLink,
                  twitter: twitterLink,
                  links: customLink.filter((item) => item.length),
                },
              });
            }}
          />
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Post") || "Post"}
        show={showPost}
        setShow={setShowPost}
      >
        <div
          className="flex items-center justify-between p-3 mt-4 mb-4 bg-grey-900 rounded-xl active:bg-grey-800"
          onClick={() => {
            setShowPost(false);
            setShowPostNFT(true);
          }}
        >
          <div className="flex items-center gap-3">
            <div>
              <NFTSVG className="stroke-current fill-transparent text-lime-500" />
            </div>
            <div>
              <p className="text-lime-500 font-bold text-xl py-[2px]">NFT</p>
              <p className="text-xs font-bold text-grey-50">
                {t("Add from wallet or Mint New")}
              </p>
            </div>
          </div>
          <div>
            <ArrowSVG className="-rotate-90 fill-grey-400" />
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-around px-2 py-3 border border-yellow-600 rounded-xl">
            <div
              onClick={() => {
                setShowPost(false);
                setTimeout(
                  () => goTo(PostMediaPage, { mediaType: "photo" }),
                  300
                );
              }}
            >
              <div className="flex justify-center mb-2">
                <PhotoRedSVG />
              </div>
              <p className="text-base font-bold text-grey-50">{t("Photo")}</p>
            </div>
            <div
              onClick={() => {
                setShowPost(false);
                setTimeout(
                  () => goTo(PostMediaPage, { mediaType: "audio" }),
                  300
                );
              }}
            >
              <div className="flex justify-center mb-2">
                <AudioTrackSVG />
              </div>
              <p className="text-base font-bold text-grey-50">{t("Audio")}</p>
            </div>
            <div
              onClick={() => {
                setShowPost(false);
                setTimeout(
                  () => goTo(PostMediaPage, { mediaType: "video" }),
                  300
                );
              }}
            >
              <div className="flex justify-center mb-2">
                <VideoSVG />
              </div>
              <p className="text-base font-bold text-grey-50">{t("Video")}</p>
            </div>
            <div
              onClick={() => {
                setShowPost(false);
                setTimeout(
                  () => goTo(PostMediaPage, { mediaType: "article" }),
                  300
                );
              }}
            >
              <div className="flex justify-center mb-2">
                <ArticleSVG />
              </div>
              <p className="text-base font-bold text-grey-50">{t("Article")}</p>
            </div>
          </div>
        </div>
      </Web23Popup>
      <Web23Popup title="Post NFT" show={showPostNFT} setShow={setShowPostNFT}>
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          <div
            className="px-3 py-[10px] flex items-center justify-between border-b rounded-t-xl border-grey-800 active:bg-grey-800"
            onClick={() => goTo(LoadNFTPage)}
          >
            <div className="py-1">
              <p className="font-bold text-base text-grey-50 mb-[2px]">
                {t("Add from Wallet")}
              </p>
              <p className="text-xs font-bold text-grey-400">
                {t("All your real transactions here")}
              </p>
            </div>
            <div>
              <ArrowSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
          <div
            className="px-3 py-[10px] flex items-center rounded-b-xl justify-between active:bg-grey-800"
            onClick={() => goTo(CreatePostNFT)}
          >
            <div className="py-1">
              <p className="font-bold text-base text-grey-50 mb-[2px]">
                {t("Create New")}
              </p>
              <p className="text-xs font-bold text-grey-400">
                {t("Only for $0.5 in HBAR fees")}
              </p>
            </div>
            <div>
              <ArrowSVG className="-rotate-90 fill-grey-400" />
            </div>
          </div>
        </div>
      </Web23Popup>
      <Web23Popup title="Coupons" show={showCoupon} setShow={setShowCoupon}>
        <div className="my-4 bg-grey-900 rounded-xl">
          <div className="px-3 py-[10px] flex items-center justify-between">
            <p
              className="text-base font-bold text-grey-50"
              onClick={() => setCouponType(false)}
            >
              {t("Fans can claim a free token")}
            </p>
            {!couponType && (
              <div>
                <CircleCheckSVG className="fill-lime-500" />
              </div>
            )}
          </div>
          {!couponType && (
            <div className="px-3 pb-4 border-b border-grey-800">
              <div className="w-[200px]">
                <Web23Input
                  placeholder={t("Token Discount")}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
            </div>
          )}
          <div
            className={`px-3 py-[10px] flex items-center justify-between ${
              !couponType ? "rounded-b-xl" : "rounded-none"
            }`}
          >
            <p
              className="text-base font-bold text-grey-50"
              onClick={() => setCouponType(true)}
            >
              {t("Fans can’t claim free tokens")}
            </p>
            {couponType && (
              <div>
                <CircleCheckSVG className="fill-lime-500" />
              </div>
            )}
          </div>
          {couponType && (
            <div className="px-3 pb-4">
              <div className="w-[200px]">
                <Web23Input
                  placeholder={t("Token Discount")}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mb-8">
          <Web23Button
            size="sm"
            text="Save"
            onClick={() => setShowCoupon(false)}
          />
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Donations") || "Donations"}
        show={showDonation}
        setShow={setShowDonation}
      >
        <div className="my-4 bg-grey-900 rounded-xl">
          <div
            className="px-3 py-[10px] border-b border-grey-800 flex items-center justify-between rounded-t-xl active:bg-grey-800"
            onClick={() => setCouponType(false)}
          >
            <p className="text-base font-bold text-grey-50">
              {t("Fans can donate")}
            </p>
            {!couponType && (
              <div>
                <CircleCheckSVG className="fill-lime-500" />
              </div>
            )}
          </div>
          <div
            className="px-3 py-[10px] flex items-center justify-between rounded-b-xl active:bg-grey-800"
            onClick={() => setCouponType(true)}
          >
            <p className="text-base font-bold text-grey-50">
              {t("Fans can’t donate")}
            </p>
            {couponType && (
              <div>
                <CircleCheckSVG className="fill-lime-500" />
              </div>
            )}
          </div>
        </div>
        <div className="mb-8">
          <Web23Button
            text={t("Save") || "Save"}
            size="sm"
            onClick={() => setShowDonation(false)}
          />
        </div>
      </Web23Popup>

      {ToasterBox}
    </>
  );
};

export default SmartSetupPage;
