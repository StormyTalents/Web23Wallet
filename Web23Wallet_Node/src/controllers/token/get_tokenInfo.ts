import { Request, Response } from "express";
import axios from "axios";
import { popularTokenId, TESTNET_MIRROR_API_URL, MAINNET_MIRROR_API_URL } from "../../config/config"
/**
 * Get web3 domain endpoint
 */

const getTokenInfo = async (req: Request, res: Response) => {
    const { tokenId, accountId, net } = req.body.params;
    const popularToken: any[] = [];
    const api_url = net ? MAINNET_MIRROR_API_URL : TESTNET_MIRROR_API_URL;
    
    try {
        if (tokenId !== '') {
            const { data } = await axios(`${api_url}/v1/tokens/${tokenId}`)
            res.status(200).json({ token: data });
        } else {
            if (net)
                for (const token of popularTokenId) {
                    const { data } = await axios(`${MAINNET_MIRROR_API_URL}/v1/tokens/${token}`)
                    popularToken.push(data)
                }
            if (accountId !== '') {
                const tokens = await axios(`${api_url}/v1/tokens?account.id=${accountId}`);
   
                await Promise.all(tokens.data.tokens.map(async (item : any) => {

                    const { data } = await axios(`${api_url}/v1/tokens/${item.token_id}/nfts?account.id=${accountId}`)

                    for (let itemToken of data.nfts)
                    {
                        const metaData = Buffer.from(itemToken.metadata, 'base64').toString();
                        const nft = await axios("https://ipfs.io/ipfs/" + metaData.slice(7));
                        if (nft?.data)
                            popularToken.push({ ...itemToken, name: nft.data.name, image: "https://ipfs.io/ipfs/" + nft.data.image.slice(7)});
                        else
                            popularToken.push(itemToken);
                    }
                }))
            }

            res.status(200).json({ popularToken });
        }
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default getTokenInfo;
