import React, { useContext, useState, useEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import { CreateMnemonic, CreateWallet } from "src/pages/wallet";
import { RecoveryWallet } from "src/pages/wallet";

import {
  Web23Popup,
  Web23Input,
  Web23Avatar,
  Web23Button,
  Web23ColorPicker,
} from "..";

import { getBorderColorSchema } from "src/utility/colorSchema";
import { initialSettings, SettingContext, UserData } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import useToast from "src/utility/useToast";

import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as EditSVG } from "src/assets/icons/edit.svg";
import { ReactComponent as AddSVG } from "src/assets/icons/add_circle.svg";
import { ReactComponent as DownloadSVG } from "src/assets/icons/download.svg";
import { ReactComponent as ContentCopySVG } from "src/assets/icons/content_copy.svg";

type IWeb23ChooseWallet = {
  showWalletList: boolean;
  setShowWalletList: (param: boolean) => void;
  showEditWallet: boolean;
  setShowEditWallet: (param: boolean) => void;
  showNetType: boolean;
  setShowNetType: (param: boolean) => void;
  extraOpt?: () => void;
};

const Web23ChooseWallet: React.FC<IWeb23ChooseWallet> = ({
  showWalletList,
  setShowWalletList,
  showEditWallet,
  setShowEditWallet,
  showNetType,
  setShowNetType,
  extraOpt = () => {},
}) => {
  const { settings, saveSettings } = useContext(SettingContext);
  const [currentUser, setCurrentUser] = useState<UserData>({
    ...initialSettings.userData[0],
  });
  const [walletName, setWalletName] = useState<string>("");
  const [color, setColor] = useState<string>("lime");
  const [type, setType] = useState<"initial" | "icon">("initial");
  const { ToasterBox, showToast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentUser(getSelectedUser(settings?.userData, settings.selectedUser));
  }, [settings]);

  return (
    <>
      <Web23Popup
        show={showWalletList}
        setShow={setShowWalletList}
        title={t("Wallets") || "Wallets"}
      >
        <>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <div className="px-3 pt-[18px]">
              <span className="text-sm font-bold text-grey-200">
                {t("Your wallets")}
              </span>
            </div>
            <div className="max-h-[210px] overflow-y-auto">
              {settings?.userData?.map((item, index) => (
                <div
                  key={`${item.userName}_${index}`}
                  className={`active:bg-grey-800 rounded-b-xl ${
                    index < (settings?.userData?.length || 1) - 1 &&
                    "border-b border-b-grey-800 rounded-b-none"
                  }`}
                  onClick={() => {
                    saveSettings({
                      ...settings,
                      selectedUser: item.accountId,
                    });
                  }}
                >
                  <div className="pl-3 py-[10px] pr-6 justify-between flex items-center">
                    <div className="flex items-center gap-6">
                      <Web23Avatar
                        name={item.userName}
                        type={item.type}
                        color={item.themeColor}
                      />
                      <div className="w-[96px] flex flex-col gap-[2px] font-bold py-1">
                        <span className="overflow-hidden text-base truncate whitespace-nowrap text-grey-50">
                          {item.userName}
                        </span>
                        <span className="overflow-hidden text-xs truncate whitespace-nowrap text-grey-400">
                          {item.accountId}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {currentUser.accountId === item.accountId && (
                        //ele.net === selected.net
                        <CircleCheckSVG className="text-transparent bg-transparent stroke-current fill-lime-500" />
                      )}
                      <div
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setShowWalletList(false);
                          setShowNetType(true);
                          setWalletName(settings.userData![index].userName);
                          setColor(settings.userData![index].themeColor);
                          setType(settings.userData![index].type);
                          saveSettings({
                            ...settings,
                            selectedUser: item.accountId,
                          });
                        }}
                        className="fill-grey-400 active:fill-grey-200"
                      >
                        <EditSVG />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8 bg-grey-900 rounded-xl">
            <div
              className="cursor-pointer active:bg-grey-800 rounded-t-xl"
              onClick={() => {
                saveSettings({
                  ...settings,
                  selectedUser: settings.selectedUser,
                });
                goTo(CreateMnemonic);
              }}
            >
              <div className="flex items-center gap-3 px-3 py-4 text-base font-bold border-b border-b-grey-800 text-grey-50">
                <AddSVG className="fill-grey-400" />
                <span>{t("Create new wallet")}</span>
              </div>
            </div>
            <div
              className="cursor-pointer active:bg-grey-800 rounded-b-xl"
              onClick={() => goTo(RecoveryWallet)}
            >
              <div className="flex items-center gap-3 px-3 py-4 text-base font-bold text-grey-50">
                <DownloadSVG className="fill-grey-400" />
                <span>{t("Import an existing wallet")}</span>
              </div>
            </div>
          </div>
        </>
      </Web23Popup>

      <Web23Popup
        title={t("Edit Wallet") || "Edit Wallet"}
        show={showEditWallet}
        setShow={setShowEditWallet}
      >
        <div className="pb-6">
          <div className="bg-grey-900 rounded-xl pt-4 pb-[10px] mb-4">
            <div className="flex justify-center mb-3">
              <Web23Avatar
                name={walletName}
                color={color}
                size="lg"
                type={type}
              />
            </div>
            <div className="flex justify-center mb-5">
              <div
                className="flex px-3 py-2 bg-grey-800 gap-1 items-center w-[134px] rounded-3xl active:bg-grey-700"
                onClick={() => {
                  showToast(t("Copied to clipboard"));
                  navigator.clipboard.writeText(currentUser.accountId || "");
                }}
              >
                <span className="block overflow-hidden text-sm font-bold truncate text-grey-50 whitespace-nowrap">
                  {currentUser.accountId}
                </span>
                <ContentCopySVG className="fill-grey-50" />
              </div>
            </div>
            <div className="px-3">
              <Web23Input
                placeholder={t("Wallet name")}
                limit={32}
                value={walletName}
                onChange={(e) => {
                  if (e.target.value.length > 31)
                    setWalletName((prev) => e.target.value.slice(0, 32));
                  else setWalletName((prev) => e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <span className="font-bold text-sm text-grey-200 block pt-[18px] pl-3">
              {t("Wallet Customization")}
            </span>
            <div className="px-6 py-[10px] flex justify-between">
              <div
                className={`flex gap-2 items-center px-2 py-1 border-2 rounded-xl active:bg-grey-800 ${
                  type === "initial"
                    ? getBorderColorSchema(color)
                    : "border-transparent"
                }`}
                onClick={() => {
                  setType("initial");
                }}
              >
                <Web23Avatar
                  name={walletName || "Wallet"}
                  color={color || "lime"}
                  type="initial"
                />
                <div className="py-1 font-bold">
                  <span className="text-grey-50 text-base block mb-[2px]">
                    {t("Initial")}
                  </span>
                  <span className="block text-xs text-grey-400">
                    {t("Character")}
                  </span>
                </div>
              </div>
              <div
                className={`flex gap-2 items-center px-2 py-1 border-2 rounded-xl active:bg-grey-800 ${
                  type === "icon"
                    ? getBorderColorSchema(color)
                    : "border-transparent"
                }`}
                onClick={() => setType("icon")}
              >
                <Web23Avatar
                  name={currentUser.userName}
                  color={color}
                  type="icon"
                />
                <div className="py-1 font-bold">
                  <span className="text-grey-50 text-base block mb-[2px]">
                    {t("Icon")}
                  </span>
                  <span className="block text-xs text-grey-400 whitespace-nowrap">
                    {t("Wallet Icon")}
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-grey-800" />
            <div className="pl-[14px] pr-[26px] py-[10px]">
              <Web23ColorPicker
                value={color || "lime"}
                setValue={(newColor) => setColor(newColor)}
              />
            </div>
          </div>
          <Web23Button
            text={t("Save changes") || "Save changes"}
            onClick={() => {
              showToast(t("Successfully saved"));
              setTimeout(() => {
                const updateUser = settings.userData?.map((item, index) => {
                  const res = item;
                  if (item.accountId === settings.selectedUser) {
                    res.userName = walletName;
                    res.themeColor = color;
                    res.type = type;
                  }
                  return res;
                });

                saveSettings({ ...settings, userData: updateUser });
                setShowEditWallet(false);
              }, 1000);
            }}
          />

          <div className="absolute top-[14px] right-6">
            <Web23Button
              text={t("Delete") || "Delete"}
              className="px-6 py-3"
              variant="danger"
              onClick={() => {
                const updatedUser = settings.userData;
                if (updatedUser?.length && updatedUser.length > 0) {
                  if (updatedUser?.length === 1) {
                    saveSettings({
                      ...settings,
                      userData: initialSettings.userData,
                      selectedUser: "",
                    });
                    goTo(CreateWallet);
                  } else
                    saveSettings({
                      ...settings,
                      userData: updatedUser?.filter(
                        (item, index) =>
                          item.accountId !== settings.selectedUser
                      ),
                      selectedUser: updatedUser?.filter(
                        (item, index) =>
                          item.accountId !== settings.selectedUser
                      )[0].accountId,
                    });
                  showToast(t("Successfully deleted"));
                }

                setTimeout(() => {
                  setShowEditWallet(false);
                }, 300);
              }}
            />
          </div>
        </div>
      </Web23Popup>

      <Web23Popup
        title={t("Network") || "Network"}
        show={showNetType}
        setShow={setShowNetType}
      >
        <div className="mb-8 rounded-xl bg-grey-900">
          <div
            className="py-[10px] border-b border-b-grey-800 active:bg-grey-800 rounded-t-xl"
            onClick={() => {
              saveSettings({
                ...settings,
                userData: settings.userData?.map((item) => {
                  const res = item;
                  if (item.accountId === settings.selectedUser) {
                    res.net = true;
                  }
                  return res;
                }),
              });
              extraOpt();
              setTimeout(() => {
                setShowNetType(false);
                setShowEditWallet(true);
              }, 300);
            }}
          >
            <div className="flex items-center justify-between px-3 pr-6">
              <div className="py-1 font-bold">
                <span className="block text-base text-grey-50 mb-[2px]">
                  Mainnet
                </span>
                <span className="block text-xs text-grey-400">
                  {t("All your real transactions here")}
                </span>
              </div>
              {settings?.userData?.filter(
                (item) => item.accountId === settings.selectedUser
              )[0].net && <CircleCheckSVG className="fill-lime-500" />}
            </div>
          </div>
          <div
            className="py-[10px] px-3 pr-6 flex justify-between items-center active:bg-grey-800 rounded-b-xl"
            onClick={() => {
              setTimeout(() => {
                saveSettings({
                  ...settings,
                  userData: settings.userData?.map((item) => {
                    const res = item;
                    if (item.accountId === settings.selectedUser) {
                      res.net = false;
                    }
                    return res;
                  }),
                });
                extraOpt();
                setShowNetType(false);
                setShowEditWallet(true);
              }, 300);
            }}
          >
            <div className="py-1 font-bold">
              <span className="block text-base text-grey-50 mb-[2px]">
                Testnet
              </span>
              <span className="block text-xs text-grey-400">
                {t("Used for testing only")}
              </span>
            </div>
            {!settings?.userData?.filter(
              (item) => item.accountId === settings.selectedUser
            )[0].net && <CircleCheckSVG className="fill-lime-500" />}
          </div>
        </div>
      </Web23Popup>

      {ToasterBox}
    </>
  );
};

export default Web23ChooseWallet;
