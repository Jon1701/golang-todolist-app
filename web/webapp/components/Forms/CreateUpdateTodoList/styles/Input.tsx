import styled from "styled-components";

interface StyleProps {
  /**
   * Field validation message.
   */
  validationMessage?: string;
}

/**
 * Styled input.
 */
const Input = styled.input<StyleProps>`
  &[type="text"] {
    display: block;
    width: 100%;
    box-sizing: border-box;

    font-size: 1rem;
    background-color: #f6f6f6;

    border-radius: 0px;
    padding: 5px;

    border-style: solid;
    border-width: 1px;
    border-color: ${(props) => (!props.validationMessage ? "none" : "#dc143c")};
  }
`;

export default Input;
