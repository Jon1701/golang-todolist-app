import styled from "styled-components";

/**
 * Styled <li> component.
 */
const ListItem = styled.li`
  display: grid;
  grid-template-columns: 95% auto;

  padding: 15px 5px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export default ListItem;
