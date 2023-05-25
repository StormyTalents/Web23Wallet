import React, { useState } from "react";
import { goTo } from "react-chrome-extension-router";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import { CreateWallet } from "src/pages/wallet";

import { Web23Button, Web23DomainTicker } from "src/components";

import { ReactComponent as Web23LogoSVG } from "src/assets/icons/logo_title.svg";
import { ReactComponent as GodaddySVG } from "src/assets/icons/GoDaddyLG.svg";
import { ReactComponent as DynadotSVG } from "src/assets/icons/Dynadot.svg";
import { ReactComponent as NameCheapSVG } from "src/assets/icons/NameCheap.svg";
import { ReactComponent as DomainSVG } from "src/assets/icons/Domain_md.svg";
import { ReactComponent as Web3DomainSVG } from "src/assets/icons/DomainWeb3_md.svg";
import { ReactComponent as NFTsMDSVG } from "src/assets/icons/NFTs_MD.svg";
import { ReactComponent as WebSVG } from "src/assets/icons/web.svg";
import { ReactComponent as AirSVG } from "src/assets/icons/air.svg";
import { ReactComponent as MoneySVG } from "src/assets/icons/attach_money_md.svg";
import NfgImg from "src/assets/icons/nft.png";
import NfgFooterImg from "src/assets/icons/nft_footer.png";
import WebsiteImg1 from "src/assets/icons/website_1.png";
import WebsiteImg2 from "src/assets/icons/website_2.png";

const SPLASH_0 = 0;
const SPLASH_1 = 1;
const SPLASH_2 = 2;

const SplashPage: React.FC = () => {
  const [nextSplash, setNextSplash] = useState<number>(SPLASH_0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { t } = useTranslation();

  return (
    <div>
      <div className="px-8 pt-6">
        <Web23LogoSVG />
      </div>
      {nextSplash === SPLASH_0 && (
        <div className="mt-[72px] mb-12">
          <Web23DomainTicker />
        </div>
      )}
      {nextSplash === SPLASH_0 && (
        <div className="flex items-center justify-center mb-[96px]">
          <GodaddySVG />
          <DynadotSVG />
          <NameCheapSVG />
        </div>
      )}
      {nextSplash === SPLASH_1 && (
        <div className="mt-[30px] mb-9">
          <div className="flex justify-center">
            <img src={NfgImg} alt="nft" />
          </div>
          <div className="flex justify-center mt-6">
            <img src={NfgFooterImg} alt="nft footer" />
          </div>
        </div>
      )}
      {nextSplash === SPLASH_2 && (
        <div className="mt-[68px] mb-[110px] [&_.slick-slider_.slick-list_.slick-track_.slick-slide]:flex [&_.slick-slider_.slick-list_.slick-track_.slick-slide]:justify-center">
          <Slider {...settings}>
            <div className="flex justify-center">
              <div>
                <img src={WebsiteImg1} alt="website1" />
              </div>
            </div>
            <div className="flex justify-center">
              <div>
                <img src={WebsiteImg2} alt="website2" />
              </div>
            </div>
          </Slider>
        </div>
      )}
      <div className="pb-8 bg-grey-900 rounded-t-2xl">
        <div className="px-6 pt-6">
          <div className="flex items-center gap-2 py-2 pl-3 pr-4">
            <div>
              {nextSplash === SPLASH_0 && <DomainSVG />}
              {nextSplash === SPLASH_1 && <NFTsMDSVG />}
              {nextSplash === SPLASH_2 && <WebSVG />}
            </div>
            <p className="text-base font-bold text-grey-50">
              {nextSplash === SPLASH_0 &&
                t("Integrate your Domains from leading providers")}
              {nextSplash === SPLASH_1 &&
                t("Mint NFTs at costs starting at $1.00 (paid in HBAR)")}
              {nextSplash === SPLASH_2 &&
                t("Create beautiful websites with  Smart Pages")}
            </p>
          </div>
        </div>
        <div className="px-6 pt-3">
          <div className="flex items-center gap-2 py-2 pl-3 pr-4">
            <div>
              {nextSplash === SPLASH_0 && <Web3DomainSVG />}
              {nextSplash === SPLASH_1 && <AirSVG />}
              {nextSplash === SPLASH_2 && <MoneySVG />}
            </div>
            <p className="text-base font-bold text-grey-50">
              {nextSplash === SPLASH_0 &&
                t("Get access to premium Web3 Domains from Web23")}
              {nextSplash === SPLASH_1 &&
                t("Lowest Carbon Footprint in the entire ecosystem")}
              {nextSplash === SPLASH_2 &&
                t("Build & grow a community and reward them with your token")}
            </p>
          </div>
        </div>
        <div className="px-6 mt-8">
          <Web23Button
            text={t("Continue") || "Continue"}
            variant="secondary"
            size="sm"
            onClick={() => {
              if (nextSplash < SPLASH_2) setNextSplash((prev) => (prev += 1));
              else goTo(CreateWallet);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
