import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import SetupSocialToken from "./setup";
import SuccessSocialTokenSetup from "./success";

import { PageAction, PageContainer, PageContent, PageTitle } from "src/layout";

import {
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { API_SMART_ENDPOINT_URL, PINATA } from "src/config";

import { ReactComponent as TitleSVG } from "src/assets/icons/title.svg";
import { ReactComponent as CheckSVG } from "src/assets/icons/check.svg";
import { ReactComponent as MoneySVG } from "src/assets/icons/attach_money_black.svg";
import { ReactComponent as TokenSVG } from "src/assets/icons/token_sm.svg";
import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";

const progressBar = ["Choose Name", "Set Supply & Value", "Final Confirmation"];

const SocialTokenSetupProcess: React.FC = () => {
  const [tab, setTab] = useState<number>(0);
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [tokenName, setTokenName] = useState<string>("");
  const [supply, setSupply] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <PageContainer loading={loading}>
        <PageTitle
          title={t("Setup Social tokens") || "Setup Social tokens"}
          onClick={() => goTo(SetupSocialToken)}
        />
        <PageContent className="px-0">
          <div className="flex justify-center py-2 mb-4 bg-grey-900">
            {progressBar.map((item, index) => (
              <div key={"progressBar_item_" + index}>
                <div className="flex justify-center">
                  <div
                    className={`relative flex items-center justify-center w-5 h-5 mb-2 rounded-full border ${
                      index === tab
                        ? "border-lime-500 bg-lime-500"
                        : index < tab
                        ? "bg-transparent border-lime-500"
                        : "bg-transparent border-grey-300"
                    }`}
                  >
                    <p
                      className={`font-medium text-medium after:h-[2px] after:left-[20px] after:w-[38px] after:absolute after:top-[8px] before:left-[-34px] before:h-[2px] before:w-[34px] before:absolute before:top-[8px] ${
                        index === 0
                          ? "first:before:content-none"
                          : "before:content-['']"
                      } ${
                        index === 2
                          ? "last:after:content-none"
                          : "after:content-['']"
                      } ${
                        index <= tab
                          ? "after:bg-lime-500 before:bg-lime-500 text-black"
                          : "after:bg-[#686868] before:bg-[#686868] text-grey-300"
                      }`}
                    >
                      {index < tab ? (
                        <CheckSVG className="fill-lime-500" />
                      ) : (
                        index + 1
                      )}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-center text-white w-[90px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-grey-900">
              {tab === 0 && <TitleSVG />}
              {tab === 1 && <MoneySVG />}
            </div>
          </div>
          <p className="mb-6 text-base font-bold text-center text-grey-200">
            {tab === 0 && "Choose Token Name"}{" "}
            {tab === 1 && "Set Supply and value for " + tokenName}
          </p>
          <div className="px-8">
            {tab === 0 && (
              <>
                <Web23Input
                  placeholder="Token Name"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
                <p className="mt-4 text-sm font-bold text-center text-grey-400">
                  {t(
                    "Token name should use 4-6 characters and should be alphanumeric only"
                  )}
                </p>
              </>
            )}
            {tab === 1 && (
              <div>
                <div className="flex flex-col gap-4">
                  <Web23Input
                    placeholder={t("Supply") || "Supply"}
                    value={supply}
                    onChange={(e) => setSupply(e.target.value)}
                  />
                  <Web23Input
                    placeholder={t("Value") || "Value"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <p className="mt-4 text-sm font-bold text-center text-grey-400">
                  Total value of your {tokenName} would be ${value || "0"} (~
                  {supply || "0"} HBAR)
                </p>
              </div>
            )}
          </div>
        </PageContent>
        <PageAction>
          <Web23Button
            text={t("Continue") || "Continue"}
            onClick={() => setTab((prev) => prev + 1)}
          />
        </PageAction>
      </PageContainer>
      <Web23Popup
        title={t("Review Transaction") || "Review Transaction"}
        show={tab === 2}
        setShow={() => {}}
      >
        <div className="mt-4 bg-grey-900 rounded-xl">
          <p className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200">
            {t("Creating")}
          </p>
          <div className="flex items-center gap-3 border-b border-grey-800 px-3 py-[10px] active:bg-grey-800">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full">
              <TokenSVG />
            </div>
            <div className="py-[2px]">
              <p className="mb-1 text-base font-bold text-grey-50 w-[220px] overflow-hidden truncate">
                {supply} tokens of {tokenName}
              </p>
              <p className="text-xs font-bold text-grey-400">
                {t("Total Value") + " = $"}
                {supply}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-b-xl px-3 py-[10px] active:bg-grey-800 mb-4">
            <Web23Avatar
              name={currentUser.userName}
              color={currentUser.themeColor}
              size="sm"
              type={currentUser.type}
            />
            <div className="py-[2px]">
              <p className="mb-1 text-base font-bold text-grey-50">
                {currentUser.userName}
              </p>
              <p className="text-xs font-bold text-grey-400">
                {currentUser.accountId}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-3 py-4 mb-4 border rounded-xl border-grey-800">
          <span className="block text-sm font-bold text-grey-200">
            {t("Transaction Fees")}
          </span>
          <div className="flex items-center gap-2">
            <span className="block text-sm font-bold text-grey-200">ℏ0.5</span>
            <ArrowDownSVG className="-rotate-180 fill-grey-400" />
          </div>
        </div>
        <div className="mb-8">
          <Web23Button
            text="Confirm transaction"
            onClick={async () => {
              try {
                setLoading(true);

                const config = {
                  method: "post",
                  url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                  headers: {
                    pinata_api_key: `${PINATA.key}`,
                    pinata_secret_api_key: `${PINATA.secret}`,
                    "Content-Type": "application/json",
                  },
                  data: JSON.stringify({
                    name: tokenName,
                    img: "ipfs/QmejFq6TRhDRmvUux7Kp7gGheNzJfbQUawGiUittcdEfg7",
                    symbol: "FT",
                    description: "web23 social token",
                    amount: supply,
                    chainName: "Hedera",
                  }),
                };

                const hash = await axios(config);

                const { data } = await axios({
                  method: "post",
                  url: API_SMART_ENDPOINT_URL + "socialToken/create",
                  data: {
                    user_id: currentUser.smartUid,
                    metadataHash: hash.data.IpfsHash,
                    metadata: {
                      name: tokenName,
                      img: "ipfs/QmejFq6TRhDRmvUux7Kp7gGheNzJfbQUawGiUittcdEfg7",
                      symbol: "FT",
                      description: "web23 social token",
                      amount: supply,
                      chainName: "Hedera",
                    },
                  },
                });

                setLoading(false);

                if (data?.data?.tokenId) {
                  goTo(SuccessSocialTokenSetup, {
                    tokenName: tokenName,
                    supply,
                    value,
                    name: currentUser.userName,
                  });
                }
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </div>
      </Web23Popup>
    </>
  );
};

export default SocialTokenSetupProcess;
