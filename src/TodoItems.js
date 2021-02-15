import { Checkbox, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  list: {
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    minHeight: 250,
    marginTop: 10,
    padding: 0,
  },
  listItem: {
    paddingLeft: 0,
    padding: 0,
  },
  listItemTextPrimary: {
    fontWeight: 600,
  },
  checkbox: {},
}));

function TodoItem(props) {
  const classes = useStyles();
  const { todoItem, completeTodoItem } = props;

  return (
    <ListItem className={classes.listItem}>
      <Checkbox
        className={classes.checkbox}
        checked={props.todoItem.done}
        onChange={() => completeTodoItem(props.todoItem)}
      />
      <ListItemText
        classes={{ primary: classes.listItemTextPrimary }}
        primary={todoItem.description}
      />
    </ListItem>
  );
}

function TodoItems(props) {
  const classes = useStyles();
  const { todoItems, completeTodoItem } = props;

  return (
    <List className={classes.list}>
      {todoItems.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          todoItem={todoItem}
          completeTodoItem={completeTodoItem}
        />
      ))}
    </List>
  );
}

export default TodoItems;
