import styled from "styled-components";

/**
 * Base alert.
 */
const BaseAlert = styled.div`
  background-color: #000;
  border-style: solid;
  border-color: #000;
  border-width: 1px;

  padding: 10px;

  color: #fff;
  font-size: 0.9em;
  text-align: center;

  margin-bottom: 15px;
`;

/**
 * Success alert.
 */
const SuccessAlert = styled(BaseAlert)`
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
`;

/**
 * Danger alert.
 */
const DangerAlert = styled(BaseAlert)`
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
`;

/**
 * Warning alert.
 */
const WarningAlert = styled(BaseAlert)`
  background-color: #fff3cd;
  color: #856404;
  border-color: #ffeeba;
`;

/**
 * Info alert.
 */
const InfoAlert = styled(BaseAlert)`
  background-color: #d1ecf1;
  color: #0c5460;
  border-color: #bee5eb; ;
`;

export { SuccessAlert, DangerAlert, WarningAlert, InfoAlert };
