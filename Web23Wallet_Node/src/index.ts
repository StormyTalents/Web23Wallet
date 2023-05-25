import app from "./app";
import mongoose from "mongoose";
import { NODE_ENV, DATABASE_URL, PORT } from "./config/config";

// Exit on error
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(1);
});

// Mongoose logs in development environment
if (NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

let server: any;
mongoose.connect(DATABASE_URL).then(() => {
  console.log(`🚀 Connected to MongoDB 🚀`);

  server = app.listen(PORT, () => {
    console.log(`🚀 Server is running 🚀`);
    console.log(`🚀 Listening on ${PORT} with NODE_ENV=${NODE_ENV} 🚀`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
