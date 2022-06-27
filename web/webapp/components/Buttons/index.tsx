import styled from "styled-components";

/**
 * Base button.
 */
const BaseButton = styled.button`
  display: inline-block;

  border-style: solid;
  border-width: 1px;
  border-color: #000;

  padding: 10px 15px;

  background-color: #000;
  color: #fff;

  font-size: 1rem;

  cursor: pointer;
`;

/**
 * Base link button.
 */
const BaseLinkButton = styled.a`
  display: inline-block;

  border-style: solid;
  border-width: 1px;
  border-color: #000;

  padding: 10px 15px;

  background-color: #000;
  color: #fff;

  font-size: 1rem;

  text-decoration: none;

  cursor: pointer;
`;

/**
 * Primary button.
 */
const PrimaryButton = styled(BaseButton)`
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  background-color: #000;
  color: #fff;
`;

/**
 * Primary link button.
 */
const PrimaryLinkButton = styled(BaseLinkButton)`
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  background-color: #000;
  color: #fff;
`;

/**
 * Secondary button.
 */
const SecondaryButton = styled(BaseButton)`
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  background-color: #fff;
  color: #000;
`;

/**
 * Secondary link button.
 */
const SecondaryLinkButton = styled(BaseLinkButton)`
  border-style: solid;
  border-width: 1px;
  border-color: #000;
  background-color: #fff;
  color: #000;
`;

export {
  BaseButton,
  BaseLinkButton,
  PrimaryButton,
  PrimaryLinkButton,
  SecondaryButton,
  SecondaryLinkButton,
};
