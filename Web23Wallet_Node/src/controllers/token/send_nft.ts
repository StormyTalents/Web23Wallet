import { TransferTransaction, Client, NftId, TokenId, AccountId, PrivateKey, TokenAssociateTransaction } from "@hashgraph/sdk";
import { Request, Response } from "express";
import { mainnetClient, testnetClient, TEST_OPERATOR_KEY } from "../../config/config";

/**
 * send NFT endpoint
 */

const sendNFT = async (req: Request, res: Response) => {
    const { accountId, sendAccountId, token, net, memo, priv } = req.body.params;
    const mintClient = net ? Client.forMainnet().setOperator(accountId, priv) : Client.forTestnet().setOperator(accountId, priv);
    const client = net ? mainnetClient : testnetClient;
    const token_info = token.split("-"); 
    let tokenTransferTx;

    try {
   
        if (memo.length > 0)
            tokenTransferTx = await new TransferTransaction().addNftTransfer(token_info[0], token_info[1], accountId, sendAccountId).setTransactionMemo(memo).freezeWith(client).sign(priv);
        else {
            tokenTransferTx = await new TransferTransaction()
                .addNftTransfer(TokenId.fromString(token_info[0]), parseInt(token_info[1]), AccountId.fromString(accountId), AccountId.fromString(sendAccountId))
                .freezeWith(mintClient)
                .sign(PrivateKey.fromString(priv));
        }

        let tokenTransferSubmit = await tokenTransferTx.execute(mintClient);
        let tokenTransferRx = await tokenTransferSubmit.getReceipt(mintClient);

        res.status(200).json({ message: "successfully sent" });

    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default sendNFT;
