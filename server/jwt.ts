import jsonWebToken, { Secret, JwtPayload, SignOptions } from "jsonwebtoken";

export const jwtEncode = (
  payload: object,
  key: Secret,
  options?: SignOptions
): string => {
  const s = jsonWebToken.sign(payload, key, options);
  return s;
};

export const jwtVerify = (token: string, key: Secret): JwtPayload => {
  const p = jsonWebToken.verify(token, key);
  if (typeof p === "string") {
    throw new Error("Value must be object.");
  }

  return p;
};
