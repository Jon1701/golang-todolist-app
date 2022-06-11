package models

import (
	"errors"

	"github.com/google/uuid"
)

type TodoList struct {
	ID    *string        `json:"id,omitempty"`
	Name  *string        `json:"name,omitempty"`
	Items []TodoListItem `json:"items,omitempty"`
}

type TodoListItem struct {
	ID          *string `json:"id,omitempty"`
	Description *string `json:"description,omitempty"`
	IsComplete  *bool   `json:"isComplete,omitempty"`
}

// Fake empty database.
var db = []TodoList{}

func (l *TodoList) CreateTodoList() (*TodoList, error) {
	// Create new UUID.
	id := uuid.NewString()

	// Attach id to the list to be persisted.
	l.ID = &id

	// Iterate over the Todo List Items
	for index, _ := range l.Items {
		// Generate ID.
		id := uuid.NewString()

		// Attach ID.
		l.Items[index].ID = &id

		// Explicitly set IsComplete status.
		if l.Items[index].IsComplete == nil {
			b := false
			l.Items[index].IsComplete = &b
		}
	}

	db = append(db, *l)

	return l, nil
}

func GetTodoLists() []TodoList {
	return db
}

func GetTodoListByID(id string) *TodoList {
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

func (l *TodoList) UpdateTodoListByID(id *string) (TodoList, error) {
	// Get the ID of the matching Todo list.
	matchingIndex := -1

	// Get the index of the Todolist in the database.
	for index, value := range db {
		if value.ID == id {
			matchingIndex = index
		}
	}

	// Update fields.
	db[matchingIndex].Name = l.Name

	return db[matchingIndex], nil
}
