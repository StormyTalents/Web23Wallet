import React from "react";

const Web23Modal: React.FC<{
  show: boolean;
  setShow: (param: any) => void;
  children: React.ReactNode;
}> = ({ show, setShow, children }) => {
  return (
    <div
      className={`scale-0 duration-300 fixed p-6 -translate-x-1/2 -translate-y-1/2 top-1/2 bg-grey-900 left-1/2 rounded-2xl shadow-[2px_4px_16px_rgba(0,0,0,0.16)] ${
        show && "scale-100"
      }`}
    >
      {children}
    </div>
  );
};

export default Web23Modal;
