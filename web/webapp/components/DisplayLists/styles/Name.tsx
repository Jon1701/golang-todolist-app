import styled from "styled-components";

interface NameProps {
  /**
   * Indicates if the all items in the Todo List have been completed.
   */
  isCompleted: boolean;
}

/**
 * Displays the name of the Todo List.
 */
const Name = styled.div<NameProps>`
  text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
  font-weight: 700;
`;

export default Name;
