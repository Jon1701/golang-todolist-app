package models

import (
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
