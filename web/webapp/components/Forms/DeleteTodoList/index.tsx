import React from "react";
import styled from "styled-components";

import { PrimaryButton, SecondaryButton } from "@components/Buttons";

interface Props {
  /**
   * Form submission handler.
   */
  handleSubmit: (e: React.SyntheticEvent) => void;

  /**
   * Click handler for the Cancel button.
   */
  handleCancelButtonClick: () => void;
}

/**
 * Form text.
 */
const ContainerContent = styled.div`
  margin: 15px 0;
  text-align: center;
`;

/**
 * Container for the buttons.
 */
const ContainerButtons = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  & > :not(:last-child) {
    margin-right: 5px;
  }
`;

/**
 * Delete Todo List form.
 *
 * @param props Component props.
 *
 * @returns
 */
const DeleteTodoListForm: React.FC<Props> = ({
  handleSubmit,
  handleCancelButtonClick,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <ContainerContent>
        Are you sure you want to delete this Todo List?
      </ContainerContent>

      <ContainerButtons>
        <PrimaryButton type="submit">Delete</PrimaryButton>
        <SecondaryButton type="button" onClick={handleCancelButtonClick}>
          Cancel
        </SecondaryButton>
      </ContainerButtons>
    </form>
  );
};

export default DeleteTodoListForm;
