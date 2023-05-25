import React, { useLayoutEffect } from "react";
import { motion } from "framer-motion";

import Web23Spinner from "src/components/web23-spinner/spinner";

import { ReactComponent as ArrowBackSVG } from "src/assets/icons/arrow_back.svg";

const PageContainer: React.FC<{
  children?: React.ReactNode;
  loading?: boolean;
  className?: string;
  isBlur?: boolean;
}> = ({ children, loading, className, isBlur }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative w-full h-full">
        <div
          className={`w-full h-full bg-black flex flex-col ${className} ${
            loading && "relative blur-[3px] bg-grey-900 w-full h-full"
          } ${isBlur && "relative blur-[3px] bg-grey-800"}`}
        >
          {children}
        </div>

        {loading && (
          <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10">
            <Web23Spinner />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const PageTitle: React.FC<{ title?: string; onClick?: () => void }> = ({
  title = "",
  onClick,
}) => {
  return (
    <div onClick={onClick} className="flex items-center gap-3 px-6 py-5">
      <ArrowBackSVG className="fill-grey-200" />
      <h3 className="text-xl font-bold cursor-pointer text-grey-50">{title}</h3>
    </div>
  );
};

const PageContent: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`px-3 h-full flex justify-center ${className}`}>
      <div className="w-full">{children}</div>
    </div>
  );
};

const PageAction: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={`pb-8 px-3 ${className}`}>{children}</div>;
};

export { PageContainer, PageTitle, PageContent, PageAction };
