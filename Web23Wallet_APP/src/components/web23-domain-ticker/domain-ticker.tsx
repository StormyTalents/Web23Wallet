import React from "react";
import Ticker from "react-awesome-ticker";

const Web23DomainTicker: React.FC = () => {
  return (
    <div>
      <Ticker direction="left">
        <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#52A876] rounded-full w-12 h-12 mr-2">
          .ca
        </p>
        <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#6E70E0] rounded-full w-12 h-12 mr-2">
          .fyi
        </p>
        <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#389AC1] rounded-full w-12 h-12 mr-2">
          .bio
        </p>
        <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#D0375A] rounded-full w-12 h-12 mr-2">
          .live
        </p>
        <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#CD8C06] rounded-full w-12 h-12 mr-2">
          .com
        </p>
        <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#5185EA] rounded-full w-12 h-12 mr-2">
          .bio
        </p>
        <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#D35036] rounded-full w-12 h-12 mr-2">
          .in
        </p>
      </Ticker>
      <div className="mt-2 mb-6">
        <Ticker direction="right" delay={0.1}>
          <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#2D6CDD] rounded-full w-12 h-12 mr-2">
            .fyi
          </p>
          <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#87B24C] rounded-full w-12 h-12 mr-2">
            .art
          </p>
          <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#A63CDC] rounded-full w-12 h-12 mr-2">
            .info
          </p>
          <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#E75F59] rounded-full w-12 h-12 mr-2">
            .bar
          </p>
          <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#2BBAA9] rounded-full w-12 h-12 mr-2">
            .tv
          </p>
          <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#B14863] rounded-full w-12 h-12 mr-2">
            .ai
          </p>
          <p className="flex items-center justify-center font-medium text-center text-white font-base bg-[#5753DD] rounded-full w-12 h-12 mr-2">
            .link
          </p>
        </Ticker>
      </div>
    </div>
  );
};

export default Web23DomainTicker;
