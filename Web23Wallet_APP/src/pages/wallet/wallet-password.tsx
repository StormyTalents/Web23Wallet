import React, { useContext } from "react";
import { goTo } from "react-chrome-extension-router";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import CreateMnemonic from "./mnemonic-create";
import SuccessWallet from "./wallet-success";
import Web2ConfigPage from "./web2config";

import { PageContainer, PageTitle, PageContent, PageAction } from "src/layout";

import { Web23Button, Web23Input, Web23CheckBox } from "src/components";

import { SettingContext } from "src/utility/context";

import { ReactComponent as LockOpenSVG } from "src/assets/icons/lock_open.svg";

const WalletPassword: React.FC<{ back?: "web3" | "web2" }> = ({
  back = "web3",
}) => {
  const { settings, saveSettings } = useContext(SettingContext);
  const { t } = useTranslation();

  const handleValidate = (values: {
    password: string;
    confirm: string;
    checkbox: string;
  }) => {
    let errors: { password?: string; confirm?: string; checkbox?: string } = {};
    if (!values.password) errors.password = "Required";
    if (values.password !== values.confirm)
      errors.confirm =
        t("Do not match, please confirm and try again") ||
        "Do not match, please confirm and try again";
    if (values.password.length > 0 && values.password.length < 12)
      errors.password =
        t("The Minimum password length is 12") ||
        "The Minimum password length is 12";
    return errors;
  };

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        saveSettings({
          ...settings,
          userKeyInfo: values.password,
        });
        setSubmitting(false);

        if (values.checkbox) {
          if (settings.selectedUser === "") goTo(CreateMnemonic);
          else goTo(SuccessWallet);
        }
      }}
      initialValues={{ password: "", confirm: "", checkbox: "" }}
      validate={handleValidate}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          autoComplete="false"
          onSubmit={handleSubmit}
          className="w-full h-full"
        >
          <PageContainer>
            <PageTitle
              title={t("Create Password") || "Create Password"}
              onClick={() => {
                if (back === "web3") goTo(CreateMnemonic);
                else goTo(Web2ConfigPage);
              }}
            />
            <PageContent className="pt-6">
              <div className="flex justify-center w-full mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-grey-900 rounded-2xl">
                  <LockOpenSVG />
                </div>
              </div>
              <p className="px-10 mb-6 text-base font-bold text-center text-grey-200">
                {t("Setup a password to unlock your Web23 account")}
              </p>
              <Web23Input
                id="password"
                placeholder={t("Enter password")}
                type="password"
                className={`mb-4 ${
                  errors.password && touched.password && "mb-1"
                }`}
                value={values.password}
                onChange={handleChange}
              />
              <p className="pl-4 mb-4 text-xs font-bold text-red-400">
                {errors.password && touched.password && errors.password}
              </p>
              <Web23Input
                id="confirm"
                placeholder={t("Confirm password")}
                type="password"
                className={`mb-4 ${
                  errors.confirm && touched.confirm && "mb-1"
                }`}
                value={values.confirm}
                onChange={handleChange}
              />
              <p className="pl-4 mb-4 text-xs font-bold text-red-400">
                {errors.confirm && touched.confirm && errors.confirm}
              </p>
              <div className="flex">
                <Web23CheckBox
                  id="checkbox"
                  value={values.checkbox}
                  onChange={handleChange}
                >
                  <span className="text-sm font-medium text-grey-100">
                    {t("I agree with the")}
                  </span>
                  <span className="text-sm font-medium text-lime-500">
                    {t("terms of Conditions")}
                  </span>
                </Web23CheckBox>
              </div>
            </PageContent>
            <PageAction>
              <Web23Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !values.checkbox ||
                  !values.confirm ||
                  !values.checkbox
                }
                text={
                  t("I have securely saved it") || "I have securely saved it"
                }
              />
            </PageAction>
          </PageContainer>
        </form>
      )}
    </Formik>
  );
};

export default WalletPassword;
