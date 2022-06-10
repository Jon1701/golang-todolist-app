package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Jon1701/golang-todolist-app/models"
	"github.com/Jon1701/golang-todolist-app/util"
	"github.com/gorilla/mux"
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

	// Validate request body
	results := ValidateCreateList(newList)
	if results != nil {
		bArr, _ := json.Marshal(results)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(bArr)
		return
	}

	// Persist using Model.
	result, err := newList.CreateTodoList()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Convert persisted data into JSON for front-end.
	json, _ := json.Marshal(result)

	w.WriteHeader(http.StatusOK)
	w.Write(json)
}

func GetTodoLists(w http.ResponseWriter, r *http.Request) {
	// Get array of Todo lists from the database.
	results := models.GetTodoLists()

	o, _ := json.Marshal(results)

	w.WriteHeader(http.StatusOK)
	w.Write(o)
}

func GetTodoListByID(w http.ResponseWriter, r *http.Request) {
	// Get URL parameters
	vars := mux.Vars(r)

	id := vars["listID"]

	result := models.GetTodoListByID(id)

	if result == nil {
		err := GenericHTTPError{
			Message: "List not found",
		}
		j, _ := json.Marshal(err)

		w.WriteHeader(http.StatusNotFound)
		w.Write(j)

		return
	}

	j, _ := json.Marshal(result)

	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

func ValidateCreateList(o *models.List) *models.List {
	isValid := true

	// Struct to contain validation results
	err := &models.List{}

	isNameLengthValid := len(*o.Name) >= 1 && len(*o.Name) <= 255
	if !isNameLengthValid {
		// Build validation message for this field
		msg := errStringFieldLengthRangeRequired(1, 255)
		err.Name = &msg

		// Fail validation
		isValid = false
	}

	if isValid {
		return nil
	}

	return err
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
