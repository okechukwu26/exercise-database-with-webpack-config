import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";

export default createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: amber.A400,
      light: amber[200],
      dark: amber[800],
    },
    type: "dark",
  },
});
