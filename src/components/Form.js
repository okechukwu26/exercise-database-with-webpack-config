import React, { useContext } from "react";
import { MuscleContext } from "../context";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
const style = (theme) => ({
  form: {
    maxWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "20px",
    },
  },
});

function Form(props) {
  const {
    editState,
    handleEditState,
    muscles,
    handleEditSubmit,
    handleClose,
  } = useContext(MuscleContext);

  const { title, description, muscle, id } = editState;
  const { classes } = props;
  console.log(id);

  return (
    <form className={classes.form}>
      <TextField
        label="title"
        value={title}
        fullWidth
        onChange={handleEditState("title")}
        margin="normal"
      />
      <TextField
        id="standard-select-currency"
        select
        helperText="Please select your Exercise"
        fullWidth
        margin="normal"
        value={muscle}
        onChange={handleEditState("muscle")}
      >
        {muscles.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="title"
        multiline
        rows="4"
        fullWidth
        value={description}
        onChange={handleEditState("description")}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "3px" }}
        onClick={() => handleEditSubmit(editState)}
        disabled={!title || !muscle}
      >
        Edit
      </Button>
      <Button variant="contained" color="primary" onClick={handleClose}>
        close
      </Button>
    </form>
  );
}

export default withStyles(style)(Form);
