package routes

import (
	"github.com/gorilla/mux"

	"github.com/Jon1701/golang-todolist-app/controllers"
)

var RegisterTodoRoutes = func(r *mux.Router) {
	r.HandleFunc("/list", controllers.CreateTodoList).Methods("POST")
	r.HandleFunc("/list", controllers.GetTodoLists).Methods("GET")
}
