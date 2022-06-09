package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Jon1701/golang-todolist-app/models"
	"github.com/Jon1701/golang-todolist-app/util"
)

type GenericHTTPError struct {
	Message string `json:"message"`
}

func CreateTodoList(w http.ResponseWriter, r *http.Request) {
	// New blank todo list to be created
	newList := &models.List{}

	// Parse request body.
	errParseBody := util.ParseRequestBody(r, &newList)

	// Failed to parse request body.
	if errParseBody != nil {
		respondMalformedRequestBody(w)
		return
	}

	// Check if the Name has valid length
	isNameLengthValid := len(*newList.Name) >= 1 && len(*newList.Name) <= 255
	if !isNameLengthValid {
		// Create new error.
		msg := errStringFieldLengthRangeRequired(1, 255)
		e := models.List{
			Name: &msg,
		}

		bArr, _ := json.Marshal(e)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(bArr)
		return

	}

}

func errStringFieldLengthRangeRequired(x uint32, y uint32) string {
	return fmt.Sprintf("must be between %d and %d characters in length", x, y)
}

func respondMalformedRequestBody(w http.ResponseWriter) {
	// Create error to be sent to the front-end.
	e := GenericHTTPError{
		Message: "request body is malformed",
	}

	bArr, _ := json.Marshal(e)

	w.WriteHeader(http.StatusBadRequest)
	w.Write(bArr)
}
