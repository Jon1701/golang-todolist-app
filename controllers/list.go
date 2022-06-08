package controllers

import (
	"fmt"
	"net/http"
)

func CreateTodoList(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Todolist created")
}
