import React from "react";

import { AlertCodes } from "@pages/new";
import { DangerAlert } from "@components/Alert";

interface Props {
  /**
   * Alert code.
   */
  code: AlertCodes;
}

/**
 * Displays an Alert which corresponds to a given Alert Code.
 *
 * @param props Component props.
 * @param props.code Alert code.
 * @returns Alert.
 */
const DisplayAlert: React.FC<Props> = ({ code }): React.ReactElement => {
  switch (code) {
    case AlertCodes.InvalidFieldValues:
      return <DangerAlert>Invalid field values.</DangerAlert>;

    default:
      return <DangerAlert>An unknown error occurred.</DangerAlert>;
  }
};

export default DisplayAlert;
