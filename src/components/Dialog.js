import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import { MuscleContext } from "../context";
import MenuItem from "@material-ui/core/MenuItem";

const style = (theme) => ({
  form: {
    maxWidth: "500px",
  },
});

function FormDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const {
    muscles,
    form: { title, description, muscle },
    handleChange,
    handleSubmit,
    localStorage,
  } = useContext(MuscleContext);

  const { classes } = props;
  const handleClose = () => {
    setOpen(false);
    handleSubmit();
    localStorage();
  };
  return (
    <div>
      <IconButton
        aria-label="Add Exercise"
        color="secondary"
        variant="contained"
        onClick={handleClickOpen}
      >
        <Add />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Create a new Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill the form below</DialogContentText>
          <form className={classes.form}>
            <TextField
              label="title"
              fullWidth
              value={title}
              onChange={handleChange("title")}
              margin="normal"
            />
            <TextField
              id="standard-select-currency"
              select
              helperText="Please select your Exercise"
              fullWidth
              margin="normal"
              value={muscle}
              onChange={handleChange("muscle")}
            >
              {muscles.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="description"
              multiline
              rows="4"
              fullWidth
              value={description}
              onChange={handleChange("description")}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={!title || !muscle}
            variant="outlined"
            color="primary"
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default withStyles(style)(FormDialog);
