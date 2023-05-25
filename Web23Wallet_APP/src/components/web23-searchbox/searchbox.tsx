import React from "react";

import { ReactComponent as SearchSVG } from "src/assets/icons/search.svg";

type IWeb23SearchBox = {
  placeholder: string;
  keyword: string;
  setKeyword: (str: string) => void;
};

const Web23SearchBox: React.FC<IWeb23SearchBox> = ({
  placeholder,
  keyword,
  setKeyword,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value as string);
        }}
        placeholder={placeholder}
        className="placeholder-grey-400 text-grey-400 font-bold text-base placeholder:text-base placeholder:font-bold p-5 outline-none bg-grey-900 border border-grey-800 w-full rounded-[32px] pr-10"
      />
      <SearchSVG className="absolute top-5 right-5 fill-grey-400" />
    </div>
  );
};

export default Web23SearchBox;
