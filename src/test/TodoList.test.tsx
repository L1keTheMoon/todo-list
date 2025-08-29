import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import App from "@/App";

describe("test", () => {
  const user = userEvent.setup();
  let input: HTMLInputElement;
  let addButton: HTMLButtonElement;
  const text = "Todo";

  beforeEach(() => {
    render(<App />);
    input = screen.getByRole("textbox");
    addButton = screen.getByRole("button", { name: "Добавить" });
  });

  test("Добавление дела в список", async () => {
    await user.type(input, text);
    expect(input).toHaveValue(text);
    await user.click(addButton);

    const newTodo = screen.getByTestId(`todo-${text}`);
    expect(newTodo).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("Ошибка при попытке добавить дело без названия и сброс ошибки при начале ввода", async () => {
    await user.click(addButton);
    expect(input).toBeInvalid();
    expect(screen.getByText("Введите текст!")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    await user.type(input, text);
    expect(input).toBeValid();
    expect(screen.queryByText("Введите текст!")).not.toBeInTheDocument();
  });

  test("Фильтрация списка", async () => {
    const all = screen.getByRole("button", { name: "Все" });
    const active = screen.getByRole("button", { name: "Активные" });
    const completed = screen.getByRole("button", { name: "Завершенные" });

    for (let i = 1; i < 6; i++) {
      const name = `${text}-${i}`;
      await user.type(input, name);
      await user.click(addButton);
      if (i % 2 === 0) {
        await user.click(screen.getByTestId(`todo-${name}`));
      }
    }

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    await user.click(active);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    await user.click(completed);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    await user.click(all);
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  test("Проверка счетчика и кнопки удаления завершенных дел", async () => {
    const clear = screen.getByRole("button", { name: "Удалить завершенные" });

    for (let i = 1; i < 6; i++) {
      await user.type(input, `${text}-${i}`);
      await user.click(addButton);
    }

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(screen.getByText("Осталось: 5")).toBeInTheDocument();

    for (let i = 1; i < 6; i++) {
      if (i % 2 === 0) {
        await user.click(screen.getByTestId(`todo-${text}-${i}`));
      }
    }
    await user.click(clear);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Осталось: 3")).toBeInTheDocument();
  });
});
