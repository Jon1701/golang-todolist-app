enum ActionTypes {
  SetName = "SET_NAME",
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

type ActionCreator = SetNameActionCreator;

/**
 * Creates the SET_NAME Action.
 * @param name Name of the Todo List.
 * @returns Action Creator.
 */
const setName = (name: string): SetNameActionCreator => ({
  type: ActionTypes.SetName,
  payload: name,
});

export { ActionTypes, setName };
export type { ActionCreator };
