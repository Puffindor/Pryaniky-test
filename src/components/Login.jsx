import { Button, TextField } from "@mui/material";
import { React, useState } from "react";
import "../styles/Login.css";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
const Login = function ({ HOST, setToken }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  let info = {
    username: login,
    password: password,
  };

  async function signIn() {
    setLoaded(false);
    setAlert(false);
    setError(false);
    try {
      let response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        method: "POST",
        body: JSON.stringify(info),
      });
      let result = await response.json();
      console.log(result);
      setLoaded(true);
      if (result.data !== null) {
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userName", info.username);
      } else {
        setLogin("");
        setPassword("");
        setAlert(true);
      }
    } catch {
      setError(true);
    }
  }
  return (
    <div className="login_container">
      {error ? (
        <div className="alert">
          <Alert severity="error">Не удалось подключиться к севреру!</Alert>
        </div>
      ) : (
        <div></div>
      )}

      {alert ? (
        <div className="alert">
          <Alert severity="error">Неверный логин или пароль!</Alert>
        </div>
      ) : (
        <div></div>
      )}
      <div className="login">
        <TextField
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          id="outlined-basic"
          label="Login"
          variant="outlined"
        />
        <TextField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="filled-basic"
          label="Password"
          variant="outlined"
        />

        {loaded ? (
          <Button onClick={signIn} variant="contained">
            Login
          </Button>
        ) : (
          <LinearProgress />
        )}
      </div>
    </div>
  );
};

export default Login;
