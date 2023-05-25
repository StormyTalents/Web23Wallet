import React from "react";
import { goTo } from "react-chrome-extension-router";

import DetailPostViewPage from "./detail";
import DetailPostViewDesktopPage from "./detail-desktop";

import { PageContainer, PageContent, PageTitle } from "src/layout";

import { Web23Input } from "src/components";

import { ReactComponent as MoreSVG } from "src/assets/icons/more_horiz.svg";
import { ReactComponent as FavoriteSVG } from "src/assets/icons/favorite_fill.svg";
import { ReactComponent as FavoriteBroderSVG } from "src/assets/icons/favorite_border.svg";

const CommentPage: React.FC<{
  backMode?: "desktop" | "normal";
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
  backMode = "normal",
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
  return (
    <PageContainer>
      <PageTitle
        title="Comments  432"
        onClick={() => {
          if (backMode === "desktop")
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
            });
          else
            goTo(DetailPostViewPage, {
              img,
              tokenId,
              name,
              description,
              category,
              attribute,
              external_link,
              collection,
              alternate_text,
            });
        }}
      />
      <PageContent className="!px-0">
        <div className="bg-grey-900 h-full flex flex-col justify-between">
          <div>
            <div className="px-6 py-[10px] flex items-center gap-3 border-b border-grey-800">
              <div className="w-10 h-10 bg-grey-200" />
              <div className="py-[2px] font-bold">
                <p className="pb-[2px] text-grey-50 font-base">
                  Guardians of the Gwa’ol #3201
                </p>
                <p className="text-xs text-grey-400">dilipmerugu.hbar</p>
              </div>
            </div>
            <div className="px-6 py-4 max-h-[384px] overflow-auto">
              <div className="flex gap-2">
                <div>
                  <div className="w-10 h-10 rounded-full bg-grey-200" />
                </div>
                <div>
                  <p className="font-bold text-base text-grey-200 mb-1">
                    dilipmerugu
                  </p>
                  <p className="w-[232px] font-medium text-sm text-white mb-2">
                    great work Vishnu. Looking forward to a purchase. This is
                    perfect collection that i wanted to own
                  </p>
                  <div className="flex gap-3 items-center">
                    <p className="font-medium text-xs text-grey-400">
                      2 days ago
                    </p>
                    <p className="text-xs font-medium text-white">4 likes</p>
                    <p className="text-xs font-bold text-white">Reply</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <MoreSVG className="fill-grey-300" />
                  </div>
                  <div>
                    <FavoriteSVG />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <div>
                  <div className="w-10 h-10 rounded-full bg-grey-200" />
                </div>
                <div>
                  <p className="font-bold text-base text-grey-200 mb-1">
                    ursula
                  </p>
                  <p className="w-[232px] font-medium text-sm text-white mb-2">
                    Amazing work. This clearly gave me that experience of
                    wandering in the universe. thank you
                  </p>
                  <div className="flex gap-3 items-center">
                    <p className="font-medium text-xs text-grey-400">2 hrs</p>
                    <p className="text-xs font-medium text-white">1 likes</p>
                    <p className="text-xs font-bold text-white">Reply</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <MoreSVG className="fill-grey-300" />
                  </div>
                  <div>
                    <FavoriteBroderSVG />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="w-[232px]">
                  <p className="text-grey-400 text-xs font-bold mb-2">
                    ---- Hide replies
                  </p>
                  <div className="flex gap-2 justify-center">
                    <div className="w-10 h-10 rounded-full bg-grey-400" />
                    <div>
                      <div className="w-[143px]">
                        <p className="font-bold text-base text-grey-100 mb-1">
                          malevolent
                        </p>
                        <p className="text-white font-medium text-sm">
                          Amazing work. This clearly gave me that experience of
                          wandering in the universe. thank you
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 flex gap-4 items-center border-t border-grey-800">
            <div className="w-10 h-10 rounded-full bg-grey-200" />
            <Web23Input placeholder="Add a comment..." />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default CommentPage;
