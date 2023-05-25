import React, { useState, useContext, useEffect, useRef } from "react";
import { goTo } from "react-chrome-extension-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

import DashboardNFT from ".";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import {
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23ChooseWallet,
  Web23TextArea,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";
import useToast from "src/utility/useToast";

import { PINATA } from "src/config";

import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CollectionSVG } from "src/assets/icons/collections.svg";
import { ReactComponent as LinkSVG } from "src/assets/icons/link.svg";
import { ReactComponent as AltTextSVG } from "src/assets/icons/alt-text.svg";
import { ReactComponent as CircleCheckSVG } from "src/assets/icons/check_circle.svg";
import { ReactComponent as DeleteSVG } from "src/assets/icons/delete.svg";
import { ReactComponent as ArrowSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CompleteSVG } from "src/assets/icons/complete.svg";

const CreateNFT: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [showSupply, setShowSupply] = useState<boolean>(false);
  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const [showAttributes, setShowAttributes] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [attributes, setAttributes] = useState<
    { name: string; value: string }[]
  >([{ name: "", value: "" }]);
  const [editAttributes, setEditAttributes] = useState<
    { name: string; value: string }[]
  >([{ name: "", value: "" }]);
  const [supply, setSupply] = useState<{
    amount: string;
    mode: "single" | "multiple";
  }>({ amount: "", mode: "single" });
  const [more, setMore] = useState<string>("");
  const [additional, setAdditional] = useState<{
    collection: string;
    external: string;
    alternate: string;
  }>({ collection: "", external: "", alternate: "" });
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();
  const [memo, setMemo] = useState<string>("");
  const [imgHash, setImgHash] = useState<string>("");
  const [isUploading, setIsUploading] = useState<{
    state: string;
    percent: number;
  }>({ state: "pending", percent: 0 });
  const progressRef = useRef<HTMLDivElement>(null);
  const { ToasterBox, showToast } = useToast();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = async (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const intervalId = setInterval(() => {
      setIsUploading((prev) => {
        const num = Math.random() * 30;
        if (progressRef.current)
          progressRef.current.style.width =
            prev.percent + num > 90
              ? "94%"
              : (prev.percent + num).toString() + "%";
        return {
          ...prev,
          state: "going",
          percent:
            prev.percent + num > 90 ? 94 : Math.floor(prev.percent + num),
        };
      });
    }, 300);
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

    clearInterval(intervalId);
    if (progressRef.current) progressRef.current.style.width = "100%";
    setIsUploading({ state: "going", percent: 100 });
    setTimeout(() => {
      setSelectedFile(e.target.files[0]);
      setImgHash(uploadFile.data.IpfsHash);
      setIsUploading({ state: "pending", percent: 0 });
    }, 500);
  };

  return (
    <>
      <PageContainer loading={loading}>
        <PageTitle
          title={t("Create NFT") || "Create NFT"}
          onClick={() => goTo(DashboardNFT)}
        />
        <PageContent className="h-auto">
          <div className="my-4 bg-grey-900 rounded-xl">
            <p className="pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm">
              {t("Upload File")}
            </p>
            <div className="px-3 py-2">
              {!preview ? (
                <div className="p-4 border border-dashed border-grey-800 min-h-[120px] relative">
                  {isUploading.state !== "pending" ? (
                    <div className="absolute top-0 left-0 w-full h-full bg-transparent">
                      <div
                        className="bg-[#3C8725] w-0 h-full flex justify-center items-center transition-all duration-300"
                        ref={progressRef}
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
                        <p className="text-base text-grey-50 mb-2 text-center">
                          {t("Uploading") + "..."}
                        </p>
                        <p className="text-xs text-white text-center">
                          {isUploading.percent.toString() + "%"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <input
                          type="file"
                          onChange={onSelectFile}
                          className="hidden"
                          id="upload_img"
                        />
                        <label
                          className="mt-1 mb-2 text-base font-bold text-center cursor-pointer text-grey-50 active:text-grey-200"
                          htmlFor="upload_img"
                        >
                          {t("Click to upload a file")}
                        </label>
                      </div>
                      <p className="mb-1 text-xs font-bold text-center px-9 text-grey-600">
                        {t("File types supported") +
                          ": JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, etc,. " +
                          t("Max size") +
                          ": 100 MB"}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
                    <img
                      width="120px"
                      height="120px"
                      alt="nft"
                      src={preview}
                      className="block rounded-[32px]"
                    />
                  </div>
                  <p
                    className="py-1 text-sm font-bold text-center text-white cursor-pointer"
                    onClick={() => {
                      setSelectedFile(undefined);
                      setPreview("");
                    }}
                  >
                    {t("Re-upload file")}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="pb-4 mb-4 bg-grey-900 rounded-xl">
            <p className="pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm">
              {t("Basic Details")}
            </p>
            <div className="flex flex-col gap-4 px-3 mt-3">
              <Web23Input
                placeholder={t("Enter NFT Title")}
                value={title}
                className="border border-grey-800 outline-1"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div onClick={() => setShowSupply(true)}>
                <Web23Input
                  placeholder={t("Choose Supply")}
                  value={supply.amount}
                  onChange={(e) =>
                    setSupply({ ...supply, amount: e.target.value })
                  }
                />
              </div>
              <Web23TextArea
                placeholder={
                  t("Tell us more about it") || "Tell us more about it"
                }
                value={more}
                rows={5}
                onChange={(e) => setMore(e.target.value)}
                className="border border-grey-800 outline-1"
              />
            </div>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <p className="pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm">
              {t("Choose Wallet")}
            </p>
            <div
              className="px-3 py-[10px] flex justify-between items-center active:bg-grey-800 rounded-b-xl"
              onClick={() => setShowWalletList(true)}
            >
              <div className="flex items-center gap-3">
                <Web23Avatar
                  name={currentUser.userName}
                  color={currentUser.themeColor}
                  type={currentUser.type}
                />
                <div className="py-1 font-bold">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {currentUser.userName}
                  </p>
                  <p className="text-xs text-grey-400">
                    {currentUser.accountId}
                  </p>
                </div>
              </div>
              <div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <p className="pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm">
              {t("Additional Details")}
            </p>
            <div
              className="px-3 py-[10px] flex justify-between items-center border-b border-b-grey-800 active:bg-grey-800"
              onClick={() => setShowAdditional(true)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-grey-800 w-[44px] h-[44px] rounded-full flex items-center justify-center">
                  <CollectionSVG />
                </div>
                <div className="py-1 font-bold">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("Collection")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {additional.collection || "Not added yet"}
                  </p>
                </div>
              </div>
              <div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
            <div
              className="px-3 py-[10px] flex justify-between items-center border-b border-b-grey-800 active:bg-grey-800"
              onClick={() => setShowAdditional(true)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-grey-800 w-[44px] h-[44px] rounded-full flex items-center justify-center">
                  <LinkSVG className="fill-[#FFCE0A]" />
                </div>
                <div className="py-1 font-bold">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("External Link")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {additional.external || t("Not added yet")}
                  </p>
                </div>
              </div>
              <div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
            <div
              className="px-3 py-[10px] flex justify-between items-center rounded-b-xl active:bg-grey-800"
              onClick={() => setShowAdditional(true)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-grey-800 w-[44px] h-[44px] rounded-full flex items-center justify-center">
                  <AltTextSVG />
                </div>
                <div className="py-1 font-bold">
                  <p className="text-base text-grey-50 mb-[2px]">
                    {t("Alternate Text")}
                  </p>
                  <p className="text-xs text-grey-400">
                    {additional.alternate || t("Not added yet")}
                  </p>
                </div>
              </div>
              <div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
          </div>
          <div className="mb-4 bg-grey-900 rounded-xl">
            <p className="pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm">
              {t("Attributes")}
            </p>
            <div className="p-4 font-bold border-b border-b-grey-800">
              {attributes.length > 0 &&
              attributes[attributes.length - 1].name !== "" &&
              attributes[attributes.length - 1].value !== "" ? (
                <div className="flex flex-wrap w-full gap-2">
                  {attributes.map((item, index) => (
                    <div
                      className="p-3 border border-white border-opacity-30"
                      key={`Show_Attributes_${index}`}
                    >
                      <p className="mb-1 text-xs font-bold text-grey-400">
                        {item.name}
                      </p>
                      <p className="text-base font-medium text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mt-1 mb-2 text-base text-center text-grey-50">
                    {t("Not added yet")}
                  </p>
                  <p className="px-10 mb-1 text-xs text-center text-grey-600">
                    {t("Add attributes and their respective percentages")}
                  </p>
                </>
              )}
            </div>
            <div
              className="flex items-center justify-between p-4 rounded-b-xl active:bg-grey-800"
              onClick={() => {
                setEditAttributes(attributes);
                setShowAttributes(true);
              }}
            >
              <p className="text-base font-bold text-white">
                {t("Add Attributes")}
              </p>
              <div>
                <ArrowDownSVG className="-rotate-90 fill-grey-400" />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <Web23Button
              size="sm"
              text={t("Continue") || "Continue"}
              onClick={() => {
                if (
                  title === "" ||
                  !supply ||
                  more === "" ||
                  additional.collection === "" ||
                  additional.external === "" ||
                  additional.alternate === "" ||
                  attributes.length === 0 ||
                  imgHash === ""
                ) {
                  showToast(t("Invalid Operation"), "error");
                } else setShowReview(true);
              }}
            />
          </div>
        </PageContent>
      </PageContainer>
      <Web23Popup
        title={t("Choose Supply") || "Choose Supply"}
        show={showSupply}
        setShow={setShowSupply}
      >
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          <div
            className="px-3 py-[10px] flex items-center justify-between border-b border-b-grey-800 active:bg-grey-800 rounded-t-xl"
            onClick={() => setSupply({ ...supply, mode: "single" })}
          >
            <div className="py-1 font-bold">
              <p className="text-base text-grey-50 mb-[2px]">{t("Unique")}</p>
              <p className="text-xs text-grey-400">{t("Single")}</p>
            </div>
            {supply.mode === "single" && (
              <div>
                <CircleCheckSVG className="fill-lime-500" />
              </div>
            )}
          </div>
          <div
            className="px-3 py-[10px] flex items-center justify-between active:bg-grey-800 rounded-b-xl"
            onClick={() => setSupply({ ...supply, mode: "multiple" })}
          >
            <div className="py-1 font-bold">
              <p className="text-base text-grey-50 mb-[2px]">{t("Multiple")}</p>
              <p className="text-xs text-grey-400">{t("Multiple copies")}</p>
            </div>
            {supply.mode === "multiple" && (
              <div>
                <CircleCheckSVG className="fill-lime-500" />
              </div>
            )}
          </div>
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Additional Details") || "Additional Details"}
        show={showAdditional}
        setShow={setShowAdditional}
      >
        <div className="flex flex-col gap-4 px-3 py-4 my-4 mb-8 bg-grey-900 rounded-xl">
          <Web23Input
            placeholder={t("Enter Collection Name")}
            value={additional.collection}
            onChange={(e) =>
              setAdditional({ ...additional, collection: e.target.value })
            }
          />
          <div className="relative">
            <Web23Input
              placeholder="External Link"
              className="pr-[60px]"
              value={additional.external}
              onChange={(e) =>
                setAdditional({ ...additional, external: e.target.value })
              }
            />
            <p
              className="cursor-pointer absolute text-sm font-medium -translate-y-1/2 right-5 top-[24px] text-lime-500 active:text-green-500"
              onClick={async () => {
                const data = await navigator.clipboard.readText();
                setAdditional({
                  ...additional,
                  external: data,
                });
              }}
            >
              {t("PASTE")}
            </p>
          </div>
          <Web23Input
            placeholder="Alternate Text"
            value={additional.alternate}
            onChange={(e) =>
              setAdditional({ ...additional, alternate: e.target.value })
            }
          />
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Attributes") || "Attributes"}
        show={showAttributes}
        setShow={setShowAttributes}
      >
        {editAttributes.map((item, index) => (
          <div
            className="py-4 my-4 bg-grey-900 rounded-xl"
            key={`Attributes_${index}`}
          >
            <div className="flex items-center justify-between px-5 pb-3">
              <p className="text-sm font-bold text-grey-200">
                {t("Attribute") + (index + 1)}
              </p>
              <div
                className="fill-red-500 active:fill-red-800"
                onClick={() => {
                  setEditAttributes((prev) =>
                    prev.filter((_, idx) => idx === 0 || index !== idx)
                  );
                }}
              >
                <DeleteSVG />
              </div>
            </div>
            <div className="flex gap-4 px-3">
              <div>
                <Web23Input
                  placeholder={t("Name")}
                  value={editAttributes[index].name}
                  onChange={(e) => {
                    const newAttributes = [...editAttributes];
                    newAttributes[index].name = e.target.value;
                    setEditAttributes(newAttributes);
                  }}
                />
              </div>
              <Web23Input
                placeholder={t("Value")}
                value={editAttributes[index].value}
                onChange={(e) => {
                  const newAttributes = [...editAttributes];
                  newAttributes[index].value = e.target.value;
                  setEditAttributes(newAttributes);
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4 mb-8">
          <Web23Button
            text={t("Add another") || "Add another"}
            size="sm"
            variant="third"
            onClick={() =>
              setEditAttributes((prev) => prev.concat({ name: "", value: "" }))
            }
          />
          <Web23Button
            text={t("Save") || "Save"}
            size="sm"
            onClick={() => {
              const resAttribute = editAttributes.filter(
                (item) => item.name !== "" && item.value !== ""
              );
              setAttributes(resAttribute);
              setShowAttributes(false);
            }}
          />
        </div>
      </Web23Popup>
      <Web23Popup
        title={t("Review NFT Creation") || "Review NFT Creation"}
        show={showReview}
        setShow={setShowReview}
      >
        <div className="my-4 bg-grey-900 rounded-xl">
          <p className="pt-[18px] px-3 pb-[2px] font-bold text-sm text-grey-200">
            {t("Creating")}
          </p>
          <div className="px-3 py-[10px] border-b border-b-grey-800 flex gap-3 items-center">
            <div className="w-10 h-10 bg-grey-800">
              <img src={preview} alt="nft preview" width="40px" height="40px" />
            </div>
            <div className="py-[2px] font-bold">
              <p className="mb-1 text-base text-grey-50">{title}</p>
              <p className="text-xs text-grey-400">{currentUser.accountId}</p>
            </div>
          </div>
          <div className="px-3 py-[10px] rounded-b-xl flex gap-3 items-center">
            <Web23Avatar
              name={currentUser.userName}
              color={currentUser.themeColor}
              size="sm"
              type={currentUser.type}
            />
            <div className="py-[2px] font-bold">
              <p className="mb-1 text-base text-grey-50">
                {currentUser.userName}
              </p>
              <p className="text-xs text-grey-400">{currentUser.accountId}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <Web23Input
            placeholder={t("Add Memo (optional)")}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <div className="flex items-center justify-between px-3 py-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200">
            <span className="block">{t("Transaction Fees")}</span>
            <div className="flex items-center gap-4">
              <span className="block">ℏ0.5</span>
              <ArrowSVG className="rotate-180 fill-grey-400" />
            </div>
          </div>
          <Web23Button
            text={t("Confirm NFT creation") || "Confirm NFT creation"}
            onClick={async () => {
              try {
                setLoading(true);
                setShowReview(false);

                const data = {
                  name: title,
                  img: "ipfs://" + imgHash,
                  description: more,
                  collection: additional.collection,
                  external_link: additional.external,
                  alternate_text: additional.alternate,
                  attribute: attributes,
                };

                const config = {
                  method: "post",
                  url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                  maxBodyLength: Infinity,
                  headers: {
                    "Content-Type": "application/json",
                    pinata_api_key: `${PINATA.key}`,
                    pinata_secret_api_key: `${PINATA.secret}`,
                  },
                  data: data,
                };

                const meta = await axios(config);

                await apiHandler("create_nft", currentUser.token, {
                  accountId: currentUser.accountId,
                  net: currentUser.net,
                  memo,
                  priv: currentUser.privKey,
                  tokenName: title,
                  ipfsHash: meta.data.IpfsHash,
                });

                setLoading(false);
                setShowSuccess(true);

                setSelectedFile(undefined);
                setPreview("");
                setTitle("");
                setSupply({ amount: "", mode: "single" });
                setAdditional({ alternate: "", collection: "", external: "" });
                setMore("");
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </div>
      </Web23Popup>

      <Web23Popup
        title={t("Transaction Initiated") || "Transaction Initiated"}
        show={showSuccess}
        setShow={setShowSuccess}
      >
        <div className="flex justify-center mt-4 mb-3">
          <CompleteSVG />
        </div>
        <p className="mb-8 text-base font-medium text-center text-grey-200">
          {t(
            "Your transaction is initiated and will go through in a few minutes. We shall keep you updated."
          )}
        </p>
      </Web23Popup>

      <Web23ChooseWallet
        setShowEditWallet={setShowEditWallet}
        setShowNetType={setShowNetType}
        setShowWalletList={setShowWalletList}
        showEditWallet={showEditWallet}
        showNetType={showNetType}
        showWalletList={showWalletList}
      />

      {ToasterBox}
    </>
  );
};

export default CreateNFT;
