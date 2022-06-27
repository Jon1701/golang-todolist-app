import styled from "styled-components";

/**
 * Container for the page.
 */
const ContainerPage = styled.main`
  min-height: 100vh;
`;

/**
 * Container for the content.
 */
const ContainerContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 25px 0;
`;

/**
 * Custom H1.
 */
const H1 = styled.h1`
  margin-top: 0;
`;

export { ContainerPage, ContainerContent, H1 };
