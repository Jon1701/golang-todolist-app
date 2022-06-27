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
const post = async (todoList: TodoList): Promise<HTTPResponse> => {
  const response = await fetch("/api/list", {
    method: "POST",
    body: JSON.stringify(todoList),
  });

  switch (response.status) {
    case 201: {
      const r: HTTPResponse = {
        responseCode: ResponseCodes.Success,
      };

      return r;
    }

    case 400: {
      const data = await response.json();

      const r: HTTPResponse = {
        responseCode: ResponseCodes.InvalidFieldValues,
        body: data,
      };

      return r;
    }

    default: {
      const r: HTTPResponse = {
        responseCode: ResponseCodes.UnknownError,
      };

      return r;
    }
  }
};

export { post, ResponseCodes };
export type { HTTPResponse };
