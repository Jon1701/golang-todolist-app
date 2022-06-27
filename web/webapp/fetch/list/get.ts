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
const get = async (): Promise<HTTPResponse> => {
  const response = await fetch("/api/list", { method: "GET" });

  const data = await response.json();

  switch (response.status) {
    case 200: {
      if (data.length === 0) {
        const r: HTTPResponse = {
          responseCode: ResponseCodes.NoData,
        };

        return r;
      }

      const r: HTTPResponse = {
        responseCode: ResponseCodes.Success,
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

export { get, ResponseCodes };
export type { HTTPResponse };
