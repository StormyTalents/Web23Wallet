import { Request, Response } from "express";
import axios from "axios";

/**
 * get web2 domain endpoint
 */

const getDomain = async (req: Request, res: Response) => {
    try {
        const { sso } = req.body.params;
        
        const domain = await axios.get(
            "https://api.godaddy.com/v1/domains", { headers: { Authorization: sso }}
        );

        res.status(200).json({ domain: domain.data });
    } catch (e: any) {
        res.status(400).json({ message: e.message });
    }
};

export default getDomain;
