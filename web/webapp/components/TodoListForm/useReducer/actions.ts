import { TodoListItem } from "@interfaces/TodoList";

enum ActionTypes {
  SetName = "SET_NAME",
  SetNewBlankItem = "SET_NEW_BLANK_ITEM",
  SetItemDescription = "SET_ITEM_DESCRIPTION",
}

interface ItemDescriptionPayload {
  /**
   * TodoList Item ID.
   */
  id: string;

  /**
   * Description of the TodoList Item.
   */
  description: string;
}

interface ActionCreator {
  type: ActionTypes;
  payload: any;
}

interface SetNameActionCreator extends ActionCreator {
  /**
   * Name of the Todo List.
   */
  payload: string;
}

interface SetNewBlankItemActionCreator extends ActionCreator {
  /**
   * TodoList item.
   */
  payload: TodoListItem;
}

interface SetItemDescriptionActionCreator extends ActionCreator {
  /**
   * Item Description payload.
   */
  payload: ItemDescriptionPayload;
}

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
 * @param payload Item Description Payload.
 * @returns Action Creator.
 */
const SetItemDescription = (
  item: ItemDescriptionPayload
): SetItemDescriptionActionCreator => ({
  type: ActionTypes.SetItemDescription,
  payload: item,
});

export { ActionTypes, setName, setNewBlankItem, SetItemDescription };
export type {
  ActionCreator,
  SetNameActionCreator,
  SetNewBlankItemActionCreator,
  SetItemDescriptionActionCreator,
  ItemDescriptionPayload,
};
