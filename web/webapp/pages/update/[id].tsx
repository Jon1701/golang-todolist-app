import React, { useState, useEffect, useReducer } from "react";
import { NextRouter, useRouter } from "next/router";
import styled from "styled-components";

import {
  getSpecific,
  ResponseCodes as GetSpecificResponseCodes,
} from "@fetch/list/getSpecific";
import {
  put,
  ResponseCodes as ReplaceTodoListResponseCodes,
} from "@fetch/list/put";
import { setTodoList } from "@components/TodoListForm/useReducer/actions";
import { TodoList } from "@interfaces/TodoList";
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

/**
 * Container for the page.
 */
const Container = styled.main`
  min-height: 100vh;
`;

/**
 * Container for the content.
 */
const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 25px 0;
`;

/**
 * Custom H1.
 */
const H1 = styled.h1`
  margin-top: 0;
`;

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

  // Router.
  const router: NextRouter = useRouter();
  const { id } = router.query;

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

  const pathCancelButton = "/";

  useEffect(() => {
    if (id) {
      void getTodoListByID();
    }
  }, [id]);

  return (
    <Container>
      <Content>
        <Panel>
          {contentCode === ContentCodes.Loading ||
          contentCode === ContentCodes.NotFound ||
          contentCode === ContentCodes.UnknownError ? (
            <DisplayContent code={contentCode} />
          ) : (
            <React.Fragment>
              <H1>Update Todo List</H1>

              <TodoListForm
                JSXAlerts={alertCode ? <DisplayAlert code={alertCode} /> : null}
                dispatch={dispatch}
                formValues={formValues}
                validationResults={validationResults}
                setValidationResults={setValidationResults}
                handleSubmit={handleSubmit}
                pathCancelButton={pathCancelButton}
              />
            </React.Fragment>
          )}
        </Panel>
      </Content>
    </Container>
  );
};

export default UpdateTodoListPage;
export { AlertCodes, ContentCodes };
