import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
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
    const newStatus = !todos[index].completed;
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos[index].completed = newStatus;
      return newTodos;
    });
  };

  const addTodo = (todoText: string) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos.push({ text: todoText, completed: false });
      return newTodos;
    });
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
        Список дел
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
