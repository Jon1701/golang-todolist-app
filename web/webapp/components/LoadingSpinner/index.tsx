import React from "react";
import styled from "styled-components";

/**
 * Component container.
 */
const Container = styled.div`
  text-align: center;
`;

/**
 * Loading spinner.
 *
 * @returns Loading spinner.
 */
const LoadingSpinner: React.FC = () => {
  return <Container>Loading...</Container>;
};

export default LoadingSpinner;
