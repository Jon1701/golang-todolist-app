import { TodoList } from "@interfaces/TodoList";

/**
 * Remove IDs from TodoList.
 *
 * @param formValues TodoList object.
 * @returns TodoList object without IDs.
 */
const removeIDs = (formValues: TodoList): TodoList => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const copy: TodoList = JSON.parse(JSON.stringify(formValues));

  if (copy.items !== undefined) {
    copy.items = copy.items.map((item) => {
      delete item.id;
      return item;
    });
  }

  delete copy.id;

  return copy;
};

export default removeIDs;
