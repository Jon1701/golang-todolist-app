import React from "react";
import styled from "styled-components";

interface SpinnerProps {
  /**
   * Track thickness.
   */
  trackThickness?: string;

  /**
   * Track colour.
   */
  trackColor?: string;

  /**
   * Accent colour.
   */
  accentColor?: string;

  /**
   * Width or Height.
   */
  width?: string;

  /**
   * Time to complete one revolution (seconds to milliseconds).
   */
  timePerRevolution?: string;
}

/**
 * Component container.
 */
const Container = styled.div``;

/**
 * Spinner graphic.
 */
const Spinner = styled.div<SpinnerProps>`
  width: 100%;
  margin: 0 auto;

  border-radius: 50%;
  border: solid ${(props) => props.trackThickness || "10px"}
    ${(props) => props.trackColor || "#f6f6f6"};
  border-top: solid ${(props) => props.trackThickness || "10px"}
    ${(props) => props.accentColor || "#dc143c"};

  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.width || "100px"};

  animation: spinner ${(props) => props.timePerRevolution || "1s"} linear
    infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Loading Spinner component.
 *
 * @param props Component props.
 * @param props.trackThickness Track thickness.
 * @param props.width Track width.
 * @param props.accentColor Accent colour.
 * @param props.trackColor Track colour.
 * @param props.timePerRevolution Time to complete one revolution.
 * @returns Loading Spinner.
 */
const LoadingSpinner: React.FC<SpinnerProps> = ({
  trackThickness,
  width,
  accentColor,
  trackColor,
  timePerRevolution,
}) => {
  return (
    <Container>
      <Spinner
        trackThickness={trackThickness}
        width={width}
        accentColor={accentColor}
        trackColor={trackColor}
        timePerRevolution={timePerRevolution}
      />
    </Container>
  );
};

export default LoadingSpinner;
