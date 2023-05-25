import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { PageContainer, PageContent, PageAction } from "src/layout";

import {
  DashboardActionBar,
  Web23Avatar,
  Web23ChooseWallet,
} from "src/components";

import { SettingContext } from "src/utility/context";
import getSelectedUser from "src/utility/getSelectedUser";
import apiHandler from "src/utility/apiHandler";

import { ReactComponent as ArrowDownSVG } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as LgHBarSVG } from "src/assets/icons/lg_hbar.svg";
import { ReactComponent as ArrowReceiveSVG } from "src/assets/icons/arrow_receive.svg";
import { ReactComponent as ArrowSentSVG } from "src/assets/icons/arrow_sent.svg";
import { ReactComponent as WarningSVG } from "src/assets/icons/warning.svg";

type ITransactionValue = {
  accountId: string;
  amount: number;
  date: Date;
};

type ITransaction = {
  date: string;
  value: ITransactionValue[];
};

type IContact = {
  userName: string;
  accountId: string;
  type: "initial" | "icon";
};

const DashboardHistory: React.FC = () => {
  const { settings } = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [transaction, setTransaction] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hbarPrice, setHbarPrice] = useState<number>(0);
  const [currentContact, setCurrentContact] = useState<IContact[]>();
  const today =
    new Date().toLocaleString("default", { month: "long" }) +
    " " +
    new Date().getDay().toString();
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);
  const { t } = useTranslation();

  const getHistory = async () => {
    const { transactions } = await apiHandler(
      "get_history",
      currentUser.token,
      { accountId: currentUser.accountId, net: currentUser.net }
    );

    const dateArray = [];

    for (let item of transactions) {
      const date = new Date(parseInt(item?.consensus_timestamp) * 1000);
      const ret =
        date.toLocaleString("default", { month: "long" }) +
        " " +
        date.getDay().toString();
      if (!dateArray.find((it) => ret === it)?.length) dateArray.push(ret);
    }

    setTransaction(
      dateArray.map((date) => {
        const bin = transactions.filter((item: any) => {
          const transDate = new Date(
            parseInt(item?.consensus_timestamp) * 1000
          );
          const transDateStr =
            transDate.toLocaleString("default", { month: "long" }) +
            " " +
            transDate.getDay().toString();
          return transDateStr === date;
        });

        return {
          date,
          value: bin?.map((txData: any) => {
            let element: ITransactionValue = {
              accountId: "",
              amount: 0,
              date: new Date(0),
            };
            if (txData?.transfers[2]?.account === currentUser.accountId) {
              element.accountId = txData?.transfers[3]?.account;
              element.amount = txData?.transfers[3]?.amount;
            } else {
              element.accountId = txData?.transfers[2]?.account;
              element.amount = txData?.transfers[2]?.amount;
            }
            return element;
          }),
        };
      })
    );
  };

  const getHbarPrice = async () => {
    const { data } = await axios(
      `https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=${currentUser.currency.label.toLowerCase()}&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8`
    );
    setHbarPrice(parseFloat(data[`${currentUser.currency.label}`]));
  };

  const getCurrentContact = async () => {
    const resContact: IContact[] = [];
    for (let conItem of currentUser.contacts) {
      if (conItem.accountId !== "" && conItem.userName !== "") {
        const checksum = conItem.accountId.slice(0, 4);
        let binId = conItem.accountId;
        if (checksum !== "0.0.") {
          try {
            const { accountId } = await apiHandler(
              "resolve_domain",
              currentUser.token,
              {
                resolveId: binId,
              }
            );
            binId = accountId[0]?.ownerAddress;
          } catch (e) {}
        }
        resContact.push({
          userName: conItem.userName,
          accountId: binId,
          type: "icon",
        });
      }
    }
    setCurrentContact(resContact);
  };

  const asyncOperation = async () => {
    setLoading(true);
    try {
      await getHbarPrice();
      await getHistory();
      await getCurrentContact();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncOperation();
  }, [currentUser]);

  return (
    <>
      <PageContainer loading={loading}>
        <PageContent className="">
          <div className="px-3 py-[10px] flex items-center justify-between mb-[18px]">
            <h3 className="text-xl font-bold text-white">{t("Activity")}</h3>
            <div
              className="flex items-center gap-2 p-2 bg-grey-900 rounded-3xl active:bg-grey-800"
              onClick={() => setShowWalletList(true)}
            >
              <Web23Avatar
                name={currentUser.userName}
                color={currentUser.themeColor}
                type="initial"
              />
              <ArrowDownSVG className="fill-grey-50" />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[440px]">
            {transaction.map((txData, indexId) => (
              <div
                key={txData.date + indexId}
                className="mb-4 bg-grey-900 rounded-xl"
              >
                <p className="px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200">
                  {today === txData.date ? "Today" : txData.date}
                </p>
                {txData.value.map((item, index) => (
                  <div
                    key={item.accountId + index.toString()}
                    className={`active:bg-grey-800 flex justify-between items-center ${
                      index === txData.value.length - 1
                        ? "rounded-b-xl"
                        : "border-b border-b-grey-800"
                    }`}
                  >
                    <div className="px-3 py-[10px] flex gap-3 items-center">
                      <div
                        className={`relative ${
                          item.accountId === undefined && "opacity-50"
                        }`}
                      >
                        <LgHBarSVG />
                        <div className="absolute bottom-0 -right-1">
                          {item.amount < 0 ? (
                            <ArrowReceiveSVG />
                          ) : (
                            <ArrowSentSVG />
                          )}
                        </div>
                      </div>
                      <div className="py-[2px]">
                        <p
                          className={`mb-1 text-base font-bold text-grey-50 ${
                            item.amount === undefined && "opacity-50"
                          }`}
                        >
                          {item.amount < 0 ? "Received HBAR" : "Sent HBAR"}
                        </p>
                        <p
                          className={`text-xs font-bold text-grey-400 ${
                            item.accountId === undefined && "opacity-50"
                          }`}
                        >
                          {item.accountId === undefined
                            ? "invalid"
                            : item.amount < 0
                            ? "from "
                            : "to "}
                          {(item.accountId !== undefined &&
                            currentContact?.find((conItem) => {
                              return conItem.accountId === item.accountId;
                            })?.userName) ||
                            item.accountId}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-[10px] flex gap-3 items-center">
                      <div className="py-1 text-right">
                        <p
                          className={`mb-[6px] font-bold text-sm ${
                            item.amount < 0
                              ? "text-green-600"
                              : "text-[#FF3D50]"
                          } ${item.amount === undefined && "opacity-50"}`}
                        >
                          {item.amount === undefined
                            ? ""
                            : item.amount < 0
                            ? "+"
                            : "-"}
                          {item.amount === undefined
                            ? "invalid"
                            : currentUser.currency.symbol +
                              Math.abs((item.amount / 100000000) * hbarPrice)
                                .toFixed(2)
                                .toString()}
                        </p>
                        <div
                          className={`text-xs font-bold ${
                            item.amount === undefined
                              ? "text-[#FF3D50]"
                              : "text-grey-400 block"
                          }`}
                        >
                          {item.amount === undefined ? (
                            <div className="flex items-center gap-[2px]">
                              <div>
                                <WarningSVG />
                              </div>
                              <p>Failed</p>
                            </div>
                          ) : (
                            Math.floor((item.amount * -1) / 100000000) + "HBAR"
                          )}
                        </div>
                      </div>
                      <ArrowDownSVG className="-rotate-90 fill-grey-400" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </PageContent>
        <PageAction className="px-0 pb-0">
          <DashboardActionBar selected={3} />
        </PageAction>
      </PageContainer>

      <Web23ChooseWallet
        extraOpt={asyncOperation}
        setShowEditWallet={setShowEditWallet}
        setShowNetType={setShowNetType}
        setShowWalletList={setShowWalletList}
        showEditWallet={showEditWallet}
        showNetType={showNetType}
        showWalletList={showWalletList}
      />
    </>
  );
};

export default DashboardHistory;
