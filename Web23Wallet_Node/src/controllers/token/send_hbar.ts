import { TransferTransaction, Hbar, AccountId, AccountBalanceQuery, HbarUnit, Client } from "@hashgraph/sdk";
import { Request, Response } from "express";
import axios from "axios"

/**
 * send Hbar endpoint
 */

const sendHbar = async (req: Request, res: Response) => {
  const { accountId, sendAccountId, amount, net, memo, priv } = req.body.params;
  const client = net ? Client.forMainnet().setOperator(accountId, priv) : Client.forTestnet().setOperator(accountId, priv);

  try {
    const query = new AccountBalanceQuery().setAccountId(accountId);
       const accountBalance = await query.execute(client);

    if (accountBalance.hbars.to(HbarUnit.Hbar).toNumber() < parseFloat(amount))
       throw new Error("overflow amount");
    
    if (memo.length > 0)
    await new TransferTransaction()
      .addHbarTransfer(
        AccountId.fromString(accountId as string),
        Hbar.fromString("-"+amount)
      ) //Sending account
      .addHbarTransfer(
        AccountId.fromString(sendAccountId as string),
        Hbar.fromString(amount)
    ).setTransactionMemo(memo).execute(client) //Receiving account
    else
      await new TransferTransaction()
        .addHbarTransfer(
          AccountId.fromString(accountId as string),
          Hbar.fromString("-" + amount)
        ) //Sending account
        .addHbarTransfer(
          AccountId.fromString(sendAccountId as string),
          Hbar.fromString(amount)
        ).execute(client) //Receiving account

    const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
    const balance = await balanceQuery.execute(client);
    
    const compare = await axios.get("https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=USD,EUR&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8")

    const eur = balance.hbars.toBigNumber().multipliedBy(compare.data.EUR).toFixed();
    const usd = balance.hbars.toBigNumber().multipliedBy(compare.data.USD).toFixed();

    res.status(200).json({ hbar: balance.hbars.to(HbarUnit.Hbar).toString(), eur, usd });

  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export default sendHbar;
