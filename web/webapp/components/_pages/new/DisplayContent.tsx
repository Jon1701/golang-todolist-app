import styled from "styled-components";

import { ContentCodes } from "@pages/new";
import { SuccessAlert } from "@components/Alert";
import LoadingSpinner from "@components/LoadingSpinner";

interface DisplayContentProps {
  /**
   * Content code used to display correct content.
   */
  code: ContentCodes;

  /**
   * Path to the page which displays all todo lists.
   */
  pathToAllTodoLists: string;
}

/**
 * Component container.
 */
const Container = styled.div`
  padding: 25px 0;

  text-align: center;
`;

const CustomLink = styled.a`
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
`;

/**
 * Displays content which corresponds to a given content code.
 *
 * @param props Component props.
 * @param props.code Content code.
 * @param props.pathToAllTodoLists Path to page of all todo lists.
 * @returns Content.
 */
const DisplayContent: React.FC<DisplayContentProps> = ({
  code,
  pathToAllTodoLists,
}) => {
  let node: React.ReactElement;

  switch (code) {
    case ContentCodes.Loading:
      node = <LoadingSpinner />;
      break;

    case ContentCodes.Success:
      return (
        <SuccessAlert style={{ margin: "10px 0" }}>
          <div>Todo List has been successfully created.</div>
          <div style={{ marginTop: "10px" }}>
            <CustomLink href={pathToAllTodoLists}>
              Click here to view all Todo Lists
            </CustomLink>
          </div>
        </SuccessAlert>
      );
      break;

    default:
      node = <div>An Unknown Error occurred.</div>;
      break;
  }

  return <Container>{node}</Container>;
};

export { DisplayContent };
