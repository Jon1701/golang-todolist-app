import { TodoList, TodoListItem } from "@interfaces/TodoList";

enum ActionTypes {
  SetTodoList = "SET_TODO_LIST",
  SetName = "SET_NAME",
  SetNewBlankItem = "SET_NEW_BLANK_ITEM",
  SetItemDescription = "SET_ITEM_DESCRIPTION",
  SetItemIsComplete = "SET_ITEM_IS_COMPLETE",
  DeleteItem = "DELETE_ITEM",
}

interface ActionCreator {
  type: ActionTypes;
  payload: any;
}

interface SetTodoListActionCreator extends ActionCreator {
  /**
   * Todo list to store.
   */
  payload: TodoList;
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

interface SetItemIsCompleteActionCreator extends ActionCreator {
  /**
   * Item Description payload.
   */
  payload: ItemIsCompletePayload;
}

interface DeleteItemActionCreator extends ActionCreator {
  /**
   * ID of the TodoList Item to delete.
   */
  payload: string;
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

interface ItemIsCompletePayload {
  /**
   * TodoList Item ID.
   */
  id: string;

  /**
   * Indicates if the Item is completed.
   */
  isComplete: boolean;
}

/**
 * Creates the SET_TODO_LIST Action.
 * @param payload Todolist.
 * @returns Action Creator.
 */
const setTodoList = (payload: TodoList): SetTodoListActionCreator => ({
  type: ActionTypes.SetTodoList,
  payload,
});

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
const setItemDescription = (
  item: ItemDescriptionPayload
): SetItemDescriptionActionCreator => ({
  type: ActionTypes.SetItemDescription,
  payload: item,
});

/**
 * Creates the SET_ITEM_IS_COMPLETE Action.
 * @param item Payload.
 * @returns Action Creator.
 */
const setItemIsComplete = (
  item: ItemIsCompletePayload
): SetItemIsCompleteActionCreator => ({
  type: ActionTypes.SetItemIsComplete,
  payload: item,
});

/**
 * Creates the DELETE_ITEM Action.
 * @param id ID of the item to delete.
 * @returns Action Creator.
 */
const deleteItem = (id: string): DeleteItemActionCreator => ({
  type: ActionTypes.DeleteItem,
  payload: id,
});

/**
 * Action types.
 */
type Action =
  | SetTodoListActionCreator
  | SetNameActionCreator
  | SetNewBlankItemActionCreator
  | SetItemDescriptionActionCreator
  | SetItemIsCompleteActionCreator
  | DeleteItemActionCreator
  | DeleteItemActionCreator;

export {
  ActionTypes,
  setTodoList,
  setName,
  setNewBlankItem,
  setItemDescription,
  setItemIsComplete,
  deleteItem,
};
export type {
  Action,
  ActionCreator,
  SetTodoListActionCreator,
  SetNameActionCreator,
  SetNewBlankItemActionCreator,
  SetItemDescriptionActionCreator,
  SetItemIsCompleteActionCreator,
  DeleteItemActionCreator,
  ItemDescriptionPayload,
  ItemIsCompletePayload,
};
