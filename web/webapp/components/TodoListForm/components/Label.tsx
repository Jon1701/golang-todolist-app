import styled from "styled-components";

/**
 * Styled label.
 */
const Container = styled.label`
  display: block;
  font-weight: 700;

  margin-bottom: 5px;
`;

/**
 * Container for the asterisk.
 */
const ContainerAsterisk = styled.span`
  color: #dc143c;
`;

interface LabelProps {
  /**
   * Specifies the form element to which the label is bound.
   */
  htmlFor: string;

  /**
   * Marks the field as required.
   */
  isRequired?: boolean;

  /**
   * Child nodes to be rendered.
   */
  children: React.ReactNode;
}

/**
 * Label component.
 *
 * @param props Component props.
 * @param props.htmlFor Specifies the form element to which the label is bound.
 * @param props.isRequired Marks the field as required.
 * @param props.children Child nodes to be rendered.
 * @returns Label component.
 */
const Label: React.FC<LabelProps> = ({ htmlFor, isRequired, children }) => (
  <Container htmlFor={htmlFor}>
    {children}
    {isRequired ? <ContainerAsterisk>*</ContainerAsterisk> : null}
  </Container>
);

export default Label;
