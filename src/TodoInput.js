import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    padding: 5,
  },
  todoItemForm: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "70%",
  },
  button: {
    width: "25%",
    fontWeight: "bold",
  },
}));

function TodoInput(props) {
  const classes = useStyles();
  const [todoItem, setTodoItem] = useState({
    id: null,
    description: "",
    done: false,
    createdAt: null,
    completedAt: null,
  });

  const handleChange = (event) => {
    setTodoItem({ ...todoItem, description: event.target.value });
  };

  const onAddTodoItem = (e) => {
    props.addTodoItem(todoItem);

    // clear the current todo item
    setTodoItem({ ...todoItem, id: null, description: "" });

    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <form className={classes.todoItemForm} onSubmit={onAddTodoItem}>
        <TextField
          className={classes.input}
          inputProps={{
            style: { fontWeight: "bold" },
          }}
          value={todoItem.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add
        </Button>
      </form>
    </div>
  );
}

export default TodoInput;
