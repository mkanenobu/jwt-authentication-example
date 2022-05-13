import { Buffer } from "buffer";
import { jwtVerify, jwtEncode } from "./jwt";

const key = "secret";

const payload = {
  userId: "123",
};

const encoded = jwtEncode(payload, key);
console.log("encoded: ", encoded);

const decoded = jwtVerify(encoded, key);
console.log("decoded: ", decoded);
