import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as VisibilityOffSVG } from "src/assets/icons/visibility_off.svg";

const MnemonicBox: React.FC<{
  phrase?: string[];
  extendMode?: boolean;
  setExtendMode?: (param: boolean) => void;
}> = ({ phrase, extendMode, setExtendMode }) => {
  const [show, setShow] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div
      className="relative w-full rounded-2xl"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={!show ? "bg-grey-900 rounded-xl blur-[3px]" : ""}>
        <div className="bg-grey-900 border border-grey-800 rounded-xl px-3 py-4 overflow-y-auto max-h-[210px] !scrollbar-thin scrollbar-thumb-grey-400 scrollbar-track-transparent">
          <div className="grid grid-cols-3 gap-y-4">
            {phrase?.map((item, index) => (
              <MenemonicPhrase
                key={`mnemonic-phrase_${item}_${index}`}
                index={index + 1}
                text={item}
              />
            ))}
          </div>
          {extendMode !== undefined && setExtendMode !== undefined && (
            <p
              className="font-medium text-xs text-center text-white underline mt-4 cursor-pointer select-none"
              onClick={() => setExtendMode(!extendMode)}
            >
              {t("Change to")} {extendMode ? "24" : "12"} {t("word phrase")}
            </p>
          )}
        </div>
      </div>

      <div
        className={
          !show
            ? "block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            : "hidden"
        }
      >
        <div className="flex justify-center mb-2">
          <VisibilityOffSVG />
        </div>
        <p className="font-bold text-xs text-center text-white">
          {t("Hover to view the phrase")}
        </p>
      </div>
    </div>
  );
};

const MenemonicPhrase: React.FC<{ index: number; text: string }> = ({
  index,
  text,
}) => {
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <div className="w-4 h-6 flex items-center">
        <p className="text-grey-400">{index}</p>
      </div>
      <div className="rounded-2xl bg-[#4e4e4e] px-2 py-1">
        <p className="text-grey-50">{text}</p>
      </div>
    </div>
  );
};

export default MnemonicBox;
