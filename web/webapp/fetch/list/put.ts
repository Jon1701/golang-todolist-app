import { TodoList } from "@interfaces/TodoList";

enum ResponseCodes {
  Success = "SUCCESS",
  NotFound = "NOT_FOUND",
  InvalidFieldValues = "INVALID_FIELD_VALUES",
  UnknownError = "UNKNOWN_ERROR",
}

interface HTTPResponse {
  responseCode: ResponseCodes;
  body?: TodoList;
}

/**
 * Performs an HTTP PUT request to replace a TodoList in its entirety.
 *
 * @param id TodoList ID.
 * @param data Todo List.
 * @returns Request result.
 */
const put = async (id: string, data: TodoList): Promise<HTTPResponse> => {
  const response = await fetch(`/api/list/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  // Convert response body to json.
  const body: TodoList = await response.json();

  switch (response.status) {
    case 200: {
      const r: HTTPResponse = {
        responseCode: ResponseCodes.Success,
        body: body,
      };

      return r;
    }

    case 400: {
      const r: HTTPResponse = {
        responseCode: ResponseCodes.InvalidFieldValues,
        body: body,
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

export { put, ResponseCodes };
export type { HTTPResponse };
