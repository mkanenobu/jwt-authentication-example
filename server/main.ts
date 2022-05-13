import express, { type Express } from "express";
import cors from "cors";
import { loginHandler } from "./handlers/login-handler";
import { myEmailHandler } from "./handlers/my-email-handler";
import { verifyTokenMiddleware } from "./middleware/verify-token-middleware";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(8000, () => {
  console.log("Start server on http://localhost:8000");
});

app.post("/login", loginHandler);
app.get("/my-email", verifyTokenMiddleware, myEmailHandler);
