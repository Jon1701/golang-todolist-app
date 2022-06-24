import styled from "styled-components";

/**
 * Styled input.
 */
const Input = styled.input`
  &[type="text"] {
    display: block;
    width: 100%;
    box-sizing: border-box;

    font-size: 1rem;
    border-radius: 0px;
    padding: 5px;

    border: none;
    background-color: #f6f6f6;
  }
`;

export default Input;
