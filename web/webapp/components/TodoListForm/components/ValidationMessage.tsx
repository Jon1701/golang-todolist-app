import React from "react";
import styled from "styled-components";

interface Props {
  /**
   * Error message.
   */
  message?: string;
}

/**
 * Component container.
 */
const Container = styled.div`
  font-size: 0.9em;
  color: #dc143c;
`;

/**
 * Displays a validation message.
 *
 * @param props Component props.
 * @param props.message Validation message.
 * @returns Validation message.
 */
const ValidationMessage: React.FC<Props> = ({ message }) => {
  return message ? <Container>{message}</Container> : null;
};

export default ValidationMessage;
