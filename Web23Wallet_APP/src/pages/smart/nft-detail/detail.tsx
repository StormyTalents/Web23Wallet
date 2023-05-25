import React, { useState, useContext } from "react";
import { goTo } from "react-chrome-extension-router";

import SmartSetupPage from "../setup";
import DetailPostViewDesktopPage from "./detail-desktop";
import CommentPage from "./comment";

import { PageContainer } from "src/layout";

import {
  Web23Button,
  Web23Input,
  Web23Modal,
  Web23Popup,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";

import { ReactComponent as ArrowBackSVG } from "src/assets/icons/arrow_back.svg";
import { ReactComponent as FavoriteSVG } from "src/assets/icons/favorite_border.svg";
import { ReactComponent as CommentSVG } from "src/assets/icons/mode_comment.svg";
import { ReactComponent as BookMarkSMSVG } from "src/assets/icons/bookmark_border_sm.svg";
import { ReactComponent as MoreSVG } from "src/assets/icons/more_horiz.svg";
import { ReactComponent as FileUploadSVG } from "src/assets/icons/file_upload.svg";
import { ReactComponent as BookMarkSVG } from "src/assets/icons/bookmark_border.svg";
import { ReactComponent as ArchiveSVG } from "src/assets/icons/archive.svg";
import { ReactComponent as TrashSVG } from "src/assets/icons/trash.svg";
import { ReactComponent as DesktopSVG } from "src/assets/icons/desktop_windows.svg";
import { ReactComponent as LaunchSVG } from "src/assets/icons/launch.svg";
import { ReactComponent as ReportSVG } from "src/assets/icons/report.svg";
import PostNFTImg from "src/assets/png/post-nft.png";

const DetailPostViewPage: React.FC<{
  img: string;
  tokenId: string;
  name: string;
  description: string;
  category: string;
  attribute: string[];
  external_link: string;
  collection: string;
  alternate_text: string;
}> = ({
  img,
  tokenId,
  name,
  description,
  category,
  attribute,
  external_link,
  collection,
  alternate_text,
}) => {
  const [showPostOption, setShowPostOption] = useState<boolean>(false);
  const [showArchive, setShowArchive] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [reportDetail, setReportDetail] = useState<{
    title: string;
    desc: string;
  }>({ title: "", desc: "" });
  const [showLiked, setShowLiked] = useState<boolean>(false);
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  return (
    <>
      <PageContainer>
        <div
          className="absolute top-5 left-6"
          onClick={() => goTo(SmartSetupPage)}
        >
          <ArrowBackSVG className="fill-grey-200" />
        </div>
        <div>
          <img
            src={img ?? PostNFTImg}
            width="100%"
            height="432px"
            alt="post nft"
          />
        </div>
        <div className="px-6 pt-[14px] pb-6 bg-black bg-opacity-70 absolute top-[372px] w-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-grey-200" />
            <div>
              <p className="text-base font-bold text-grey-50">
                {currentUser.userName}
              </p>
              <p className="text-xs font-bold text-grey-200">12 hrs ago</p>
            </div>
          </div>
          <p className="mb-2 text-base font-bold text-grey-50">{name}</p>
          <p className="mb-2 text-base font-medium text-grey-400">
            {description}
            {description.length > 32 && (
              <span className="text-lime-500">Read more</span>
            )}
          </p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-3">
              <div
                className="flex items-center gap-1"
                onClick={() => setShowLiked(true)}
              >
                <FavoriteSVG />
                <p className="text-sm font-bold text-white">1200</p>
              </div>
              <div
                className="flex items-center gap-1"
                onClick={() =>
                  goTo(CommentPage, {
                    backMode: "normal",
                    img,
                    tokenId,
                    name,
                    description,
                    category,
                    attribute,
                    external_link,
                    collection,
                    alternate_text,
                  })
                }
              >
                <CommentSVG />
                <p className="text-sm font-bold text-white">45</p>
              </div>
              <div className="flex items-center gap-1">
                <BookMarkSMSVG />
                <p className="text-sm font-bold text-white">11</p>
              </div>
            </div>
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-grey-900 active:bg-grey-800"
              onClick={() => {
                setShowPostOption(true);
              }}
            >
              <MoreSVG className="fill-grey-50" />
            </div>
          </div>
          <div>
            <Web23Button text="Buy for $49" size="sm" />
          </div>
        </div>
      </PageContainer>
      <Web23Popup show={showPostOption} setShow={setShowPostOption}>
        <div className="flex justify-between mb-4">
          <div
            className="w-[70px] h-[80px] px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800"
            onClick={() => {
              setShowPostOption(false);
            }}
          >
            <div className="flex justify-center mb-1">
              <FileUploadSVG />
            </div>
            <p className="text-sm font-bold text-center text-white">Share</p>
          </div>
          <div
            className="w-[70px] h-[80px]  px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800"
            onClick={() => {
              setShowPostOption(false);
            }}
          >
            <div className="flex justify-center mb-1">
              <BookMarkSVG />
            </div>
            <p className="text-sm font-bold text-center text-white">Save</p>
          </div>
          <div
            className="w-[70px] h-[80px] px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800"
            onClick={() => {
              setShowArchive(true);
              setShowPostOption(false);
            }}
          >
            <div className="flex justify-center mb-1">
              <ArchiveSVG />
            </div>
            <p className="text-sm font-bold text-center text-white">Archive</p>
          </div>
          <div
            className="w-[70px] h-[80px] px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800"
            onClick={() => {
              setShowDelete(true);
              setShowPostOption(false);
            }}
          >
            <div className="flex justify-center mb-1">
              <TrashSVG />
            </div>
            <p className="text-sm font-bold text-center text-white">Delete</p>
          </div>
        </div>
        <div className="bg-grey-900 rounded-xl">
          <div
            className="flex items-center justify-between px-3 py-4 border-b border-grey-800 active:bg-grey-800 rounded-t-xl"
            onClick={() =>
              goTo(DetailPostViewDesktopPage, {
                img,
                tokenId,
                name,
                description,
                category,
                attribute,
                external_link,
                collection,
                alternate_text,
              })
            }
          >
            <div className="flex items-center gap-3">
              <div>
                <DesktopSVG />
              </div>
              <p className="text-base font-bold text-grey-50">
                Open on Desktop
              </p>
            </div>
            <div>
              <LaunchSVG />
            </div>
          </div>
          <div
            className="flex items-center justify-between px-3 py-4 mb-8 active:bg-grey-800 rounded-b-xl"
            onClick={() => {
              setShowReport(true);
              setShowPostOption(false);
            }}
          >
            <div className="flex items-center gap-3">
              <div>
                <ReportSVG />
              </div>
              <p className="text-base font-bold text-red-400">Report</p>
            </div>
          </div>
        </div>
      </Web23Popup>
      <Web23Popup title="Report" show={showReport} setShow={setShowReport}>
        <div className="pb-4 my-4 bg-grey-900 rounded-xl">
          <p className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200">
            Please tell us why you are reporting this
          </p>
          <div className="flex flex-col gap-4 px-3 mt-4">
            <Web23Input
              placeholder="Title"
              value={reportDetail.title}
              onChange={(e) =>
                setReportDetail((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Web23Input
              placeholder="Description"
              value={reportDetail.desc}
              onChange={(e) =>
                setReportDetail((prev) => ({ ...prev, desc: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="mb-8">
          <Web23Button
            text="Report"
            variant="secondary"
            size="sm"
            onClick={() => {
              setShowReport(false);
              setTimeout(() => {}, 300);
            }}
          />
        </div>
      </Web23Popup>
      <Web23Modal show={showArchive} setShow={setShowArchive}>
        <div className="w-[280px]">
          <p className="mb-3 text-base font-bold text-white">Archive Post?</p>
          <p className="mb-6 text-sm font-bold text-grey-400">
            Are you sure you want to archive “Guardians of the Gwa’ol #3201”
            post?
          </p>
          <p className="mb-4 text-sm font-bold text-grey-400">
            Don’t worry. You can always unarchive it.
          </p>
        </div>
        <hr className="mb-4 border-grey-800" />
        <div className="flex justify-center">
          <div className="w-[280px] flex gap-4">
            <Web23Button
              text="Cancel"
              size="sm"
              variant="secondary"
              onClick={() => {
                setShowArchive(false);
              }}
            />
            <Web23Button
              text="Archive"
              size="sm"
              onClick={() => {
                setShowArchive(false);
                setTimeout(() => {}, 300);
              }}
            />
          </div>
        </div>
      </Web23Modal>
      <Web23Modal show={showDelete} setShow={setShowDelete}>
        <div className="w-[280px]">
          <p className="mb-3 text-base font-bold text-white">Delete Post?</p>
          <p className="mb-4 text-sm font-bold text-grey-400">
            Are you sure you want to delete “Guardians of the Gwa’ol #3201”
            post?
          </p>
          <hr className="mb-4 border-grey-800" />
          <div className="flex gap-4">
            <Web23Button
              text="Cancel"
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowDelete(false);
              }}
            />
            <Web23Button
              text="Delete"
              variant="danger"
              size="sm"
              onClick={() => {
                setShowDelete(false);
                setTimeout(() => {}, 300);
              }}
            />
          </div>
        </div>
      </Web23Modal>
      <Web23Popup
        title="Liked by 1200 people"
        show={showLiked}
        setShow={setShowLiked}
      >
        <div className="mt-4 mb-8 bg-grey-900 rounded-xl">
          <div className="px-3 py-[10px] border-b border-grey-800 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-grey-400" />
            <div className="py-1">
              <p className="text-base font-bold text-grey-50">dilipmerugu</p>
              <p className="text-sm font-medium text-grey-200">
                dilipmerugu.hbar
              </p>
            </div>
          </div>
          <div className="px-3 py-[10px] border-b border-grey-800 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-grey-400" />
            <div className="py-1">
              <p className="text-base font-bold text-grey-50">dinoman</p>
              <p className="text-sm font-medium text-grey-200">dinoman.hbar</p>
            </div>
          </div>
          <div className="px-3 py-[10px] border-b border-grey-800 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-grey-400" />
            <div className="py-1">
              <p className="text-base font-bold text-grey-50">malevolent</p>
              <p className="text-sm font-medium text-grey-200">
                malevolent.hbar
              </p>
            </div>
          </div>
          <div className="px-3 py-[10px] border-b border-grey-800 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-grey-400" />
            <div className="py-1">
              <p className="text-base font-bold text-grey-50">ursula</p>
              <p className="text-sm font-medium text-grey-200">ursula.hbar</p>
            </div>
          </div>
          <div className="px-3 py-[10px] rounded-b-xl flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-grey-400" />
            <div className="py-1">
              <p className="text-base font-bold text-grey-50">octopus</p>
              <p className="text-sm font-medium text-grey-200">octopus.hbar</p>
            </div>
          </div>
        </div>
      </Web23Popup>
    </>
  );
};

export default DetailPostViewPage;
