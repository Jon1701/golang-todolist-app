package models

import (
	"errors"

	"github.com/google/uuid"
)

type List struct {
	ID   *string `json:"id"`
	Name *string `json:"name"`
}

// Fake empty database.
var db = []List{}

func (l *List) CreateTodoList() (*List, error) {
	// Create new UUID.
	id := uuid.NewString()

	// Attach id to the list to be persisted.
	l.ID = &id

	db = append(db, *l)

	return l, nil
}

func GetTodoLists() []List {
	return db
}

func GetTodoListByID(id string) *List {
	for _, value := range db {
		if id == *value.ID {
			return &value
		}
	}

	return nil
}

func DeleteTodoListByID(id string) error {
	// Index of the matching todo list.
	matchingIndex := -1

	for i, value := range db {
		if *value.ID == id {
			matchingIndex = i
		}
	}

	if matchingIndex < 0 {
		return errors.New("List not found")
	}

	// Remove matching element.
	db = append(db[:matchingIndex], db[matchingIndex+1:]...)

	return nil
}
