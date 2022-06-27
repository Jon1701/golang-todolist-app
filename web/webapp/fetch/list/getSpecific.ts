import { TodoList } from "@interfaces/TodoList";

enum ResponseCodes {
  Success = "SUCCESS",
  NotFound = "NOT_FOUND",
  UnknownError = "UNKNOWN_ERROR",
}

interface HTTPResponse {
  responseCode: ResponseCodes;
  body?: TodoList;
}

/**
 * Fetches a Todo List by ID.
 *
 * @param id Todo List ID.
 * @returns HTTP Response.
 */
const getSpecific = async (id: string): Promise<HTTPResponse> => {
  const response = await fetch(`/api/list/${id}`);

  switch (response.status) {
    case 200: {
      const data: TodoList = await response.json();

      const r: HTTPResponse = {
        responseCode: ResponseCodes.Success,
        body: data,
      };

      return r;
    }

    case 404: {
      const r: HTTPResponse = {
        responseCode: ResponseCodes.NotFound,
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

export { getSpecific, ResponseCodes };
export type { HTTPResponse };
