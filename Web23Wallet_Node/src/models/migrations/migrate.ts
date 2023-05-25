// Require mongoose module
import mongoose from "mongoose";
import { exit } from "process";

import { User } from "../User";
import { DATABASE_URL } from "../../config/config";

// Set Up the Database connection
mongoose.connect(DATABASE_URL, (error) => {
  if (error) {
    console.log("Connection Error");
    exit(-1);
  }
});

// Create collection of Model
User.createCollection().then((collection) => {
  console.log("UserDetail Collection is created!");
  mongoose.disconnect();
  exit();
});
