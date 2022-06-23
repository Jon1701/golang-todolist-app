interface TodoList {
  id?: string;
  name: string;
  items?: Array<TodoListItem>;
}

interface TodoListItem {
  id?: string;
  description: string;
  isComplete: boolean;
}

export type { TodoList, TodoListItem };
