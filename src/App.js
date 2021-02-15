import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import TodoInput from "./TodoInput";
import TodoItems from "./TodoItems";
import app from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_wDt68gsLZuWawczan6yJxmjJYhGus5s",
  authDomain: "fir-todo-f3cc9.firebaseapp.com",
  projectId: "fir-todo-f3cc9",
  storageBucket: "fir-todo-f3cc9.appspot.com",
  messagingSenderId: "876977500405",
  appId: "1:876977500405:web:550261906cffab8acbd5bc",
  measurementId: "G-BGK47RV1M4",
};

app.initializeApp(firebaseConfig);

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    justifyContent: "center",
    marginTop: 100,
  },
  todoListContainer: {
    margin: 10,
    padding: 20,
    width: 400,
    minHeight: 300,
    border: "2px solid",
    borderColor: theme.palette.primary.main,
  },
}));

const firestore = app.firestore();

function App() {
  const classes = useStyles();
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    firestore
      .collection("todos")
      .get()
      .then((snapshot) => {
        const todos = [];
        snapshot.forEach((todoDoc) => {
          const todoData = todoDoc.data();

          // Skip empty todo items
          if (todoData.description && todoData.description.length > 0) {
            todos.push({ id: todoDoc.id, ...todoData });
          }
        });
        setTodoItems(todos);
      });
  }, []);

  const addTodoItem = (todoItem) => {
    // Find a unique id for the new item by finding
    // the current maximum id, and adding 1.
    // Default the id of the first item in the list to 1.
    // Firestore requires the id be a string
    const id = (
      todoItems.reduce((currMax, item) => Math.max(currMax, item.id), 0) + 1
    ).toString();
    const createdAt = new Date();

    const newItem = { ...todoItem, id, createdAt };

    setTodoItems([...todoItems, newItem]);
    firestore.collection("todos").doc(newItem.id).set(newItem);
  };

  const completeTodoItem = (todoItemToComplete) => {
    const itemIdx = todoItems.findIndex(
      (item) => item.id === todoItemToComplete.id
    );

    // return w/out doing anything if the given
    // item is not in the list
    if (itemIdx < 0) {
      return;
    }

    const item = todoItems[itemIdx];
    setTodoItems([
      ...todoItems.slice(0, itemIdx),
      { ...item, done: true },
      ...todoItems.slice(itemIdx + 1),
    ]);
    firestore
      .collection("todos")
      .doc(item.id)
      .update({
        ...item,
        done: true,
      });
  };
  return (
    <div className={classes.app}>
      <div className={classes.todoListContainer}>
        <TodoInput addTodoItem={addTodoItem} />
        <TodoItems todoItems={todoItems} completeTodoItem={completeTodoItem} />
      </div>
    </div>
  );
}

export default App;
