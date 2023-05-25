import {Request, Response} from "express"
import axios from "axios"
var qs = require('qs');

const SearchDomain = async(req: Request, res: Response) => {
    let web2 : any = "";
    let web3 : any = "";

    let keyword, sso;
    if (req.body.params?.keyword)
        keyword = req.body.params.keyword;
    if (req.body.params?.sso)
        sso = req.body.params.sso;
    
    try { 
        web2 = await axios.get(
            `https://api.godaddy.com/v1/domains/available`,
            {
                params: { domain: keyword },
                headers: {
                    Authorization: sso,
                },
            }
        );
    } catch(e) { web2 = ""}
    try {
        web3 = await axios.post("https://internaltesting.web23.io/api/0x9874832u3dfj38942jnxjh9872380",
            {
                "token": "localtoken475648gf263r392873ehfdiu327f987235",
                domainName: keyword
            }
        ) || "";
        
    } catch(e: any) {
        web3 = "";
    }

    res.status(200).json({ web2: web2?.data || "", web3: web3?.data || "" })
}

export default SearchDomain