import { createHash } from "crypto";

export const sha256 = (payload: string): string =>
  createHash("SHA256").update(payload).digest("hex");
