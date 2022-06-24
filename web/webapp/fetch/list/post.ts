import { TodoList } from "@interfaces/TodoList";

/**
 * @enum {string} Describes the result of an HTTP Request.
 */
enum ResponseCodes {
  Success = "SUCCESS",
  InvalidFieldValues = "INVALID_FIELD_VALUES",
  UnknownError = "UNKNOWN_ERROR",
}

/**
 *
 */
interface HTTPResponse {
  /**
   * Result of the HTTP Request.
   */
  responseCode: ResponseCodes;

  /**
   * Response body.
   */
  body?: TodoList;
}

/**
 * Creates a Todo List.
 *
 * @returns {Promise<HTTPResponse>} Result of the request.
 */
const postTodoList = async (todoList: TodoList): Promise<HTTPResponse> => {
  return fetch("/api/list", { method: "POST", body: JSON.stringify(todoList) })
    .then(async (res: Response) => {
      switch (res.status) {
        case 201: {
          const r: HTTPResponse = {
            responseCode: ResponseCodes.Success,
          };
          return r;
        }

        case 400: {
          const data: TodoList = await res.json();
          console.log("Data", data);
          const r: HTTPResponse = {
            responseCode: ResponseCodes.InvalidFieldValues,
            body: data,
          };
          return r;
        }

        default: {
          throw new Error();
        }
      }
    })
    .catch(() => {
      const res: HTTPResponse = {
        responseCode: ResponseCodes.UnknownError,
      };

      return res;
    });
};

export { postTodoList, ResponseCodes };
export type { HTTPResponse };
