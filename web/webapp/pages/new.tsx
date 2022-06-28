import React, { useState, useReducer } from "react";

import { ContainerPage, ContainerContent, H1 } from "@components/Page";
import { DisplayContent } from "@components/_pages/new/DisplayContent";
import { post, HTTPResponse, ResponseCodes } from "@fetch/list/post";
import { TodoList } from "@interfaces/TodoList";
import DisplayAlert from "@components/_pages/new/DisplayAlert";
import Panel from "@components/Panel";
import removeIDs from "@util/removeIDs";
import TodoListForm from "@components/Forms/CreateUpdateTodoList";
import todoListReducer from "@components/Forms/CreateUpdateTodoList/useReducer/reducers";

enum AlertCodes {
  InvalidFieldValues = "INVALID_FIELD_VALUES",
  UnknownError = "UNKNOWN_ERROR",
}

enum ContentCodes {
  Loading = "LOADING",
  ShowForm = "SHOW_FORM",
  Success = "SUCCESS",
}

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
  // Form values.
  const [formValues, dispatch] = useReducer(todoListReducer, defaultValues);

  // Validation results.
  const [validationResults, setValidationResults] = useState<
    TodoList | undefined
  >(undefined);

  // Alert content.
  const [alertCode, setAlertCode] = useState<AlertCodes | undefined>(undefined);

  // UI content.
  const [contentCode, setContentCode] = useState<ContentCodes>(
    ContentCodes.ShowForm
  );

  /**
   * Form submission handler.
   *
   * @param e React SyntheticEvent.
   */
  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    setContentCode(ContentCodes.Loading);
    setAlertCode(undefined);
    setValidationResults(undefined);

    e.preventDefault();

    const copy = removeIDs(formValues);

    const res: HTTPResponse = await post(copy);
    switch (res.responseCode) {
      case ResponseCodes.Success:
        setContentCode(ContentCodes.Success);
        break;

      case ResponseCodes.InvalidFieldValues:
        setValidationResults(res.body);
        setAlertCode(AlertCodes.InvalidFieldValues);
        setContentCode(ContentCodes.ShowForm);
        break;

      default:
        setAlertCode(AlertCodes.UnknownError);
        setContentCode(ContentCodes.ShowForm);
        break;
    }
  };

  return (
    <ContainerPage>
      <ContainerContent>
        <Panel>
          <H1>Create New Todo List</H1>

          {contentCode === ContentCodes.Success ||
          contentCode === ContentCodes.Loading ? (
            <DisplayContent code={contentCode} pathToAllTodoLists="/" />
          ) : (
            <TodoListForm
              JSXAlerts={alertCode ? <DisplayAlert code={alertCode} /> : null}
              dispatch={dispatch}
              handleSubmit={handleSubmit}
              formValues={formValues}
              setValidationResults={setValidationResults}
              validationResults={validationResults}
              pathCancelButton="/"
            />
          )}
        </Panel>
      </ContainerContent>
    </ContainerPage>
  );
};

export default CreateNewTodoListPage;
export { AlertCodes, ContentCodes };
