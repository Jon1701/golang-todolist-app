import React from "react";
import styled from "styled-components";

import { ContentCodes } from "@components/Modal/DeleteTodoList";
import { PrimaryButton } from "@components/Buttons";
import LoadingSpinner from "@components/LoadingSpinner";

interface Props {
  /**
   * Content code.
   */
  code: ContentCodes;

  /**
   * Close button click handler.
   */
  handleClose: () => void;
}

/**
 * Container for the Loading Spinner.
 */
const ContainerSpinner = styled.div`
  display: block;
  padding: 30px 0;
`;

/**
 * Container for the message.
 */
const ContainerMessage = styled.div`
  text-align: center;
  padding: 15px 0;
`;

/**
 * Container for the buttons.
 */
const ContainerButtons = styled.div`
  button {
    width: 100%;
  }
`;

/**
 * Displays content which corresponds to a given content code.
 *
 * @param props Component props.
 * @param props.code Content code.
 * @param handleClose Close button click handler.
 * @returns
 */
const DisplayContent: React.FC<Props> = ({
  code,
  handleClose,
}): React.ReactElement => {
  let node: React.ReactElement;

  switch (code) {
    case ContentCodes.Loading:
      return (
        <ContainerSpinner>
          <LoadingSpinner />
        </ContainerSpinner>
      );

    case ContentCodes.Success:
      node = <React.Fragment>Todo List successfully deleted!</React.Fragment>;
      break;

    default:
      node = <React.Fragment>An unknown error occurred.</React.Fragment>;
      break;
  }

  return (
    <React.Fragment>
      <ContainerMessage>{node}</ContainerMessage>
      <ContainerButtons>
        <PrimaryButton type="button" onClick={handleClose}>
          Close
        </PrimaryButton>
      </ContainerButtons>
    </React.Fragment>
  );
};

export default DisplayContent;
