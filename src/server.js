import express from "express";
import React from "react";
import App from "./App";
import { renderToString } from "react-dom/server";
import { MuscleProvider } from "./context";
import {
  ThemeProvider as MuiThemeProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import reload from "reload";
import theme from "./theme";
import { SheetsRegistry } from "react-jss";
import { JssProvider } from "react-jss";

const app = express();
const port = 3000;
const dev = process.env.NODE.ENV == "development";

app.use(express.static("public"));
if (dev) {
  reload(app);
}
app.use((req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const html = renderToString(
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuscleProvider>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </MuscleProvider>
    </JssProvider>
  );
  const css = sheetsRegistry.toString();
  res.send(`
    <!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8' />

    <meta name='viewport' content='width=device-width, initial-scale=1' />
    
    
    <title>React App</title>
    <style id='jss-style'>${css}</style>
  </head>
  <body>
       <div id='root'>${html}</div>
       <script src='main.js' async></script>
       ${dev ? `<script src='/reload/reload.js'></script>` : ""}
  
  </body>
</html>

    `);
});
app.listen(port, () => console.log(`server is up on port ${port}`));
