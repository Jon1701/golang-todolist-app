import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
  setName,
  setNewBlankItem,
  setItemDescription,
  setItemIsComplete,
  deleteItem,
  ItemDescriptionPayload,
  ItemIsCompletePayload,
} from "@components/TodoListForm/useReducer/actions";
import { TodoList, TodoListItem } from "@interfaces/TodoList";
import { PrimaryButton } from "@components/Buttons";

import {
  ContainerListItem,
  ContainerField,
  ContainerCheckbox,
  ContainerDelete,
} from "./styles/ListItem";
import ActionButtons from "./components/ActionButtons";
import DeleteButton from "./components/DeleteButton";
import Form from "./styles/Form";
import Input from "./styles/Input";
import Label from "./components/Label";
import ValidationMessage from "./components/ValidationMessage";

interface TodoListFormProps {
  /**
   * Alerts to be rendered.
   */
  JSXAlerts?: React.ReactElement;

  /**
   * Dispatch function.
   */
  dispatch: React.Dispatch<any>;

  /**
   * Form values object.
   */
  formValues: TodoList;

  /**
   * Field validation results.
   */
  validationResults: undefined | TodoList;

  /**
   * Sets the field validation results object.
   */
  setValidationResults: React.Dispatch<
    React.SetStateAction<TodoList | undefined>
  >;

  /**
   * Form submission handler.
   */
  handleSubmit: (e: React.SyntheticEvent) => void;

  /**
   * Path for the Cancel button.
   */
  pathCancelButton?: string;

  /**
   * Click handler for the delete button
   */
  handleDeleteButtonClick?(): void;
}

/**
 * Form for creating a Todo List.
 *
 * @param props Component props.
 * @param props.JSXAlerts Any alerts to be rendered.
 * @param props.dispatch Dispatch function.
 * @param props.formValues Form values object.
 * @param props.validationResults Field validation results.
 * @param props.setValidationResults Sets the field validation results object.
 * @param props.handleSubmit Form submission handler.
 * @param props.pathCancelButton Path for the Cancel button.
 * @param props.handleDeleteButtonClick Click handler for the Delete button.
 * @returns Form.
 */
const TodoListForm: React.FC<TodoListFormProps> = ({
  JSXAlerts,
  dispatch,
  formValues,
  validationResults,
  setValidationResults,
  handleSubmit,
  pathCancelButton,
  handleDeleteButtonClick,
}) => {
  /**
   * Generates a default TodoList Item.
   */
  const generateBlankItem = () => {
    // If the most recent list item has an empty description, prevent generating
    // new list items.
    if (formValues.items !== undefined && formValues.items.length > 0) {
      try {
        if (formValues.items.slice(-1)[0].description.trim().length === 0) {
          return;
        }
      } catch (e) {
        return;
      }
    }

    const blankItem: TodoListItem = {
      id: uuidv4(),
      description: "",
      isComplete: false,
    };

    dispatch(setNewBlankItem(blankItem));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ActionButtons
        pathCancelButton={pathCancelButton}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />

      {JSXAlerts}

      <ContainerField>
        <Label htmlFor="todolist-list-name" isRequired>
          Name
        </Label>
        <Input
          id="todolist-list-name"
          type="text"
          value={formValues.name}
          onChange={(e) => {
            dispatch(setName(e.target.value));
          }}
          validationMessage={validationResults?.name}
        />
        <ValidationMessage message={validationResults?.name} />
      </ContainerField>

      <ContainerField style={{ marginTop: "10px" }}>
        <Label htmlFor="todolist-list-item" isRequired>
          Items
        </Label>
        {formValues.items !== undefined &&
          formValues.items.map((item, idx) => {
            return (
              <ContainerListItem key={item.id} style={{ marginBottom: "15px" }}>
                <ContainerCheckbox>
                  <Input
                    type="checkbox"
                    checked={item.isComplete}
                    onChange={(e) => {
                      const payload: ItemIsCompletePayload = {
                        id: item.id,
                        isComplete: e.target.checked,
                      };

                      dispatch(setItemIsComplete(payload));
                    }}
                  />
                </ContainerCheckbox>
                <ContainerField>
                  <Input
                    id="todolist-list-item"
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const payload: ItemDescriptionPayload = {
                        id: item.id,
                        description: e.target.value,
                      };

                      dispatch(setItemDescription(payload));
                    }}
                    validationMessage={
                      validationResults?.items?.[idx]?.description
                    }
                  />
                </ContainerField>
                <ContainerDelete>
                  <DeleteButton
                    handleClick={() => {
                      setValidationResults(undefined);
                      dispatch(deleteItem(item.id));
                    }}
                  />
                </ContainerDelete>

                <ContainerCheckbox>
                  <span />
                </ContainerCheckbox>
                <ContainerField>
                  <ValidationMessage
                    message={validationResults?.items?.[idx]?.description}
                  />
                </ContainerField>
                <ContainerDelete>
                  <span />
                </ContainerDelete>
              </ContainerListItem>
            );
          })}
      </ContainerField>

      <div style={{ marginTop: "25px" }}>
        <PrimaryButton
          type="button"
          onClick={generateBlankItem}
          style={{ width: "100%" }}
        >
          + Add New Item
        </PrimaryButton>
      </div>
    </Form>
  );
};

export default TodoListForm;
