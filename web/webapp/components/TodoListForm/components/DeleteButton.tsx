import React from "react";
import styled from "styled-components";

interface Props {
  handleClick(): void;
}

/**
 * Styled Delete Item button.
 */
const Container = styled.button`
  display: block;
  box-sizing: border-box;
  padding: 0;

  width: 100%;
  height: 100%;

  border-radius: 0px;
  border: none;
  font-size: 1rem;

  background-color: #f6f6f6;
  cursor: pointer;
`;

/**
 * Delete button.
 *
 * @param props Component props.
 * @param props.handleClick Click handler function.
 * @returns Delete Button.
 */
const DeleteButton: React.FC<Props> = ({ handleClick }) => (
  <Container type="button" onClick={handleClick}>
    🗑️
  </Container>
);

export default DeleteButton;
