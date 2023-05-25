import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AccountCreateTransaction, Hbar } from "@hashgraph/sdk";
import {
  PrivateKey,  
} from "@hashgraph/sdk";
import { User } from "../../models/User";

import {
  tokenType,
  mainnetClient,
  testnetClient,
  JWT_ACCESS_TOKEN_SECRET,
} from "../../config/config";

/**
 * Create new account endpoint
 */
const newAccount = async (req: Request, res: Response) => {
  try {
  const { privKey, pubKey, mnemonicWord, net } = req.body.params;

    const newAccountPrivateKey = PrivateKey.fromString(privKey);
    const newAccountPubKey = newAccountPrivateKey.publicKey;
    
  const tokenData = { tokenType: tokenType.ACCESS, privKey, pubKey, mnemonicWord };
  const token = jwt.sign(JSON.stringify(tokenData), JWT_ACCESS_TOKEN_SECRET);
  const transaction = net ? new AccountCreateTransaction()
    .setKey(newAccountPubKey):new AccountCreateTransaction().setKey(newAccountPubKey).setInitialBalance(Hbar.fromString("100"));

    const txResponse = await transaction.execute(net ? mainnetClient : testnetClient);

    const receipt = await txResponse.getReceipt(net ? mainnetClient : testnetClient);
    const accountId = receipt.accountId;

    User.countDocuments({ token }, function (err : any, count: number) {
      if (count > 0) {
        User.findOne({token}, function(err: any, docs: any) {
          if (!err) res.status(200).json({ token: docs.token, accountId: docs.accountId });
          else
            res.status(200).json({ message: "something went wrong" });
        })
      }
      else {
        User.insertMany([{ token, privKey, pubKey, accountId, mnemonicWord }]);
        res.status(200).json({ token, privKey, pubKey, accountId: accountId?.toString(), mnemonicWord });
      }
    });
  } catch (error: any) {
    console.log(error.message)
    res.status(400).json({ message: error.message });
  }
};

export default newAccount;
