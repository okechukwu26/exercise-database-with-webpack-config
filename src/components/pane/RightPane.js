import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { MuscleContext } from "../../context";
import Form from "../Form";

const style = (theme) => ({
  paper: {
    padding: "20px",

    textTransform: "capitalize",
    [theme.breakpoints.up("sm")]: {
      height: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
    },
  },
  muscle: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: "20px",
    },
  },
});

function RightPane(props) {
  const { classes } = props;
  const { right, editMode } = useContext(MuscleContext);

  const {
    muscle = "Welcome!",
    description = "Please select an exerciase from the list on the left",
  } = right;

  return (
    <Paper className={classes.paper}>
      {editMode ? (
        <Form />
      ) : (
        <>
          <Typography variant="h3" color="secondary" className={classes.muscle}>
            {muscle}
          </Typography>
          <Typography varaint="subheading">{description}</Typography>
        </>
      )}
    </Paper>
  );
}
RightPane.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(RightPane);
