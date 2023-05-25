import { Client } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

const tokenType = {
  ACCESS: "access",
};

const MAINNET_MIRROR_API_URL = "https://mainnet-public.mirrornode.hedera.com/api";
const TESTNET_MIRROR_API_URL = "https://testnet.mirrornode.hedera.com/api";

const TEST_OPERATOR_ID = process.env.OPERATOR_ACCOUNT_ID as string || "";
const TEST_OPERATOR_KEY = process.env.OPERATOR_PRIVATE_KEY as string || "";
const MAIN_OPERATOR_ID = process.env.MAIN_OPERATOR_ACCOUNT_ID as string || "";
const MAIN_OPERATOR_KEY = process.env.MAIN_OPERATOR_PRIVATE_KEY as string || "";

const mainnetClient = Client.forMainnet().setOperator(MAIN_OPERATOR_ID, MAIN_OPERATOR_KEY);
const testnetClient = Client.forTestnet().setOperator(TEST_OPERATOR_ID, TEST_OPERATOR_KEY);

const NODE_ENV = process.env.NODE_ENV || "development";
const DATABASE_URL = process.env.DATABASE_URL || "";
const PORT = process.env.PORT || 3000;
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "";
const PINATA_JWT = process.env.PINATA_JWT

const smartDomains = [
  "0.0.1234197",
  "0.0.1281028",
  "0.0.1459500",
  "0.0.1435675",
  "0.0.1414512",
  "0.0.1238605",
  "0.0.1303118",
  "0.0.1486593",
  "0.0.1463270",
  "0.0.1292146",
]

const popularTokenId = [
  "0.0.456858",
  "0.0.731861",
  "0.0.968069",
  "0.0.624505",
  "0.0.127877",
  "0.0.751086",
  "0.0.209368",
  "0.0.777336",
  "0.0.786931",
  "0.0.834116",
  "0.0.868062",
  "0.0.859814",
  "0.0.784681",
  "0.0.887176",
  "0.0.926385",
  "0.0.896303",
  "0.0.959595",
  "0.0.951157",
  "0.0.1079680",
  "0.0.1128957",
  "0.0.1144501",
  "0.0.1111899",
  "0.0.1109951",
  "0.0.1159074",
  "0.0.1186797",
  "0.0.586965",
  "0.0.629591",
]

export {
  tokenType,
  mainnetClient,
  testnetClient,
  MAINNET_MIRROR_API_URL,
  TESTNET_MIRROR_API_URL,
  NODE_ENV,
  DATABASE_URL,
  PORT,
  JWT_ACCESS_TOKEN_SECRET,
  smartDomains,
  popularTokenId,
  TEST_OPERATOR_ID,
  TEST_OPERATOR_KEY,
  MAIN_OPERATOR_ID,
  MAIN_OPERATOR_KEY,
  PINATA_JWT
};
