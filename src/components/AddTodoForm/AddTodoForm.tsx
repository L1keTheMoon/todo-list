import { useState, type ChangeEvent } from "react";
import { Box, Button, TextField } from "@mui/material";

export default function AddTodoForm({
  addTodo,
}: {
  addTodo: (todoText: string) => void;
}) {
  const [todoText, setTodoText] = useState("");
  const [error, setError] = useState("");

  const clickHandler = () => {
    if (todoText.trim()) {
      addTodo(todoText);
      setTodoText("");
    } else {
      setError("Введите текст!");
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
    setError("");
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        id="new-todo-text"
        label="Что нужно будет сделать?"
        variant="outlined"
        value={todoText}
        onChange={changeHandler}
        error={Boolean(error)}
        helperText={error}
        sx={{ width: "100%" }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            clickHandler();
          }
        }}
      />
      <Button variant="contained" onClick={clickHandler} sx={{ height: 56 }}>
        Добавить
      </Button>
    </Box>
  );
}
