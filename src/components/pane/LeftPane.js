import React, { useContext, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { MuscleContext } from "../../context";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const style = (theme) => ({
  paper: {
    padding: 20,

    textTransform: "capitalize",
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 39px)",
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%",
    },
  },
});

function LeftPane(props) {
  const { classes } = props;
  const {
    getMuscles,
    category,
    rightSelect,
    DeleteMuscle,
    EditMuscle,
  } = useContext(MuscleContext);
  const exercise = getMuscles();

  return (
    <Paper className={classes.paper}>
      {exercise.map(([group, exercise]) =>
        !category || category === group ? (
          <Fragment key={group}>
            <Typography variant="h5" color="secondary">
              {group}
            </Typography>
            <List component="ul">
              {exercise.map(({ title, id }, index) => (
                <ListItem button key={index}>
                  <ListItemText
                    primary={title}
                    onClick={() => rightSelect(id)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => EditMuscle(id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => DeleteMuscle(id)}
                      color="primary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Fragment>
        ) : null
      )}
    </Paper>
  );
}
LeftPane.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(LeftPane);
