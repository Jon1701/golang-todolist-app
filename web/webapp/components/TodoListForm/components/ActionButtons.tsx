import React from "react";
import styled from "styled-components";

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
 * Base button.
 */
const Button = styled.button`
  border-width: 1px;
  border-color: #000;
  border-style: solid;
  padding: 10px 20px;

  background-color: #000;

  font-size: 0.9rem;
  color: #fff;

  cursor: pointer;
`;

/**
 * Styled Submit button.
 */
const SubmitButton = styled(Button)``;

/**
 * Styled Cancel button.
 */
const CancelButton = styled.a`
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  padding: 10px 20px;

  background-color: #fff;

  font-size: 0.9rem;
  color: #000;

  cursor: pointer;
`;

/**
 * Action buttons.
 *
 * @returns Action buttons.
 */
const ActionButtons: React.FC<Props> = ({ pathCancelButton }) => {
  return (
    <Container>
      <SubmitButton type="submit">💾 Save</SubmitButton>

      {pathCancelButton ? (
        <CancelButton href={pathCancelButton}>❌ Cancel</CancelButton>
      ) : null}
    </Container>
  );
};

export default ActionButtons;
