import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import "../styles/SideBar.css";

export default function ButtonAppBar({ userName, setToken }) {
  function logut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken("");
  }
  return (
    <div className="sidebar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <span className="user">{userName}</span>
            <Button variant="outlined" color="inherit" onClick={logut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
