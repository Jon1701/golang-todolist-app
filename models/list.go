package models

import (
	"errors"

	"github.com/Jon1701/golang-todolist-app/config"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/mongo"
)

type TodoList struct {
	ID    *string        `json:"id,omitempty"`
	Name  *string        `json:"name,omitempty"`
	Items []TodoListItem `json:"items,omitempty"`
}

type TodoListItem struct {
	Description *string `json:"description,omitempty"`
	IsComplete  *bool   `json:"isComplete,omitempty"`
}

// Fake empty database.
var db = []TodoList{}
var client *mongo.Client

func init() {
	config.Connect()
	client = config.GetDB()
}

func (l *TodoList) CreateTodoList() (*TodoList, error) {
	// Create new UUID.
	id := uuid.NewString()

	// Attach id to the list to be persisted.
	l.ID = &id

	// Iterate over the Todo List Items
	for index := 0; index < len(l.Items); index++ {
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
		return errors.New("list not found")
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

	// Iterate over the Todo List Items
	for index := 0; index < len(l.Items); index++ {
		// Explicitly set IsComplete status.
		if l.Items[index].IsComplete == nil {
			b := false
			l.Items[index].IsComplete = &b
		}
	}

	// Update fields.
	db[matchingIndex].Name = l.Name
	db[matchingIndex].Items = l.Items

	return db[matchingIndex], nil
}
