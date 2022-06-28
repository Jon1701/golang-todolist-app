import { TodoList, TodoListItem } from "@interfaces/TodoList";

import {
  Action,
  ActionTypes,
  SetNewBlankItemActionCreator,
  ItemDescriptionPayload,
  ItemIsCompletePayload,
} from "./actions";

/**
 * Modifies the TodoList state.
 *
 * @param state Existing state.
 * @param action Action.
 * @returns Modified state.
 */
const todoListReducer = (state: TodoList, action: Action) => {
  switch (action.type) {
    case ActionTypes.SetTodoList:
      return action.payload;

    case ActionTypes.SetName:
      return { ...state, name: action.payload };

    case ActionTypes.SetNewBlankItem: {
      // Typeguard the payload.
      const p: SetNewBlankItemActionCreator["payload"] =
        action.payload as SetNewBlankItemActionCreator["payload"];

      const items = state.items?.slice() || [];
      items.push(p);
      return { ...state, items };
    }

    case ActionTypes.SetItemDescription: {
      // Typeguard the payload.
      const p: ItemDescriptionPayload =
        action.payload as ItemDescriptionPayload;

      if (state.items === undefined) {
        return state;
      }

      // Create copy of items array.
      const items = state.items.slice();

      // Get index of the given TodoList item in the items array.
      const idx: number = items.findIndex(
        (currentItem: TodoListItem) => currentItem.id === p.id
      );

      items[idx].description = p.description;

      return { ...state, items };
    }

    case ActionTypes.SetItemIsComplete: {
      if (state.items === undefined) {
        return state;
      }

      // Typeguard the payload.
      const p = action.payload as ItemIsCompletePayload;

      // Create copy of items array.
      const items = state.items.slice();

      // Get index of the given TodoList item in the items array.
      const idx: number = items.findIndex(
        (currentItem: TodoListItem) => currentItem.id === p.id
      );

      if (idx > -1) {
        items[idx].isComplete = p.isComplete;
      }

      return { ...state, items };
    }

    case ActionTypes.DeleteItem: {
      if (state.items === undefined) {
        return state;
      }

      // Create copy of items array.
      const items = state.items.slice();

      // Get index of the given TodoList item in the items array.
      const idx: number = items.findIndex(
        (currentItem: TodoListItem) => currentItem.id === action.payload
      );

      // Delete element at given index.
      items.splice(idx, 1);

      return { ...state, items };
    }

    default:
      return state;
  }
};

export default todoListReducer;
