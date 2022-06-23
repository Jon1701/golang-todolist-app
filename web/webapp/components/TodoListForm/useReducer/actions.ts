import { TodoListItem } from "@interfaces/TodoList";

enum ActionTypes {
  SetName = "SET_NAME",
  SetNewBlankItem = "SET_NEW_BLANK_ITEM",
}

interface SetNameActionCreator {
  /**
   * Action Type.
   */
  type: ActionTypes;

  /**
   * Name of the Todo List.
   */
  payload: string;
}

interface SetNewBlankItemActionCreator {
  /**
   * Action Type.
   */
  type: ActionTypes;

  /**
   * TodoList item.
   */
  payload: TodoListItem;
}

type ActionCreator = SetNameActionCreator | SetNewBlankItemActionCreator;

/**
 * Creates the SET_NAME Action.
 * @param name Name of the Todo List.
 * @returns Action Creator.
 */
const setName = (name: string): SetNameActionCreator => ({
  type: ActionTypes.SetName,
  payload: name,
});

/**
 * Creates the SET_NEW_BLANK_ITEM Action.
 * @param item Blank TodoList Item.
 * @returns Action Creator.
 */
const setNewBlankItem = (item: TodoListItem): SetNewBlankItemActionCreator => ({
  type: ActionTypes.SetNewBlankItem,
  payload: item,
});

export { ActionTypes, setName, setNewBlankItem };
export type { ActionCreator, SetNameActionCreator };
