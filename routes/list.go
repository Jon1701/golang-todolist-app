package routes

import (
	"github.com/gorilla/mux"

	"github.com/Jon1701/golang-todolist-app/controllers"
)

var RegisterTodoRoutes = func(r *mux.Router) {
	r.HandleFunc("/list/{listID}", controllers.GetTodoListByID).Methods("GET")
	r.HandleFunc("/list/{listID}", controllers.DeleteTodoListByID).Methods("DELETE")
	r.HandleFunc("/list/{listID}", controllers.UpdateTodoListByID).Methods("PUT")
	r.HandleFunc("/list", controllers.CreateTodoList).Methods("POST")
	r.HandleFunc("/list", controllers.GetTodoLists).Methods("GET")
}
