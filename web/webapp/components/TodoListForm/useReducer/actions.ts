import { TodoListItem } from "@interfaces/TodoList";

enum ActionTypes {
  SetName = "SET_NAME",
  SetNewBlankItem = "SET_NEW_BLANK_ITEM",
  SetItemDescription = "SET_ITEM_DESCRIPTION",
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

interface SetItemDescriptionActionCreator {
  /**
   * Action Type.
   */
  type: ActionTypes;

  /**
   * TodoList item.
   */
  payload: TodoListItem;
}

type ActionCreator =
  | SetNameActionCreator
  | SetNewBlankItemActionCreator
  | SetItemDescriptionActionCreator;

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

/**
 * Creates the SET_ITEM_DESCRIPTION Action.
 * @param item TodoList Item.
 * @returns Action Creator.
 */
const SetItemDescription = (
  item: TodoListItem
): SetItemDescriptionActionCreator => ({
  type: ActionTypes.SetItemDescription,
  payload: item,
});

export { ActionTypes, setName, setNewBlankItem, SetItemDescription };
export type { ActionCreator, SetNameActionCreator };
