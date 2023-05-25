import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";

import SmartSetupPage from "../setup";
import SendGiftPage from "./send-gift";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Button, Web23Input } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as MoneySVG } from "src/assets/icons/attach_money_black.svg";
import PerksImg from "src/assets/png/perks.png";

const GiftTokenPage: React.FC<{
  name: string;
  value: number;
  amount: number;
  tokenId: string;
}> = ({ name, value, amount, tokenId }) => {
  const [supply, setSupply] = useState<string>("");
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  return (
    <PageContainer>
      <PageTitle
        title="Gift tokens"
        onClick={() => goTo(SmartSetupPage, { initialTab: 2 })}
      />
      <PageContent>
        <div className="flex items-center justify-center my-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-grey-900">
            <MoneySVG />
          </div>
        </div>
        <p className="mb-6 text-base font-bold text-center text-grey-200">
          How much do you want to top-up?
        </p>
        <div className="flex justify-center mb-[42px]">
          <div className="flex flex-col gap-4 w-[288px]">
            <Web23Input
              placeholder="Supply"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
            />
          </div>
        </div>
        <div className="relative p-4 mb-6 overflow-hidden bg-indigo-800 border border-indigo-300 rounded-xl">
          <div className="flex items-end justify-between mb-2">
            <p className="text-sm font-bold text-white opacity-70">{name}</p>
            <div>
              <img src={PerksImg} alt="perks" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-black text-white text-[48px]">{amount}</p>
              <p className="mb-4 text-base font-bold text-white">Tokens</p>
              <p className="text-xs font-bold text-white opacity-50">
                Per token: ${value}
              </p>
            </div>
            <p className="text-xs font-bold text-white opacity-50 [writing-mode:vertical-lr]">
              {currentUser.userName}
            </p>
          </div>
          <p className="absolute top-[96px] left-[-36px] font-black text-white opacity-10 text-[120px]">
            {name}
          </p>
        </div>
      </PageContent>
      <PageAction>
        <Web23Button
          text="Continue to Review"
          onClick={() => goTo(SendGiftPage, { name, value, amount, tokenId })}
        />
      </PageAction>
    </PageContainer>
  );
};

export default GiftTokenPage;
