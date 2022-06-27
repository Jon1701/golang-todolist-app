import React from "react";
import styled from "styled-components";

import { PrimaryButton } from "@components/Buttons";

interface Props {
  handleClick(): void;
}

/**
 * Styled Delete Item button.
 */
const Container = styled(PrimaryButton)`
  display: block;
  box-sizing: border-box;
  padding: 0;

  width: 100%;
  height: 100%;

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
    &#215;
  </Container>
);

export default DeleteButton;
