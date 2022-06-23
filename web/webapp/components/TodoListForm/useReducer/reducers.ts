import { ActionTypes, ActionCreator } from "./actions";
import { TodoList } from "@interfaces/TodoList";

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

    case ActionTypes.SetNewBlankItem:
      const items = state.items?.slice() || [];
      items.push(action.payload);
      return { ...state, items };

    default:
      return state;
  }
};

export default todoListReducer;
