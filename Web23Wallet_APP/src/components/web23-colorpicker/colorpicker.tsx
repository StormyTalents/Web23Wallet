import React from "react";

import {
  colorValue,
  getBGColorSchema,
  getAfterBorderColorSchema,
} from "src/utility/colorSchema";

const Web23ColorPicker: React.FC<{
  value: string;
  setValue: (color: string) => void;
}> = ({ value, setValue }) => {
  return (
    <div className="flex gap-2">
      {colorValue.map((color, index) => (
        <div
          key={`${color}_${index}`}
          className={`relative m-1 w-6 h-6 rounded-full flex justify-center items-center ${getAfterBorderColorSchema(
            color
          )} ${getBGColorSchema(color)} ${
            value === color &&
            "after:content-[''] after:absolute after:w-8 after:h-8 after:top-[-4px] after:left-[-4px] after:rounded-full after:border"
          }`}
          onClick={() => setValue(color)}
        >
          {value === color && (
            <div className="border-l border-b border-black -rotate-45 w-3 h-[6px] translate-y-[-25%]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Web23ColorPicker;
