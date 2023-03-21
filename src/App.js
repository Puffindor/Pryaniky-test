import { React, useState, useEffect } from "react";
import Login from "./components/Login";
import DataTable from "./components/DataTable";
import TopBar from "./components/TopBar";
import "./styles/App.css";

function App() {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const HOST = "https://test.v5.pryaniky.com";
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserName(localStorage.getItem("userName"));
  });
  return (
    <div className="container">
      {token ? (
        <TopBar setToken={setToken} userName={userName} />
      ) : (
        <div className="sidebar"></div>
      )}

      {token ? (
        <DataTable HOST={HOST} />
      ) : (
        <Login HOST={HOST} setUserName={setUserName} setToken={setToken} />
      )}
    </div>
  );
}

export default App;
