import React, { useMemo } from "react";

import { getBGColorSchema } from "src/utility/colorSchema";

import { ReactComponent as WalletSVG } from "src/assets/icons/Wallet.svg";

const Web23Avatar: React.FC<{
  name: string;
  color: string;
  walletColor?: "black" | "white";
  size?: "sm" | "md" | "lg";
  type: "initial" | "icon";
}> = ({
  name,
  color = "yellow",
  walletColor = "black",
  size = "sm",
  type = "initial",
}) => {
  const avatarName = useMemo(() => {
    // return name.match(/\b(\w)/g)?.join("");
    return name?.charAt(0);
  }, [name]);
  return (
    <div
      className={`rounded-full flex justify-center items-center ${getBGColorSchema(
        color
      )} ${size === "sm" && "w-10 h-10"} ${size === "md" && "w-16 h-16"} ${
        size === "lg" && "w-[80px] h-[80px]"
      }`}
    >
      <p
        className={`font-base font-bold ${size === "md" && "text-2xl"} ${
          size === "lg" && "text-[32px] leading-10"
        }`}
      >
        {type === "initial" ? (
          avatarName
        ) : (
          <WalletSVG
            className={`${
              walletColor === "black" ? "fill-black" : "fill-white"
            }`}
          />
        )}
      </p>
    </div>
  );
};

export default Web23Avatar;
