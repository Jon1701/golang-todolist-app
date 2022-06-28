import React from "react";

import { TodoList, TodoListItem } from "@interfaces/TodoList";
import { SecondaryLinkButton } from "@components/Buttons";

import Container from "./styles/Container";
import Divider from "./components/Divider";
import List from "./styles/List";
import ListItem from "./styles/ListItem";
import Metadata from "./styles/Metadata";
import Name from "./styles/Name";
import NoData from "./styles/NoData";

interface Props {
  /**
   * Array of TodoLists.
   */
  data: Array<TodoList>;
}

/**
 * Displays TodoLists.
 *
 * @param props Component props.
 * @param props.data Array of TodoLists.
 * @returns Todolists.
 */
const DisplayLists: React.FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return (
      <Container>
        <NoData>No data</NoData>
      </Container>
    );
  }

  return (
    <Container>
      <List>
        {data.map((todolist: TodoList) => {
          // Number of items in a TodoList.
          const numItems: number = todolist.items?.length || 0;

          // Number of completed items in a TodoList.
          const numCompleted: number =
            todolist.items?.filter((i: TodoListItem) => i.isComplete === true)
              .length || 0;

          // Checks if the TodoList is completed.
          const isCompleted = numItems > 0 && numCompleted === numItems;

          return (
            <React.Fragment key={todolist.id}>
              <ListItem>
                <div>
                  <Name isCompleted={isCompleted}>{todolist.name}</Name>

                  <Metadata isCompleted={isCompleted}>
                    {numItems > 0 ? (
                      <React.Fragment>
                        {numCompleted} of {numItems} completed
                      </React.Fragment>
                    ) : (
                      <React.Fragment>No items</React.Fragment>
                    )}
                  </Metadata>
                </div>

                <div>
                  {todolist.id !== undefined ? (
                    <SecondaryLinkButton
                      href={`/update/${todolist.id}`}
                      style={{ padding: "5px" }}
                    >
                      🗒️
                    </SecondaryLinkButton>
                  ) : null}
                </div>
              </ListItem>

              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
};

export default DisplayLists;
