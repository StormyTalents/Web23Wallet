import React from "react";

const Web23Toggle: React.FC<{
  variant?: "primary" | "secondary";
  checked: boolean;
  setChecked: (state: any) => void;
}> = ({ variant = "primary", checked, setChecked }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={setChecked}
      />
      <div
        className={`outline-none w-[52px] h-[32px] bg-[rgba(105,_105,_105,_0.32)] rounded-full peer peer-checked:after:translate-x-[20px] peer-focus:after:border-white peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:shadow-[0px_3px_8px_rgba(0,_0,_0,_0.15),_0px_3px_1px_rgba(0,_0,_0,_0.06)] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-lime-700 ${
          variant === "secondary" &&
          "peer-focus:after:translate-x-[20px] peer-focus:peer-checked:after:translate-x-[0px]  peer-focus:peer-checked:bg-[rgba(105,_105,_105,_0.32)] peer-focus:bg-lime-700"
        }`}
      ></div>
    </label>
  );
};

export default Web23Toggle;
