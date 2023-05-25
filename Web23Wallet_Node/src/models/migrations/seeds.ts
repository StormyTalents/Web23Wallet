import mongoose from "mongoose";

import { User } from "../User";
import { DATABASE_URL } from "../../config/config";

const users = [
  {
    token: "test token1",
    privKey: "test privKey1",
    pubKey: "test pubKey1",
    accountId: "0.0.1234",
    mnemonicWord: "test mnemonic1",
  },
  {
    token: "test token2",
    privKey: "test privKey2",
    pubKey: "test pubKey2",
    accountId: "0.0.1234",
    mnemonicWord: "test mnemonic2",
  },
  {
    token: "test token3",
    privKey: "test privKey3",
    pubKey: "test pubKey3",
    accountId: "0.0.1234",
    mnemonicWord: "test mnemonic3",
  },
];

// Set Up the Database connection

const initialSeed = async () => {
  mongoose.connect(DATABASE_URL, (error) => {
    if (error) {
      console.log("Connection Error");
    }
  });
  console.log("Successfully connected");
  User.insertMany(users);
  console.log("Successfully seeds launched");
};

initialSeed();
