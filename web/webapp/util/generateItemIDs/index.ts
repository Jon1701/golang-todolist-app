import { TodoList } from "@interfaces/TodoList";
import { v4 as uuidv4 } from "uuid";

/**
 * Generate IDs for items in a TodoList.
 *
 * @param formValues Todo List.
 * @returns Todo List with IDs for each item.
 */
const generateItemIDs = (formValues: TodoList): TodoList => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const copy: TodoList = JSON.parse(JSON.stringify(formValues));

  if (copy.items !== undefined && copy.items.length > 0) {
    copy.items = copy.items.map((item) => {
      item.id = uuidv4();

      return item;
    });
  }

  return copy;
};

export default generateItemIDs;
