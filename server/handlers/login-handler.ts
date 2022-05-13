import type { Handler } from "express";
import {
  createUserToken,
  findUserByUsername,
  verifyPassword,
} from "../repository/users";

export const loginHandler: Handler = (req, res) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);
  if (!user || !verifyPassword(user.password, password)) {
    res.status(401).send();
    return;
  }

  const userToken = createUserToken(username);

  res.json({ token: userToken });
};
