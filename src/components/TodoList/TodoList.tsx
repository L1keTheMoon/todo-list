import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Typography,
} from "@mui/material";
import type { Todo } from "@/types/types";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (index: number) => void;
}

export default function TodoList({ todos, toggleTodo }: TodoListProps) {
  if (todos.length) {
    return (
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {todos.map(({ text, completed }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => toggleTodo(index)}
              dense
            >
              <Checkbox edge="start" checked={completed} disableRipple />
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  } else {
    return (
      <Typography variant="h4" fontWeight={500} sx={{ my: 2 }}>
        В списке ничего нет...
      </Typography>
    );
  }
}
