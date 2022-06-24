import { TodoList } from "@interfaces/TodoList";

/**
 * @enum {string} Describes the result of an HTTP Request.
 */
enum ResponseCodes {
  Success = "SUCCESS",
  NoData = "NO_DATA",
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
  body?: Array<TodoList>;
}

/**
 * Fetches an array of Todo Lists.
 *
 * @returns {Promise<HTTPResponse>} Result of the request.
 */
const getTodoLists = async (): Promise<HTTPResponse> => {
  return fetch("/api/list", { method: "GET" })
    .then((response: Response) => response.json())
    .then((data: Array<TodoList>) => {
      if (data.length === 0) {
        const res: HTTPResponse = {
          responseCode: ResponseCodes.NoData,
        };
        return res;
      }

      const res: HTTPResponse = {
        responseCode: ResponseCodes.Success,
        body: data,
      };

      return res;
    })
    .catch(() => {
      const res: HTTPResponse = {
        responseCode: ResponseCodes.UnknownError,
      };

      return res;
    });
};

export { getTodoLists, ResponseCodes };
export type { HTTPResponse };
