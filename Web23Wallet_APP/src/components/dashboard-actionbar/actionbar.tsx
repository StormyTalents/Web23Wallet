import React from "react";
import { goTo } from "react-chrome-extension-router";

import DashboardWallet from "src/pages/dashboard/wallet";
import DashboardDomain from "src/pages/dashboard/domain";
import DashboardHistory from "src/pages/dashboard/history";
import DashboardNFT from "src/pages/dashboard/nft";
import LoginSmartPage from "src/pages/dashboard/discover/login";

import { ReactComponent as WalletSVG } from "src/assets/icons/Wallet.svg";
import { ReactComponent as DomainSVG } from "src/assets/icons/Domains.svg";
import { ReactComponent as NFTSVG } from "src/assets/icons/NFTs.svg";
import { ReactComponent as HistorySVG } from "src/assets/icons/History.svg";
import { ReactComponent as CompassSVG } from "src/assets/icons/Compass.svg";

const WALLET = 0;
const DOMAIN = 1;
const NFT = 2;
const HISTORY = 3;
const COMPASS = 4;

const DashboardActionBar: React.FC<{ selected?: number }> = ({
  selected = 0,
}) => {
  return (
    <div className="flex items-center justify-between bg-grey-900">
      <div
        className={`p-5 cursor-pointer active:bg-grey-50 border-t border-transparent ${
          selected === WALLET && "border-lime-500"
        }`}
        onClick={() => goTo(DashboardWallet)}
      >
        <WalletSVG
          className={`stroke-current ${
            selected === WALLET
              ? " text-lime-500 fill-lime-500"
              : "text-grey-400 fill-grey-400"
          }`}
        />
      </div>
      <div
        className={`p-5 cursor-pointer active:bg-grey-50 border-t border-transparent ${
          selected === DOMAIN && "border-lime-500"
        }`}
        onClick={() => goTo(DashboardDomain)}
      >
        <DomainSVG
          className={`stroke-current ${
            selected === DOMAIN
              ? " text-lime-500 fill-transparent"
              : "text-grey-400 fill-transparent"
          }`}
        />
      </div>
      <div
        className={`p-5 cursor-pointer active:bg-grey-50 border-t border-transparent ${
          selected === NFT && "border-lime-500"
        }`}
        onClick={() => goTo(DashboardNFT)}
      >
        <NFTSVG
          className={`stroke-current ${
            selected === NFT
              ? " text-lime-500 fill-transparent"
              : "text-grey-400 fill-transparent"
          }`}
        />
      </div>
      <div
        className={`p-5 cursor-pointer active:bg-grey-50 border-t border-transparent ${
          selected === HISTORY && "border-lime-500"
        }`}
        onClick={() => goTo(DashboardHistory)}
      >
        <HistorySVG
          className={`stroke-current ${
            selected === HISTORY
              ? " text-lime-500 fill-transparent"
              : "text-grey-400 fill-transparent"
          }`}
        />
      </div>
      <div
        className={`p-5 cursor-pointer active:bg-grey-50 border-t border-transparent ${
          selected === COMPASS && "border-lime-500"
        }`}
        onClick={() => goTo(LoginSmartPage)}
      >
        <CompassSVG
          className={`stroke-current ${
            selected === COMPASS
              ? " text-lime-500 fill-transparent"
              : "text-grey-400 fill-transparent"
          }`}
        />
      </div>
    </div>
  );
};

export default DashboardActionBar;
