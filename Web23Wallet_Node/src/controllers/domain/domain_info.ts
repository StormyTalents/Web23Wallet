import { Request, Response } from "express";
import axios from "axios";

/**
 * get web2 domain endpoint
 */

const getDomainInfo = async (req: Request, res: Response) => {
    try {
        const { sso, domain } = req.body.params;

        const bin = await axios.get(
            `https://api.godaddy.com/v1/domains/${domain}`, { headers: { Authorization: sso } }
        );

        res.status(200).json({ info: bin.data });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default getDomainInfo;
