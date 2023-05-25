import React from "react";

type IWeb23CheckBox = {
  id?: string;
  value?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: any) => void;
};

const Web23CheckBox: React.FC<IWeb23CheckBox> = ({
  id,
  checked,
  value,
  children,
  onChange,
}) => {
  return (
    <label className="block relative pl-[29px] cursor-pointer select-none [&_input:checked~_.checkmark]:bg-lime-500 [&_input:checked~_.checkmark]:border-transparent [&_input:checked~_.checkmark:after]:block">
      <div className="mt-[3px]">{children}</div>
      <input
        id={id}
        value={value}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute w-0 h-0 opacity-0 cursor-pointer focus:bg-grey-900"
      />
      <span className="checkmark absolute top-1 left-0 h-[18px] w-[18px] bg-transparent border-2 border-grey-400 rounded-sm after:absolute after:hidden after:top-[-2px] after:left-1 after:w-[7px] after:h-[14px] after:border-r-2 after:border-b-2 after:border-black after:rotate-45" />
    </label>
  );
};

export default Web23CheckBox;
