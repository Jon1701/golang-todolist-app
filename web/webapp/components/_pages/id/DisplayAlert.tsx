import React from "react";

import { AlertCodes } from "@pages/update/[id]";
import { SuccessAlert, DangerAlert } from "@components/Alert";

interface Props {
  /**
   * Alert code.
   */
  code: AlertCodes;
}

/**
 * Displays an alert which corresponds to a given Alert code.
 *
 * @param props Component props.
 * @param props.code Alert code.
 * @returns Alert.
 */
const DisplayAlert: React.FC<Props> = ({ code }): React.ReactElement => {
  switch (code) {
    case AlertCodes.UpdateListSuccess:
      return <SuccessAlert>Update successful!</SuccessAlert>;

    case AlertCodes.InvalidFieldValues:
      return <DangerAlert>Invalid field values.</DangerAlert>;

    default:
      return <DangerAlert>An unknown error occurred.</DangerAlert>;
  }
};

export default DisplayAlert;
