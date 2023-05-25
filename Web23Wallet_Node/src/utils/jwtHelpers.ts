import jwt from "jsonwebtoken";

const sign = (payload : string , secret : string) => {
  
    return jwt.sign(payload, secret);
};

const verify = (token : string, secret : string) => {
    return jwt.verify(token, secret)
};

export { sign, verify };
