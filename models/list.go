package models

type List struct {
	ID   *string `json:"id"`
	Name *string `json:"name"`
}

// Fake empty database.
var db = []List{}

func (l *List) CreateTodoList() (*List, error) {
	db = append(db, *l)

	return l, nil
}

func GetTodoLists() []List {
	return db
}
