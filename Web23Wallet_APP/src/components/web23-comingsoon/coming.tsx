import React from "react";

import { ReactComponent as WatchLaterSVG } from "src/assets/icons/watch_later.svg";

const Web23ComingSoon: React.FC = () => {
  return (
    <div className="bg-yellow-500 p-1 flex gap-[2px] rounded-[4px]">
      <WatchLaterSVG />
      <span className="text-xs font-bold text-black">Coming Soon</span>
    </div>
  );
};

export default Web23ComingSoon;
