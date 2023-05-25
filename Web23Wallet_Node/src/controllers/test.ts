import { Request, Response } from "express"
import axios from "axios"

const SearchWeb3Domain = async (req: Request, res: Response) => {
    let domainName: string = "";

    if (req.body.domainName)
        domainName = req.body.domainName;

    try {
        const data = await axios.post(
            `https://internaltesting.web23.io/api/0x9874832u3dfj38942jnxjh9872380`,
            {
                token: "localtoken475648gf263r392873ehfdiu327f987235",
                domainName,
            }
        );
        res.status(200).json({ data: data.data })
    } catch (e: any) {
        res.status(400).json({ message: e.message })
     }
}

const SearchResolveWeb3Domain = async (req: Request, res: Response) => {
    let domainName: string = "";

    if (req.body.domainName)
        domainName = req.body.domainName;

    try {
        const data = await axios.post(
            `https://internaltesting.web23.io/api/0x8764894720194876485732958`,
            {
                token: "localtoken475648gf263r392873ehfdiu327f987235",
                domainName,
            }
        );
        res.status(200).json({ data: data.data })
    } catch (e: any) {
        res.status(400).json({ message: e.message })
    }
}

export default SearchWeb3Domain

export { SearchResolveWeb3Domain }