import styled from "styled-components";

interface MetadataProps {
  /**
   * Indicates if the all items in the Todo List have been completed.
   */
  isCompleted: boolean;
}

/**
 * Displays metadata about a Todo List such as number of items are on said list.
 */
const Metadata = styled.div<MetadataProps>`
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  font-size: 0.8em;
`;

export default Metadata;
