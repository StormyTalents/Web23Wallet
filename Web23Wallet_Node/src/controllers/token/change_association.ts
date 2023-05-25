import { AccountId, PrivateKey, TokenAssociateTransaction, TokenDissociateTransaction } from "@hashgraph/sdk";
import { Request, Response } from "express";
import { mainnetClient, testnetClient, TEST_OPERATOR_KEY } from "../../config/config";

/**
 * associate Token endpoint
 */

const associateToken = async (req: Request, res: Response) => {
    const { accountId, tokenId, net, type, priv } = req.body.params;
    const client = net ? mainnetClient : testnetClient;

    try {
        if (!type) {
            let associateAliceTx = await new TokenAssociateTransaction().setAccountId(AccountId.fromString(accountId)).setTokenIds([tokenId]).freezeWith(client).sign(PrivateKey.fromString(priv));
            let associateAliceTxSubmit = await associateAliceTx.execute(client);
            await associateAliceTxSubmit.getReceipt(client);
        }
        else {
            const transaction = await new TokenDissociateTransaction()
                .setAccountId(AccountId.fromString(accountId))
                .setTokenIds([tokenId])
                .freezeWith(client);
            const signTx = await transaction.sign(PrivateKey.fromString(priv));
            const txResponse = await signTx.execute(client);
            await txResponse.getReceipt(client);
        }


        res.status(200).json({ message: "successfully association" });

    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default associateToken;
