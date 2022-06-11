package main

import (
	"fmt"
	"net/http"

	"github.com/Jon1701/golang-todolist-app/routes"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	apiSubRouter := r.PathPrefix("/api").Subrouter()

	routes.RegisterTodoRoutes(apiSubRouter)

	http.Handle("/", r)

	port := 9000
	fmt.Printf("Server started and listening on port: %v\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
