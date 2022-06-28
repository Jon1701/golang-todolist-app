import React, { useState, useEffect, useReducer } from "react";
import { NextRouter, useRouter } from "next/router";

import {
  getSpecific,
  ResponseCodes as GetSpecificResponseCodes,
} from "@fetch/list/getSpecific";
import {
  put,
  ResponseCodes as ReplaceTodoListResponseCodes,
} from "@fetch/list/put";
import { ContainerPage, ContainerContent, H1 } from "@components/Page";
import { setTodoList } from "@components/TodoListForm/useReducer/actions";
import { TodoList } from "@interfaces/TodoList";
import DeleteTodoListModal from "@components/Modal/DeleteTodoList";
import DisplayAlert from "@components/_pages/id/DisplayAlert";
import DisplayContent from "@components/_pages/id/DisplayContent";
import generateItemIDs from "@util/generateItemIDs";
import Panel from "@components/Panel";
import removeIDs from "@util/removeIDs";
import TodoListForm from "@components/TodoListForm";
import todoListReducer from "@components/TodoListForm/useReducer/reducers";

enum AlertCodes {
  InvalidFieldValues = "INVALID_FIELD_VALUES",
  UpdateListSuccess = "UPDATE_LIST_SUCCESS",
}

enum ContentCodes {
  Loading = "LOADING",
  GetListSuccess = "GET_LIST_SUCCESS",
  UpdateListSuccess = "UPDATE_LIST_SUCCESS",
  NotFound = "NOT_FOUND",
  ShowForm = "SHOW_FORM",
  UnknownError = "UNKNOWN_ERROR",
}

// Default Todo list.
const defaultValues: TodoList = {
  name: "",
};

/**
 * Update Todo List page.
 *
 * @returns Page.
 */
const UpdateTodoListPage: React.FC = () => {
  // Form data.
  const [formValues, dispatch] = useReducer(todoListReducer, defaultValues);

  // Validation Results.
  const [validationResults, setValidationResults] = useState<
    TodoList | undefined
  >(undefined);

  // Controls alerts.
  const [alertCode, setAlertCode] = useState<AlertCodes | undefined>(undefined);

  // Controls UI.
  const [contentCode, setContentCode] = useState<ContentCodes>(
    ContentCodes.Loading
  );

  // Modal visibility.
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  // Router.
  const router: NextRouter = useRouter();
  const { id } = router.query;

  // Paths
  const pathCancelButton = "/";

  /**
   * Fetches a TodoList by ID.
   */
  const getTodoListByID = async () => {
    setContentCode(ContentCodes.Loading);

    const response = await getSpecific(id);
    switch (response.responseCode) {
      case GetSpecificResponseCodes.Success: {
        // Attach IDs to items.
        const data: TodoList = generateItemIDs(response.body);
        dispatch(setTodoList(data));
        setContentCode(ContentCodes.GetListSuccess);
        break;
      }

      case GetSpecificResponseCodes.NotFound:
        setContentCode(ContentCodes.NotFound);
        break;

      default:
        setContentCode(ContentCodes.UnknownError);
        break;
    }
  };

  /**
   * Form submission handler.
   *
   * @param e React SyntheticEvent.
   */
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setAlertCode(undefined);
    setContentCode(ContentCodes.Loading);
    setValidationResults(undefined);

    // Remove IDs from Todo List.
    const obj: TodoList = removeIDs(formValues);

    const response = await put(id, obj);
    switch (response.responseCode) {
      case ReplaceTodoListResponseCodes.Success:
        setAlertCode(AlertCodes.UpdateListSuccess);
        setContentCode(ContentCodes.UpdateListSuccess);
        break;

      case ReplaceTodoListResponseCodes.InvalidFieldValues: {
        setValidationResults(response.body);
        setAlertCode(AlertCodes.InvalidFieldValues);
        setContentCode(ContentCodes.ShowForm);
        break;
      }

      case ReplaceTodoListResponseCodes.NotFound:
        setContentCode(ContentCodes.NotFound);
        break;

      default:
        setContentCode(ContentCodes.UnknownError);
        break;
    }
  };

  useEffect(() => {
    if (id) {
      void getTodoListByID();
    }
  }, [id]);

  return (
    <React.Fragment>
      {isDeleteModalVisible && id !== undefined ? (
        <DeleteTodoListModal
          id={id}
          handleCloseDefault={() => {
            setIsDeleteModalVisible(false);
          }}
          handleCloseSuccess={() => {
            void router.push("/");
          }}
          handleCloseFailed={() => {
            setIsDeleteModalVisible(false);
          }}
        />
      ) : null}

      <ContainerPage>
        <ContainerContent>
          <Panel>
            {contentCode === ContentCodes.Loading ||
            contentCode === ContentCodes.NotFound ||
            contentCode === ContentCodes.UnknownError ? (
              <DisplayContent code={contentCode} />
            ) : (
              <React.Fragment>
                <H1>Update Todo List</H1>

                <TodoListForm
                  JSXAlerts={
                    alertCode ? <DisplayAlert code={alertCode} /> : null
                  }
                  dispatch={dispatch}
                  formValues={formValues}
                  validationResults={validationResults}
                  setValidationResults={setValidationResults}
                  handleSubmit={handleSubmit}
                  pathCancelButton={pathCancelButton}
                  handleDeleteButtonClick={() => {
                    setIsDeleteModalVisible(true);
                  }}
                />
              </React.Fragment>
            )}
          </Panel>
        </ContainerContent>
      </ContainerPage>
    </React.Fragment>
  );
};

export default UpdateTodoListPage;
export { AlertCodes, ContentCodes };
