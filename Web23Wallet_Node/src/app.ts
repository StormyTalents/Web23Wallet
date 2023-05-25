import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import router from "./routes/router";

import { NODE_ENV } from "./config/config";

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     // @ts-ignore
//     origin: NODE_ENV,
//   })
// );
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

// Apply routes before error handling
app.use("/web23", router);

app.use("/", async (req, res, next) => {
  res.send({ online: true });
});

export default app;
