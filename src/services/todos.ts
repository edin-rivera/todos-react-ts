import { type ListOfTodos } from "../types";

const API_URL = "https://api.jsonbin.io/v3/b/649e07a0b89b1e2299b7630e";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  order: number;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": import.meta.env.VITE_API_BIN_KEY,
    },
  });
  if (!res.ok) {
    return [];
  }

  const { record: todos } = await res.json();

  return todos;
};

export const updateTodos = async ({
  todos,
}: {
  todos: ListOfTodos;
}): Promise<boolean> => {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": import.meta.env.VITE_API_BIN_KEY,
    },
    body: JSON.stringify(todos),
  });

  return res.ok;
};
