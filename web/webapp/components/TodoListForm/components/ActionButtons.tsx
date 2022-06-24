import React from "react";
import styled from "styled-components";

/**
 * Component container.
 */
const Container = styled.div`
  text-align: right;

  margin-bottom: 15px;
`;

/**
 * Styled submit button.
 */
const SubmitButton = styled.button`
  border: none;
  background-color: #284b63;
  color: #fff;

  font-size: 0.9rem;
  padding: 10px 20px;

  cursor: pointer;
`;

/**
 * Action buttons.
 *
 * @returns Action buttons.
 */
const ActionButtons: React.FC = () => {
  return (
    <Container>
      <SubmitButton type="submit">💾 Save</SubmitButton>
    </Container>
  );
};

export default ActionButtons;
