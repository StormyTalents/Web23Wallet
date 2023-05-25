import React, { useMemo } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import { ReactComponent as HbarSVG } from "src/assets/icons/hbar.svg";

import "./carousel.custom.css";

type IWeb23WalletCarousel = {
  hbar: { hbar: string; amount: string };
  currency: { label: string; symbol: string };
};

const Web23WalletCarousel: React.FC<IWeb23WalletCarousel> = ({
  hbar,
  currency,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { t } = useTranslation();

  const convertedCurrency = useMemo(() => {
    const res = [];
    res.push({ amount: hbar.amount, currency: currency.symbol });
    res.push({
      amount: hbar.hbar,
      currency: "ℏ",
    });
    return res;
  }, [hbar, currency]);

  return (
    <div>
      <span className="block uppercase font-bold text-sm tracking-[0.1em] text-grey-400 text-center mb-2">
        {t("WALLET VALUE")}
      </span>
      <Slider {...settings}>
        {convertedCurrency.map((item: any, index) => (
          <div key={`${index}`}>
            <div
              key={`${item}_${index}`}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <div className="flex items-center gap-1 font-black">
                <span className="block text-3xl leading-[48px] text-grey-400">
                  {item.currency}
                </span>
                <span className="block text-2xl leading-[48px] text-white">
                  {item.amount}
                </span>
              </div>
              <HbarSVG />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Web23WalletCarousel;
