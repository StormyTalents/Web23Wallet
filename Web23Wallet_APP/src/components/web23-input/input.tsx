import React, { useState, useRef } from "react";

type IWeb23Input = {
  id?: string;
  placeholder: string;
  type?: "input" | "password";
  value?: string;
  limit?: number;
  className?: string;
  variant?: string;
  onChange?: (e: any) => void;
};

const Web23Input: React.FC<IWeb23Input> = ({
  id,
  placeholder = "sample place holder",
  type = "input",
  limit = 0,
  value,
  className,
  variant = "primary",
  onChange,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={onChange}
        className={`w-full border rounded-[32px] font-bold text-base focus:outline-white outline-1 ${
          limit > 0 && "pr-[42px]"
        } ${
          variant === "primary"
            ? "bg-grey-900 border-grey-800 pt-[22px] pb-1 px-5 text-white"
            : "bg-white p-5 text-grey-600"
        } ${className}`}
        ref={inputRef}
      />
      {placeholder.length > 32 ? (
        <label
          className={`absolute font-bold duration-150 ${
            focus || value?.length
              ? "top-1 left-5 text-xs"
              : variant === "primary"
              ? "top-3 left-5 text-sm"
              : "top-5 left-5 text-sm"
          } ${variant === "primary" ? "text-grey-400" : "text-grey-600"}`}
          onClick={() => {
            inputRef?.current?.focus();
          }}
        >
          {placeholder}
        </label>
      ) : (
        <label
          className={`absolute font-bold duration-150 ${
            focus || value?.length
              ? "top-1 left-5 text-xs"
              : variant === "primary"
              ? "top-3 left-5 text-base"
              : "top-5 left-5 text-base"
          } ${variant === "primary" ? "text-grey-400" : "text-grey-600"}`}
          onClick={() => {
            inputRef?.current?.focus();
          }}
        >
          {placeholder}
        </label>
      )}

      {limit > 0 && (
        <p className="absolute text-sm font-medium top-[22px] right-[42px] text-grey-400 translate-y-[-50%] translate-x-[50%]">
          {value?.length ?? 0}/{limit}
        </p>
      )}
    </div>
  );
};

export default Web23Input;
