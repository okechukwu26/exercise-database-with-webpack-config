import React from "react";
import { hydrate } from "react-dom";
import "./index.css";
import App from "./App";
import { MuscleProvider } from "./context";
import { JssProvider } from "react-jss";
import {
  ThemeProvider as MuiThemeProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
const generateClassName = createGenerateClassName();

console.log("working again");
hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuscleProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </MuscleProvider>
  </JssProvider>,
  document.getElementById("root"),
  () => {
    document.getElementById("jss-style").remove();
  }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
