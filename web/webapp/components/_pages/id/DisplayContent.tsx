import React from "react";

import { ContentCodes } from "@pages/update/[id]";
import { DangerAlert } from "@components/Alert";
import LoadingSpinner from "@components/LoadingSpinner";

interface Props {
  /**
   * Content code.
   */
  code: ContentCodes;
}

/**
 * Displays content which corresponds to a given Content Code.
 *
 * @param props Component props.
 * @param props.code Content code.
 * @returns Content.
 */
const DisplayContent: React.FC<Props> = ({ code }) => {
  switch (code) {
    case ContentCodes.NotFound:
      return (
        <DangerAlert style={{ marginBottom: 0 }}>
          Todo List Not Found
        </DangerAlert>
      );

    case ContentCodes.Loading:
      return <LoadingSpinner />;

    default:
      return (
        <DangerAlert style={{ marginBottom: 0 }}>
          An unknown error occurred.
        </DangerAlert>
      );
  }
};

export default DisplayContent;
