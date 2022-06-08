package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Hello World")

	port := 9000
	fmt.Printf("Server started and listening on port: %v\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
