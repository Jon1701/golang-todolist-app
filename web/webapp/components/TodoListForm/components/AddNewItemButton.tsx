import React from "react";
import styled from "styled-components";

interface Props {
  handleClick(): void;
}

/**
 * Styled Add New Item button.
 */
const Container = styled.button`
  display: block;
  width: 100%;

  border: none;
  padding: 10px 0;

  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

const AddNewItemButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <Container type="button" onClick={handleClick}>
      + Add New Item
    </Container>
  );
};

export default AddNewItemButton;
