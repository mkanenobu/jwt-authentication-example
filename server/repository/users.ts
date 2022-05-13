import { sha256 } from "../hash";
import { jwtVerify, jwtEncode } from "../jwt";

const userJwtKey = "B7D1830D-C556-4528-B961-BA9BF988FA72";

interface User {
  username: string;
  email: string;
  password: string;
}

export const mockUsers: User[] = [
  {
    username: "John",
    email: "john@example.com",
    password: sha256("john's password"),
  },
  {
    username: "Emma",
    email: "emma@example.com",
    password: sha256("emma's password"),
  },
];

export const findUserByUsername = (username: string): User | undefined =>
  mockUsers.find((u) => u.username === username);

export const verifyPassword = (
  hashedPassword: string,
  inputPassword: string
): boolean => sha256(inputPassword) === hashedPassword;

export const createUserToken = (username: string): string =>
  jwtEncode({ username }, userJwtKey, { expiresIn: "1h" });

export const verifyUserToken = (token: string) => jwtVerify(token, userJwtKey);
