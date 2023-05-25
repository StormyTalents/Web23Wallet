import { Request, Response } from "express";
import axios from "axios";

/**
 * get web2 domain endpoint
 */

const updateDomainInfo = async (req: Request, res: Response) => {
    try {
        const { sso, domain, renewChecked, lockChecked, domainChecked } = req.body.params;

        const bin = await axios.patch(
            `https://api.godaddy.com/v1/domains/${domain}`, {
                "renewable": renewChecked,
                "locked": lockChecked,
                "transferProtected": domainChecked
        }, { headers: { Authorization: sso, 'Content-Type': 'application/json' } }
        );
        res.status(200).json({ message: 'successfully changed' });
    } catch (e: any) {
        console.log(e)
        res.status(400).json({ message: e.message });
    }
};

export default updateDomainInfo;
