import React from "react";

import { ReactComponent as CloseSVG } from "src/assets/icons/close.svg";

type IWeb23Popup = {
  title?: string;
  show: boolean;
  setShow: Function;
  children: React.ReactNode;
};

const Web23Popup: React.FC<IWeb23Popup> = ({
  title,
  show = false,
  setShow,
  children,
}) => {
  return (
    <>
      <div
        className={`z-10 w-full fixed bottom-0 left-0 bg-black border-t border-t-grey-50 rounded-t-3xl duration-300 ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-center mt-2 mb-3">
          <div className="w-12 h-1 rounded-sm bg-grey-700" />
        </div>
        {title && (
          <div className="pl-4 flex gap-5 items-center mb-[30px]">
            <CloseSVG onClick={() => setShow(false)} />
            <p className="text-xl font-bold text-white">{title}</p>
          </div>
        )}
        <div className="mx-6 overflow-y-auto max-h-[500px]">{children}</div>
      </div>
    </>
  );
};

export default Web23Popup;
