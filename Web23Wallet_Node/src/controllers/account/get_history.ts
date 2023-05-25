import { Request, Response } from "express";
import axios from "axios";

import { MAINNET_MIRROR_API_URL, TESTNET_MIRROR_API_URL } from '../../config/config'
/**
 * Show NFTs endpoint
 */

const getHistory = async (req: Request, res: Response) => {
    try {
        const { accountId, net } = req.body.params;
        const transactions = net ? await axios(
            `${MAINNET_MIRROR_API_URL}/v1/accounts/${accountId}?transactionType=cryptotransfer`
        ) : await axios(
            `${TESTNET_MIRROR_API_URL}/v1/accounts/${accountId}?transactionType=cryptotransfer`);

        res.status(200).json({ transactions: transactions.data.transactions });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default getHistory;
