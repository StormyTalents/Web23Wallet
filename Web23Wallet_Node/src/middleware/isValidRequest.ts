import { RequestHandler } from "express";

import { verify } from "../utils/jwtHelpers";
import { tokenType, JWT_ACCESS_TOKEN_SECRET } from "../config/config";
import { User } from "../models/User";

const isValidRequest: RequestHandler = async (req, res, next) => {
 
  try {
    let accessToken = req.headers['authorization']?.includes("Bearer ") && req.headers['authorization']?.slice(7);

  if (!accessToken) res.status(400).json({message: 'invalid user token'});

  const tokenPayload: any = verify(
     accessToken || "",
     JWT_ACCESS_TOKEN_SECRET
  )

  if (!tokenPayload || tokenPayload?.tokenType !== tokenType.ACCESS)
    res.status(400).json({ message: 'invalid user token' });

  User.countDocuments({ token: accessToken }, function (err: any, count: number) {
    if (count > 0) {
      next();
    }
    else {
      res.status(400).json({ message: 'invalid user token' });
    }
  });
} catch(e) {
    res.status(400).json({ message: 'invalid user token' });
} 
};

export default isValidRequest;
