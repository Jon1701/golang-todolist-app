import React, { useState } from "react";

import { deleteTodoList, ResponseCodes } from "@fetch/list/delete";
import BaseModal from "@components/Modal/BaseModal";
import DeleteTodoListForm from "@components/Forms/DeleteTodoList";
import DisplayContent from "./components/DisplayContent";

enum CloseStatus {
  Success = "SUCCESS",
  Failed = "FAILED",
  Default = "DEFAULT",
}

enum ContentCodes {
  ShowForm = "SHOW_FORM",
  Loading = "LOADING",
  Success = "SUCCESS",
  NotFound = "NOT_FOUND",
  UnknownError = "UNKNOWN_ERROR",
}

interface Props {
  /**
   * Todo List ID.
   */
  id: string;

  /**
   * Close button click handler for successful events.
   */
  handleCloseSuccess: () => void;

  /**
   * Close button click handler for failed events.
   */
  handleCloseFailed: () => void;

  /**
   * Default close button click handler.
   */
  handleCloseDefault: () => void;
}

/**
 * Delete Todo List Modal.
 *
 * @param props Component props.
 * @param props.id Todo List ID.
 * @param props.handleCloseSuccess Close button click handler for a successful
 *                                 event.
 * @param props.handleCloseFailed Close button click handler for a failed event.
 * @param props.handleCloseDefault Default close button click handler.
 * @returns Delete Todo List Modal.
 */
const DeleteTodoListModal: React.FC<Props> = ({
  id,
  handleCloseSuccess,
  handleCloseFailed,
  handleCloseDefault,
}) => {
  // Controls the displayed UI.
  const [contentCode, setContentCode] = useState<ContentCodes>(
    ContentCodes.ShowForm
  );

  // Controls the functionality of the Close button.
  const [closeFunctionController, setCloseFunctionController] =
    useState<CloseStatus>(CloseStatus.Default);

  /**
   * Form submission handler.
   *
   * @param e React Synthetic Event.
   */
  const handleSubmit = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();

    setContentCode(ContentCodes.Loading);

    const response = await deleteTodoList(id);
    switch (response.responseCode) {
      case ResponseCodes.Success: {
        setCloseFunctionController(CloseStatus.Success);
        setContentCode(ContentCodes.Success);
        break;
      }

      case ResponseCodes.NotFound: {
        setCloseFunctionController(CloseStatus.Failed);
        setContentCode(ContentCodes.NotFound);
        break;
      }

      default: {
        setCloseFunctionController(CloseStatus.Failed);
        setContentCode(ContentCodes.UnknownError);
        break;
      }
    }
  };

  /**
   * Closes the modal.
   */
  const handleClose = () => {
    switch (closeFunctionController) {
      case CloseStatus.Success:
        handleCloseSuccess();
        break;

      case CloseStatus.Failed:
        handleCloseFailed();
        break;

      default:
        handleCloseDefault();
        break;
    }
  };

  return (
    <BaseModal title="Delete Todo List" handleCloseButtonClick={handleClose}>
      {contentCode === ContentCodes.ShowForm ? (
        <DeleteTodoListForm
          handleSubmit={(e: React.SyntheticEvent) => void handleSubmit(e)}
          handleCancelButtonClick={handleClose}
        />
      ) : (
        <DisplayContent code={contentCode} handleClose={handleClose} />
      )}
    </BaseModal>
  );
};

export default DeleteTodoListModal;
export { ContentCodes };
