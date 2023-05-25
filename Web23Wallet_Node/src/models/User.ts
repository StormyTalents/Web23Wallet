import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    token: { type: String },
    privKey: { type: String },
    pubKey: { type: String },
    accountId: { type: String },
    mnemonicWord: { type: String },
  },

  { collection: "userdetail", timestamps: true }
);

const User = mongoose.model("UserDetail", UserSchema);

export { User };
