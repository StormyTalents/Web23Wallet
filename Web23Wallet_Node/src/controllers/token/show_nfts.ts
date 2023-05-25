import { Request, Response } from "express";
import axios from "axios";

import { MAINNET_MIRROR_API_URL, TESTNET_MIRROR_API_URL } from '../../config/config'
/**
 * Show NFTs endpoint
 */

const showNFTs = async (req: Request, res: Response) => {
  try {
    const { accountId, net } = req.body.params;
    const tokens = net ? await axios(
      `${MAINNET_MIRROR_API_URL}/v1/tokens?account.id=${accountId}&type=NON_FUNGIBLE_UNIQUE`
    ) : await axios(
      `${TESTNET_MIRROR_API_URL}/v1/tokens?account.id=${accountId}&type=NON_FUNGIBLE_UNIQUE`
    );

    const nfts = await Promise.all(
      tokens.data.tokens.map(async (item: any) => {
        
        const nftBase64 = net ? await axios(
          `${MAINNET_MIRROR_API_URL}/v1/tokens/${item.token_id}/nfts?account.id=${accountId}`
        ) : await axios(
          `${TESTNET_MIRROR_API_URL}/v1/tokens/${item.token_id}/nfts?account.id=${accountId}`
        );

        const ipfsData = nftBase64.data.nfts.map((meta: any) => {
          const metaData = Buffer.from(meta.metadata, 'base64').toString();
          return metaData.includes("ipfs://") && {meta: metaData.slice(7), token: meta.token_id + "-" + meta.serial_number};
        })

        return { type: item.symbol, metaData: ipfsData};
      })
    );

    res.status(200).json({ nfts });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export default showNFTs;
