import { useState } from "react";
import TodoList from "@/components/TodoList/TodoList";
import { Filter, type Todo } from "@/types/types";
import Menu from "@/components/Menu/Menu";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import { Container, Typography } from "@mui/material";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  let displayedTodos: Todo[] = todos;

  const toogleTodo = (index: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((el, i) => {
        if (i === index) {
          return { ...el, completed: !el.completed };
        } else {
          return el;
        }
      });
    });
  };

  const addTodo = (todoText: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { text: todoText, completed: false },
    ]);
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((el) => !el.completed));
  };

  if (filter !== Filter.all) {
    if (filter === Filter.active) {
      displayedTodos = todos.filter((el) => !el.completed);
    } else {
      displayedTodos = todos.filter((el) => el.completed);
    }
  }

  return (
    <Container sx={{ width: 700 }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        Список дел для Mindbox
      </Typography>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={displayedTodos} toggleTodo={toogleTodo} />
      <Menu
        activeCount={todos.reduce(
          (acc, el) => (el.completed ? acc : acc + 1),
          0
        )}
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />
    </Container>
  );
}

export default App;
