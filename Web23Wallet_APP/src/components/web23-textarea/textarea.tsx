import React from "react";

type IWeb23TextArea = {
  value?: string;
  onChange?: (e: any) => void;
  className?: string;
  rows?: number;
  placeholder?: string;
};

const Web23TextArea: React.FC<IWeb23TextArea> = ({
  value,
  onChange,
  className,
  rows,
  placeholder = "Enter Secret Phase",
}) => {
  return (
    <div className="relative">
      <span className="absolute text-grey-400 text-sm top-[10px] left-5">
        {placeholder}
      </span>
      <textarea
        rows={rows}
        className={`bg-grey-900 outline-2 outline-grey-100 resize-none w-full rounded-xl pt-[30px] pb-[10px] px-5 font-bold text-base text-grey-50 ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Web23TextArea;
