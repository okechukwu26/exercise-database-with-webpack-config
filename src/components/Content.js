import React from "react";
import LeftPane from "./pane/LeftPane";
import RightPane from "./pane/RightPane";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const style = (theme) => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px - 48px)",
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100% - 56px - 48px)",
    },
  },
  item: {
    [theme.breakpoints.down("xs")]: {
      height: "300px",
    },
  },
  "@global": {
    "html, body, #root": {
      height: "100%",
    },
  },
});
function Content(props) {
  const { classes } = props;
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={6} className={classes.item}>
        <LeftPane />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.item}>
        <RightPane />
      </Grid>
    </Grid>
  );
}

export default withStyles(style)(Content);
