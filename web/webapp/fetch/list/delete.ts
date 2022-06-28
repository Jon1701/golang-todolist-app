enum ResponseCodes {
  Success = "SUCCESS",
  NotFound = "NOT_FOUND",
  UnknownError = "UNKNOWN_ERROR",
}

interface HTTPResponse {
  responseCode: ResponseCodes;
}

/***
 * Deletes a Todo List by ID.
 *
 * @param id Todo List ID.
 */
const deleteTodoList = async (id: string): Promise<HTTPResponse> => {
  const response = await fetch(`/api/list/${id}`, { method: "DELETE" });
  switch (response.status) {
    case 204: {
      const r: HTTPResponse = {
        responseCode: ResponseCodes.Success,
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

export { deleteTodoList, ResponseCodes };
export type { HTTPResponse };
