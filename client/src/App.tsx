import { useState, FC } from "react";
import { useLocalStorage } from "./use-local-storage";

const backendUrl = "http://localhost:8000";

const fetcher = {
  login: async (username: string, password: string) => {
    return fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());
  },
  getMyEmail: async (token: string) => {
    return fetch(`${backendUrl}/my-email`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
};

const Spacer: FC<{ height: string; width?: string }> = ({ height, width }) => (
  <div style={{ width, height }} />
);

const LoginForm: FC<{ token: string; setToken: (v: string) => void }> = ({
  token,
  setToken,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(e) => {
          e.preventDefault();
          fetcher
            .login(username, password)
            .then((r) => r.token && setToken(r.token));
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacer height="1rem" />
        <input type="submit" value="Login" />
      </form>
      <Spacer height="1rem" />
      Token:{"\n"}
      <textarea
        style={{ width: "100%" }}
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
    </div>
  );
};

const MyEmail: FC<{ token: string }> = ({ token }) => {
  const [myEmail, setMyEmail] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        onClick={() => {
          fetcher.getMyEmail(token).then((r) => r.email && setMyEmail(r.email));
        }}
      >
        Get My Email
      </button>
      Email:{"\n"}
      <code>{myEmail}</code>
    </div>
  );
};

const App: FC = () => {
  const [token, setToken] = useLocalStorage("token", "");

  return (
    <div>
      <LoginForm token={token} setToken={setToken} />
      <Spacer height="2rem" />
      <MyEmail token={token} />
    </div>
  );
};

export default App;
