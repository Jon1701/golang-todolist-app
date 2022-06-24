import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getTodoLists, ResponseCodes } from "@fetch/list/get";
import { TodoList } from "@interfaces/TodoList";
import DisplayLists from "@components/DisplayLists";
import Panel from "@components/Panel";
import LoadingSpinner from "@components/LoadingSpinner";

enum ContentCodes {
  Loading = "LOADING",
  Success = "SUCCESS",
  NoData = "NO_DATA",
  UnknownError = "UNKNOWN_ERROR",
}

/**
 * Container for the page.
 */
const Container = styled.main`
  min-height: 100vh;
`;

/**
 * Container for the content.
 */
const Content = styled.div`
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

/**
 * Container for error messages.
 */
const ContainerErrorMessage = styled.div`
  text-align: center;
`;

/**
 * Container for the panel header.
 */
const ContainerHeader = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

/**
 * Custom link.
 */
const CustomLink = styled.a`
  display: inline-block;
  border-style: solid;
  border-width: 1px;
  border-color: #000;

  padding: 10px 15px;

  background-color: #000;
  color: #fff;
`;

/**
 * Index page.
 *
 * @returns Index page.
 */
const IndexPage: React.FC = () => {
  // Controls the content to be displayed.
  const [contentCode, setContentCode] = useState<ContentCodes>(
    ContentCodes.Loading
  );

  // Todolist data.
  const [data, setData] = useState<Array<TodoList> | undefined>(undefined);

  /**
   * Fetches TodoLists, saves data in local state, sets content visibility.
   */
  const fetchTodoLists = async () => {
    setContentCode(ContentCodes.Loading);
    setData([]);

    const res = await getTodoLists();
    switch (res.responseCode) {
      case ResponseCodes.NoData:
        setContentCode(ContentCodes.NoData);
        break;

      case ResponseCodes.Success:
        setData(res.body);
        setContentCode(ContentCodes.Success);
        break;

      default:
        setContentCode(ContentCodes.UnknownError);
        break;
    }
  };

  useEffect(() => {
    void fetchTodoLists();
  }, []);

  /**
   * Renders components which correspond to a given content code.
   *
   * @param code Content code.
   * @returns Components to be rendered.
   */
  const renderSwitch: React.FC<ContentCodes> = (code) => {
    switch (code) {
      case ContentCodes.Loading:
        return <LoadingSpinner />;

      case ContentCodes.Success:
      case ContentCodes.NoData:
        return (
          <React.Fragment>
            <ContainerHeader>
              <div>
                <H1>My Todo Lists</H1>
              </div>
              <div style={{ textAlign: "right" }}>
                <CustomLink href="/new">+ Create New List</CustomLink>
              </div>
            </ContainerHeader>

            {data ? <DisplayLists data={data} /> : null}
          </React.Fragment>
        );

      default:
        return (
          <ContainerErrorMessage>
            An unknown error occurred.
          </ContainerErrorMessage>
        );
    }
  };

  return (
    <Container>
      <Content>
        <Panel>{renderSwitch(contentCode)}</Panel>
      </Content>
    </Container>
  );
};

export default IndexPage;
