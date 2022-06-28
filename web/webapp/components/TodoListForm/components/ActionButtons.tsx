import React from "react";
import styled from "styled-components";

import {
  PrimaryButton,
  SecondaryLinkButton,
  RedPrimaryButton,
} from "@components/Buttons";

interface Props {
  /**
   * Path for the Cancel button.
   */
  pathCancelButton?: string;

  /**
   * Click handler for the Delete button.
   */
  handleDeleteButtonClick?(): void;
}

/**
 * Component container.
 */
const Container = styled.div`
  text-align: right;

  margin-bottom: 15px;

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

/**
 * Action buttons.
 *
 * @returns Action buttons.
 */
const ActionButtons: React.FC<Props> = ({
  pathCancelButton,
  handleDeleteButtonClick,
}) => {
  return (
    <Container>
      <PrimaryButton type="submit">Save</PrimaryButton>

      {pathCancelButton ? (
        <SecondaryLinkButton href={pathCancelButton}>
          Cancel
        </SecondaryLinkButton>
      ) : null}

      {handleDeleteButtonClick ? (
        <RedPrimaryButton type="button" onClick={handleDeleteButtonClick}>
          Delete
        </RedPrimaryButton>
      ) : null}
    </Container>
  );
};

export default ActionButtons;
