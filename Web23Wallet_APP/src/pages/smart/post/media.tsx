import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { goTo } from "react-chrome-extension-router";

import SmartSetupPage from "../setup";

import { PageContainer, PageTitle } from "src/layout";

import { Web23Button, Web23Input, Web23TextArea } from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { PINATA, API_SMART_ENDPOINT_URL } from "src/config";

import ImgAvatar from "src/assets/png/img.png";

type PostMediaPage = {
  mediaType: "photo" | "audio" | "video" | "article";
};

const PostMediaPage: React.FC<PostMediaPage> = ({ mediaType }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [copyright, setCopyright] = useState<string>();
  const [selectedFile, setSelectedFile] = useState();
  const [mediaHash, setMediaHash] = useState<string>("");
  const [isUploading, setIsUploading] = useState<{
    state: string;
    percent: number;
  }>({ state: "pending", percent: 0 });
  const progressRef = useRef<HTMLDivElement>(null);
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

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
      setMediaHash(uploadFile.data.IpfsHash);
      setIsUploading({ state: "pending", percent: 0 });
    }, 500);
  };

  return (
    <PageContainer loading={loading}>
      <PageTitle
        title={`Post ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`}
        onClick={() => goTo(SmartSetupPage)}
      />
      <PageContainer>
        <div className="h-full flex flex-col justify-between">
          <div>
            {mediaType !== "article" && (
              <div className="px-3">
                <div className="my-4 bg-grey-900 rounded-xl">
                  <p className="pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm">
                    Upload File
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
                                Uploading...
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
                                accept={
                                  mediaType === "photo"
                                    ? "image/*"
                                    : mediaType === "audio"
                                    ? "audio/*"
                                    : mediaType === "video"
                                    ? "video/*"
                                    : "image/*"
                                }
                                onChange={onSelectFile}
                                className="hidden"
                                id="upload_img"
                              />
                              <label
                                className="mt-1 mb-2 text-base font-bold text-center cursor-pointer text-grey-50 active:text-grey-200"
                                htmlFor="upload_img"
                              >
                                Click to upload a file
                              </label>
                            </div>
                            <p className="mb-1 text-xs font-bold text-center px-9 text-grey-600">
                              File types supported: JPG, PNG, GIF, SVG, MP4,
                              WEBM, MP3, WAV, etc,. Max size: 100 MB
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
                            src={mediaType === "photo" ? preview : ImgAvatar}
                            className="block rounded-[32px]"
                          />
                        </div>
                        <p
                          className="py-1 text-sm font-bold text-center text-white cursor-pointer"
                          onClick={() => setPreview("")}
                        >
                          Re-upload file
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="mx-3 pb-4 bg-grey-900 rounded-xl">
              <p className="pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm">
                Basic Details
              </p>
              <div className="flex flex-col gap-4 px-3 mt-3">
                <Web23TextArea
                  placeholder="Tell people about your photo..."
                  value={desc}
                  rows={8}
                  className="border border-grey-800 outline-1"
                  onChange={(e) => setDesc(e.target.value)}
                />
                {mediaType !== "article" && (
                  <Web23Input
                    placeholder="Add location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                )}
                {mediaType !== "article" && (
                  <Web23Input
                    placeholder="Add copyright"
                    value={copyright}
                    onChange={(e) => setCopyright(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 px-3 pb-8">
            <Web23Button
              text={`Post ${
                mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
              }`}
              onClick={async () => {
                try {
                  setLoading(true);
                  await axios.post(API_SMART_ENDPOINT_URL + "media/postMedia", {
                    user_id: currentUser.smartUid,
                    category: mediaType,
                    detail: desc,
                    location,
                    copyright,
                    content: mediaHash,
                  });
                  goTo(SmartSetupPage);
                  setLoading(false);
                } catch (e) {
                  setLoading(false);
                }
              }}
            />
          </div>
        </div>
      </PageContainer>
    </PageContainer>
  );
};

export default PostMediaPage;
