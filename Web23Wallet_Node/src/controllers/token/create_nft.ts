import { TokenCreateTransaction, Client, TokenType, Hbar, PrivateKey, TokenMintTransaction } from "@hashgraph/sdk";
import { Request, Response } from "express";

import { mainnetClient, testnetClient, PINATA_JWT } from "../../config/config";
/**
 * create NFT endpoint
 */

const createNFT = async (req: Request, res: Response) => {
    const { accountId, net, priv, memo, tokenName, ipfsHash } = req.body.params;
    const client = net ? mainnetClient : testnetClient;
    const mintClient = net ? Client.forMainnet().setOperator(accountId, priv) : Client.forTestnet().setOperator(accountId, priv);

    try {
        const adminKey = PrivateKey.generate();
        const supplyKey = PrivateKey.generate();
        const nftCreate = await new TokenCreateTransaction()
            .setTokenName(tokenName)
            .setTokenSymbol("F")
            .setTokenType(TokenType.NonFungibleUnique)
            .setTreasuryAccountId(accountId).setMaxTransactionFee(new Hbar(30))
            .setSupplyKey(supplyKey)
            .freezeWith(client).sign(PrivateKey.fromString(priv));
        const nftCreateTxSign = await nftCreate.sign(adminKey);
        const nftCreateSubmit = await nftCreateTxSign.execute(client);
        const nftCreateRx = await nftCreateSubmit.getReceipt(client);
        const tokenId = nftCreateRx.tokenId;

        // Mint new NFT
        const mintTx = await new TokenMintTransaction()
            .setTokenId(tokenId || "")
            .setMetadata([Buffer.from(`ipfs://${ipfsHash}`)])
            .freezeWith(mintClient).sign(PrivateKey.fromString(priv));

        const mintTxSign = await mintTx.sign(supplyKey);
        const mintTxSubmit = await mintTxSign.execute(mintClient);
        const mintRx = await mintTxSubmit.getReceipt(mintClient);

        res.status(200).json({ token: tokenId?.toString()  + ":" + mintRx.serials[0].toString() });

    } catch (e: any) {
        console.log(e)
        res.status(400).json({ message: e.message });
    }
};

export default createNFT;
