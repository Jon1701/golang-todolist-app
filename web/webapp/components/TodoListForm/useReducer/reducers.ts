import { ActionTypes, ActionCreator } from "./actions";
import { TodoList, TodoListItem } from "@interfaces/TodoList";

/**
 * Modifies the TodoList state.
 *
 * @param state Existing state.
 * @param action Action.
 * @returns Modified state.
 */
const todoListReducer = (state: TodoList, action: ActionCreator) => {
  switch (action.type) {
    case ActionTypes.SetName:
      return { ...state, name: action.payload };

    case ActionTypes.SetNewBlankItem: {
      const items = state.items?.slice() || [];
      items.push(action.payload);
      return { ...state, items };
    }

    case ActionTypes.SetItemDescription:
      {
        // Create copy of items array.
        const items = state.items.slice();

        // Get index of the given TodoList item in the items array.
        const idx: number = items.findIndex(
          (currentItem: TodoListItem) => currentItem.id === action.payload.id
        );

        items[idx].description = action.payload.description;

        return { ...state, items };
      }

      return;

    default:
      return state;
  }
};

export default todoListReducer;
