import express from "express";

import newAccount from "../controllers/account/new_account";
import getBalance from "../controllers/account/get_balance"
import getHistory from "../controllers/account/get_history"

import getDomain from "../controllers/domain/get_domain"
import getTLD from "../controllers/domain/get_tld"
import resolveDomain from "../controllers/domain/resolve_domain"
import SearchDomain from "../controllers/domain/search_domain"
import getDomainInfo from "../controllers/domain/domain_info"
import updateDomainInfo from "../controllers/domain/update_domain"

import showNFTs from "../controllers/token/show_nfts";
import sendHbar from "../controllers/token/send_hbar";
import getTokenInfo from "../controllers/token/get_tokenInfo";
import sendNFT from "../controllers/token/send_nft";
import createNFT from "../controllers/token/create_nft";
import associateToken from "../controllers/token/change_association"

import isValidRequest from "../middleware/isValidRequest"

import SearchWeb3Domain from "../controllers/test"
import { SearchResolveWeb3Domain } from "../controllers/test"

const router = express.Router();

router.post("/new_account", newAccount);
router.post("/get_balance", isValidRequest, getBalance);
router.post("/get_history", isValidRequest, getHistory);

router.post("/get_domain", isValidRequest, getDomain);
//router.post("/get_tld", isValidRequest, getTLD);
router.post("/get_tld", isValidRequest, getTLD);
router.post("/resolve_domain", isValidRequest, resolveDomain);
router.post("/search_domain", SearchDomain);
router.post("/domain_info", isValidRequest, getDomainInfo);
router.post("/update_domain_info", isValidRequest, updateDomainInfo)

router.post("/get_nfts", isValidRequest, showNFTs);
router.post("/send_hbar", isValidRequest, sendHbar);
router.post("/get_tokenInfo", isValidRequest, getTokenInfo);
router.post("/send_nft", isValidRequest, sendNFT);
router.post("/create_nft", isValidRequest, createNFT);
router.post("/change_association", isValidRequest, associateToken)

router.post("/search_web3_domain", SearchWeb3Domain)
router.post("/search_reslve_domain", SearchResolveWeb3Domain)

export default router;
