import { Request, Response } from "express";
import axios from "axios";
import { smartDomains } from "../../config/config"
/**
 * Get web3 domain endpoint
 */

const getTLD = async (req: Request, res: Response) => {
    const { accountId } = req.body.params;
    const web3Domain : string[] = []; 
    try {
        for (const domain of smartDomains) {
            let { data } = await axios(`https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${domain}/nfts?account.id=${accountId}`)
            for(const element of data.nfts) {
                let buff = atob(element.metadata);
                if (buff.length > 0 && buff.includes("ipfs://")) {
                    web3Domain.push(`https://ipfs.io/ipfs/${buff.slice(7)}`);
                }
            }
        }
        res.status(200).json({web3Domain});
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default getTLD;
