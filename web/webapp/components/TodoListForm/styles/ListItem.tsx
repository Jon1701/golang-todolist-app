import styled from "styled-components";

/**
 * Container for a TodoList item.
 */
const ContainerListItem = styled.div`
  display: grid;
  grid-template-columns: 25px auto 25px;
  grid-column-gap: 5px;
`;

/**
 * Container for a label and input.
 */
const ContainerField = styled.div`
  width: 100%;
`;

/**
 * Container for the checkbox.
 */
const ContainerCheckbox = styled.div``;

/**
 * Container for the Delete button.
 */
const ContainerDelete = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export {
  ContainerListItem,
  ContainerField,
  ContainerCheckbox,
  ContainerDelete,
};
