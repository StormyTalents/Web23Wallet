import React, { ReactNode } from "react";

type IButton = {
  variant?: "primary" | "secondary" | "danger" | "third";
  text?: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
};

const Web23Button: React.FC<IButton> = ({
  variant = "primary",
  text = "sample text",
  className,
  disabled,
  onClick,
  size = "md",
  type = "button",
  icon = false,
  iconPosition = "right",
}) => {
  return (
    <button
      type={type}
      className={`${
        variant === "primary"
          ? disabled
            ? "bg-white border-grey-900 active:bg-white"
            : "bg-lime-500 border-grey-900 active:bg-green-500"
          : variant === "secondary"
          ? disabled
            ? "bg-white border-grey-300 active:bg-white"
            : "bg-white  border-grey-300 active:bg-grey-300"
          : variant === "danger"
          ? "bg-red-500 active:bg-red-400 border-grey-900"
          : variant === "third" && "bg-transparent border-white"
      } ${
        size === "sm" ? "py-[6px]" : "py-3"
      } w-full font-bold text-base border-2 rounded-3xl flex gap-1 items-center justify-center ${
        disabled && "text-gray-400"
      } ${variant === "third" ? "text-white" : "text-grey-900"} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconPosition === "left" && icon && icon}
      <p>{text}</p>
      {iconPosition === "right" && icon && icon}
    </button>
  );
};

export default Web23Button;
