import React, { useLayoutEffect } from "react";
import { goTo } from "react-chrome-extension-router";
import { useTranslation } from "react-i18next";

import SettingPage from "./setting";

import { PageContainer, PageContent, PageTitle } from "src/layout";

const TermPrivacyPage: React.FC = () => {
  const { t } = useTranslation();
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <PageContainer>
      <PageTitle
        title={t("Terms and Privacy") || "Terms and Privacy"}
        onClick={() => goTo(SettingPage)}
      />
      <PageContent className="!px-6 h-auto">
        <h3 className="mt-4 font-bold text-xl text-white mb-3">
          {t("Privacy Statement")}
        </h3>
        <p className="font-medium text-xs text-grey-400 mb-4">
          {t(
            "This Privacy Statement describes the privacy practices of Unlabelled for data that we collect: Through the software applications made available by us for use on or through computers and mobile devices (the “Apps”). Through our social media pages that we control from which you are accessing this Privacy Statement (collectively, our “Social Media Pages”). Through HTML-formatted email messages that we send you that link to this Privacy Statement and through your communications with us. Collectively, we refer to the Websites, the Apps and our Social Media Pages, as the “Online Services” and, together with offline channels, the “Services.” By using the Services, you agree to the terms and conditions of this Privacy Statement."
          )}
        </p>
        <h3 className="font-bold text-xl text-white mb-3">
          {t("Collection of Personal Data")}
        </h3>
        <p className="font-medium text-xs text-grey-400 mb-4">
          {t(
            "“Personal Data” are data that identify you as an individual or relate to an identifiable individual. At touch points throughout your guest journey, we sometimes collect Personal Data such as: Email address"
          )}
        </p>
        <h3 className="font-bold text-xl text-white mb-3">Cookies</h3>
        <p className="font-medium text-xs text-grey-400 mb-8">
          {t(
            "We collect certain data from cookies, which are pieces of data stored directly on the computer or mobile device that you are using. Cookies allow us to collect data such as browser type, time spent on the Online Services, pages visited, referring URL, language preferences, and other aggregated traffic data. We use the data for security purposes, to facilitate navigation, to display data more effectively, to collect statistical data, to personalize your experience while using the Online Services and to recognize your computer to assist your use of the Online Services. We also gather statistical data about use of the Online Services to continually improve design and functionality, understand how they are used and assist us with resolving questions."
          )}
        </p>
      </PageContent>
    </PageContainer>
  );
};

export default TermPrivacyPage;
