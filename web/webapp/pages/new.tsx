import React, { useState, useReducer } from "react";
import styled from "styled-components";

import { DangerAlert } from "@components/Alert";
import { DisplayContent } from "@components/_pages/new/DisplayContent";
import { postTodoList, HTTPResponse, ResponseCodes } from "@fetch/list/post";
import { TodoList } from "@interfaces/TodoList";
import Panel from "@components/Panel";
import TodoListForm from "@components/TodoListForm";
import todoListReducer from "@components/TodoListForm/useReducer/reducers";

enum ContentCodes {
  Loading = "LOADING",
  ShowForm = "SHOW_FORM",
  Success = "SUCCESS",
  UnknownError = "UNKNOWN_ERROR",
}

/**
 * Component container.
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
  margin-bottom: 0;
`;

/**
 * Remove IDs from TodoList.
 *
 * @param formValues TodoList object.
 * @returns TodoList object without IDs.
 */
const removeIDs = (formValues: TodoList): TodoList => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const obj: TodoList = JSON.parse(JSON.stringify(formValues));

  if (obj.items !== undefined) {
    obj.items = obj.items.map((item) => {
      delete item.id;
      return item;
    });
  }

  delete obj.id;

  return obj;
};

// Default form values.
const defaultValues: TodoList = {
  name: "",
};

/**
 * Create New Todo List Page.
 *
 * @returns Page.
 */
const CreateNewTodoListPage = () => {
  // UI content.
  const [contentCode, setContentCode] = useState<ContentCodes>(
    ContentCodes.ShowForm
  );

  // Form values.
  const [formValues, dispatch] = useReducer(todoListReducer, defaultValues);

  // Validation results.
  const [validationResults, setValidationResults] = useState<
    TodoList | undefined
  >(undefined);

  /**
   * Form submission handler.
   *
   * @param e React SyntheticEvent.
   */
  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    setContentCode(ContentCodes.Loading);
    setValidationResults(undefined);

    e.preventDefault();

    const copy = removeIDs(formValues);

    const res: HTTPResponse = await postTodoList(copy);
    switch (res.responseCode) {
      case ResponseCodes.Success:
        setContentCode(ContentCodes.Success);
        break;

      case ResponseCodes.InvalidFieldValues:
        setValidationResults(res.body);
        setContentCode(ContentCodes.ShowForm);
        break;

      default:
        setContentCode(ContentCodes.UnknownError);
        break;
    }
  };

  /**
   * Displays alerts.
   *
   * @returns Alerts.
   */
  const Alerts: React.FC = (): React.ReactElement | null => {
    if (validationResults !== undefined) {
      return <DangerAlert>Invalid values provided.</DangerAlert>;
    }

    if (contentCode === ContentCodes.UnknownError) {
      return <DangerAlert>An unknown error occurred.</DangerAlert>;
    }

    return null;
  };

  return (
    <Container>
      <Content>
        <Panel>
          <H1>Create New Todo List</H1>

          {contentCode === ContentCodes.Success ||
          contentCode === ContentCodes.Loading ||
          contentCode === ContentCodes.UnknownError ? (
            <DisplayContent code={contentCode} pathToAllTodoLists="/" />
          ) : (
            <TodoListForm
              JSXAlerts={<Alerts />}
              dispatch={dispatch}
              handleSubmit={handleSubmit}
              formValues={formValues}
              setValidationResults={setValidationResults}
              validationResults={validationResults}
              pathCancelButton="/"
            />
          )}
        </Panel>
      </Content>
    </Container>
  );
};

export default CreateNewTodoListPage;
export { ContentCodes };
