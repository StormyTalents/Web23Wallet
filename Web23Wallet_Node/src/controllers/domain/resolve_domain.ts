import { Request, Response } from "express";
import axios from "axios";

var qs = require('qs');
/**
 * Resolve Web3 domain endpoint
 */

const resolveDomain = async (req: Request, res: Response) => {
    try {
        const { resolveId } = req.body.params;
        var data = {
            token:
            "jasdjhajshdkajhdsakjdhakjgweydhbd87qye98dihwqh92bewufb8u18chvwb891v8b871uvy819vyy",
            domainNames: resolveId,
        };
        const bin = await axios.post("https://app.web23.io/resolver/domains/searchDomain", qs.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        
        res.status(200).json({ accountId: bin.data.data });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default resolveDomain;
