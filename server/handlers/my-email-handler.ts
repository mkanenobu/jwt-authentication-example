import type { Handler } from "express";
import { globalKeys } from "../global-keys";

export const myEmailHandler: Handler = (req, res) => {
  const currentUser = req.app.get(globalKeys.currentUser);
  res.json({ email: currentUser.email });
};
