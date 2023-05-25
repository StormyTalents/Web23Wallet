import React from "react";

import { ReactComponent as Web23LogoSVG } from "src/assets/icons/logo.svg";

const Web23Logo: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center gap-2 mb-2">
        <div>
          <Web23LogoSVG />
        </div>
        <h1 className="text-green-500 font-bold leading-9 text-[28px] flex items-center">
          Web23
        </h1>
      </div>
      <p className="text-lime-500 text-center font-medium text-base">
        Super Wallet for Hedera
      </p>
    </div>
  );
};

export default Web23Logo;
