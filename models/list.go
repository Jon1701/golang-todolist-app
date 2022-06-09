package models

type List struct {
	Name *string `json:"name"`
}

func (l *List) CreateTodoList() *List {
	return l
}
