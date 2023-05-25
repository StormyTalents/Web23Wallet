import { Request, Response } from "express";
import {AccountBalanceQuery, HbarUnit} from "@hashgraph/sdk"
import axios from "axios"

import { testnetClient, mainnetClient } from '../../config/config'
/**
 * Get account balance endpoint
 */

const getBalance = async (req: Request, res: Response) => {
    const {accountId, currency, net} = req.body.params;

    try {
        const query = new AccountBalanceQuery().setAccountId(accountId);
        const accountBalance = net ? await query.execute(mainnetClient) : await query.execute(testnetClient);
        const compare = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=${currency}&api_key=8fc3e1cafe0aefdfb9819310e48db8e7ae472dbdfe734816e2b4bd1ae2f55ac8`)
        const amount = accountBalance.hbars.toBigNumber().multipliedBy(compare.data[`${currency}`]).toFixed();

        res.status(200).json({ hbar: accountBalance.hbars.to(HbarUnit.Hbar).toFixed().toString(), amount });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default getBalance;
