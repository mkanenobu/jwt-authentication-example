import type { Handler } from "express";
import { findUserByUsername, verifyUserToken } from "../repository/users";
import { globalKeys } from "../global-keys";
import { parseAuthorizationHeader } from "../jwt";

export const verifyTokenMiddleware: Handler = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const error401 = (r?: any) => res.status(401).send(r);

  if (!authHeader) {
    error401();
    return;
  }

  let userToken: string;
  try {
    const { bearerValue } = parseAuthorizationHeader(authHeader);
    userToken = bearerValue;
  } catch (e) {
    // @ts-ignore
    error401(e.message);
    return;
  }

  try {
    const token = verifyUserToken(userToken);

    const username = token.username;

    if (!username) {
      error401();
      return;
    }

    const user = findUserByUsername(username);
    req.app.set(globalKeys.currentUser, user);
    next();
  } catch (e) {
    error401(e);
  }
  next();
};
