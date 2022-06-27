import React from "react";
import styled from "styled-components";

import { PrimaryButton, SecondaryLinkButton } from "@components/Buttons";

interface Props {
  /**
   * Path for the Cancel button.
   */
  pathCancelButton?: string;
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
const ActionButtons: React.FC<Props> = ({ pathCancelButton }) => {
  return (
    <Container>
      <PrimaryButton type="submit">Save</PrimaryButton>

      {pathCancelButton ? (
        <SecondaryLinkButton href={pathCancelButton}>
          Cancel
        </SecondaryLinkButton>
      ) : null}
    </Container>
  );
};

export default ActionButtons;
