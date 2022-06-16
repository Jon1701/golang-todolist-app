package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/Jon1701/golang-todolist-app/models"
	"github.com/Jon1701/golang-todolist-app/util"
	"github.com/gorilla/mux"
)

type GenericHTTPError struct {
	Message string `json:"message"`
}

const (
	MinStringFieldLen = 1
	MaxStringFieldLen = 255
)

func CreateTodoList(w http.ResponseWriter, r *http.Request) {
	// New blank todo list to be created
	newList := &models.TodoList{}

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

	url := fmt.Sprintf("%s/%s", r.URL.Path, *result)

	w.Header().Set("Content-Location", url)
	w.WriteHeader(http.StatusCreated)
}

func DeleteTodoListByID(w http.ResponseWriter, r *http.Request) {
	// Get URL parameters.
	vars := mux.Vars(r)

	id := vars["listID"]

	result := models.DeleteTodoListByID(id)

	if result != nil {
		err := GenericHTTPError{
			Message: "Could not find List ID",
		}

		j, _ := json.Marshal(err)

		w.WriteHeader(http.StatusNotFound)
		w.Write(j)
		return
	}

	w.WriteHeader(http.StatusNoContent)
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

func UpdateTodoListByID(w http.ResponseWriter, r *http.Request) {
	// Get URL parameters.
	vars := mux.Vars(r)

	// Todo List ID
	id := vars["listID"]

	// Get matching Todo list from the database.
	l := models.GetTodoListByID(id)

	// If no matching Todo List was found, return 404.
	if l == nil {
		e := GenericHTTPError{
			Message: "Could not find List ID",
		}

		j, _ := json.Marshal(e)

		w.WriteHeader(http.StatusNotFound)
		w.Write(j)
		return
	}

	// Get request body.
	parsedBody := &models.TodoList{}
	errParseBody := util.ParseRequestBody(r, &parsedBody)

	// Failed to parse request body.
	if errParseBody != nil {
		respondMalformedRequestBody(w)
		return
	}

	// Validate request body.
	validationResult := ValidateCreateList(parsedBody)

	// If request body failed validation, return 400 Bad request with validation errors
	if validationResult != nil {
		j, _ := json.Marshal(validationResult)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(j)
		return
	}

	// Persist into the database.
	result, err := parsedBody.UpdateTodoListByID(*l.ID)
	if err != nil {
		e := GenericHTTPError{
			Message: "Unable to update",
		}

		j, _ := json.Marshal(e)

		w.WriteHeader(http.StatusBadRequest)
		w.Write(j)
		return
	}

	// Return updated value to front-end.
	j, _ := json.Marshal(result)

	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

func ValidateCreateList(o *models.TodoList) *models.TodoList {
	isValid := true

	// Struct to contain validation results
	err := &models.TodoList{}

	hasName := o.Name != nil

	isNameLengthValid := hasName && len(strings.TrimSpace(*o.Name)) >= MinStringFieldLen && len(strings.TrimSpace(*o.Name)) <= MaxStringFieldLen
	if !isNameLengthValid {
		// Build validation message for this field
		msg := errStringFieldLengthRangeRequired(MinStringFieldLen, 255)
		err.Name = &msg

		// Fail validation
		isValid = false
	}

	// Iterate over the Items.
	for _, value := range o.Items {
		// Check if the Description is valid.
		isItemDescriptionValid := value.Description != nil && len(strings.TrimSpace(*value.Description)) >= MinStringFieldLen && len(strings.TrimSpace(*value.Description)) <= MaxStringFieldLen

		if isItemDescriptionValid {
			// If the Description is valid, return empty struct to preserve order.
			err.Items = append(err.Items, models.TodoListItem{})
		} else {
			isValid = false

			// If the Description is invalid, return error message.
			msg := errStringFieldLengthRangeRequired(MinStringFieldLen, MaxStringFieldLen)
			err.Items = append(err.Items, models.TodoListItem{
				Description: &msg,
			})
		}
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
