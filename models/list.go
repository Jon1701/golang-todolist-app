package models

type List struct {
	ID   *string `json:"id"`
	Name *string `json:"name"`
}

var db []List

func (l *List) CreateTodoList() (*List, error) {
	db = append(db, *l)

	return l, nil
}
