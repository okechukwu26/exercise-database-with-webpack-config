import React, { PureComponent } from "react";
import { muscles, exercise } from "./store";

const MuscleContext = React.createContext();

class MuscleProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      exercise,
      muscles,
      right: {},
      form: {
        id: "",
        title: "",
        description: "",
        muscle: "",
      },
      editMode: false,
      editState: {
        title: "",
        description: "",
        muscle: "",
      },
    };
  }

  componentDidMount() {
    const { form, exercise } = this.state;

    const { title, description, muscle } = form;
    let data = form;
    if (title === "" && description === "" && muscle === "") {
      return this.setState({
        exercise,
      });
    }

    let update;
    if (localStorage.getItem("exercise") === null) {
      update = [];
    } else {
      update = JSON.parse(localStorage.getItem("exercise"));
    }
    update.push([...exercise, data]);
    localStorage.setItem("exercise", JSON.stringify(update));
    document.addEventListener("DOMContentLoaded", () => {
      let exercis;
      if (localStorage.getItem("exercise") === null) {
        exercis = [];
      } else {
        exercis = JSON.parse(localStorage.getItem("exercise"));
        this.setState(({ exercise }) => {
          return {
            exercise: [...exercise, exercis],
          };
        });
      }
    });
  }
  getMuscles = () => {
    const { muscles } = this.state;

    const initMuscle = muscles.reduce(
      (ex, cat) => ({
        ...ex,
        [cat]: [],
      }),
      {}
    );
    const { exercise } = this.state;
    return Object.entries(
      exercise.reduce((exercises, exercise) => {
        const { muscle } = exercise;
        exercises[muscle] = exercises[muscle]
          ? [...exercises[muscle], exercise]
          : [exercise];

        return exercises;
      }, initMuscle)
    );
  };
  EditMuscle = (id) => {
    const { exercise } = this.state;
    let edit = exercise.find((item) => item.id === id);
    this.setState({
      editMode: true,
      edit,
      editState: {
        ...edit,
      },
    });
  };

  handleSelect = (category) => {
    this.setState(
      {
        category,
      },
      console.log(category)
    );
  };
  rightSelect = (id) => {
    const { exercise } = this.state;
    let right = exercise.find((ex) => ex.id === id);
    console.log(right);
    this.setState({
      right,
      editMode: false,
    });
  };
  localStorage = () => {
    console.log("yet");
    // const { form, exercise } = this.state;
    // let update;
    // if (localStorage.getItem("exercise") === null) {
    //   update = [];
    // } else {
    //   update = JSON.parse(localStorage.getItem("exercise"));
    // }
    // update.push([...exercise, form]);
    // localStorage.setItem("exercise", JSON.stringify(update));
    // document.addEventListener("DOMContentLoaded", () => {
    //   let exercis;
    //   if (localStorage.getItem("exercise") === null) {
    //     exercis = [];
    //   } else {
    //     exercis = JSON.parse(localStorage.getItem("exercise"));
    //     this.setState({
    //       exercise: exercis,
    //     });
    //   }
    // });
  };

  handleChange = (name) => ({ target: { value } }) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };
  handleSubmit = () => {
    const {
      form: { title, description, muscle },
    } = this.state;
    if (title === "" || description === "" || muscle === "") {
      return alert("please fill the form properly");
    }
    const { form } = this.state;
    form.id = form.title.toLocaleLowerCase().trim();

    this.setState(({ exercise }) => ({
      exercise: [...exercise, form],
    }));
    this.setState({
      form: {
        title: "",
        description: "",
        muscle: "",
      },
    });
  };
  handleEditState = (name) => ({ target: { value } }) => {
    this.setState({
      editState: {
        ...this.state.editState,
        [name]: value,
      },
    });
  };
  handleEditSubmit = (item) => {
    if (item.title === "" || item.description === "") {
      return alert("please fill appropriately");
    }
    this.setState(({ exercise }) => ({
      exercise: [...exercise.filter((ex) => ex.id !== item.id), item],
      editMode: false,
    }));
  };

  DeleteMuscle = (id) => {
    this.setState(({ exercise, editMode, form }) => ({
      exercise: exercise.filter((item) => item.id !== id),
      editMode: false,
    }));
  };
  handleClose = () => {
    this.setState({
      editMode: false,
    });
  };
  render() {
    return (
      <MuscleContext.Provider
        value={{
          ...this.state,
          getMuscles: this.getMuscles,
          handleSelect: this.handleSelect,
          rightSelect: this.rightSelect,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit,
          localStorage: this.localStorage,
          DeleteMuscle: this.DeleteMuscle,
          EditMuscle: this.EditMuscle,
          handleEditState: this.handleEditState,
          handleEditSubmit: this.handleEditSubmit,
          handleClose: this.handleClose,
        }}
      >
        {this.props.children}
      </MuscleContext.Provider>
    );
  }
}

export { MuscleContext, MuscleProvider };
