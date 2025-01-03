import jwt, { Secret } from "jsonwebtoken";

const generateToken = (payload: any, secret: Secret) => {
  
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn:'7d',
  });
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
