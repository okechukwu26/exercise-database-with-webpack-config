import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Dialog from "./Dialog";

function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flex: 1 }}>
            Exercise Database
          </Typography>
          <Dialog />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
