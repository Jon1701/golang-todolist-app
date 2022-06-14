package config

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	db *mongo.Client
)

func Connect() {
	// MongoDB connection string.
	uri := os.Getenv("MONGO_CONN_STRING")

	// Create a new client and connect to the server.
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		fmt.Println("Fatal error")
		return
	}

	db = client
}

func GetDB() *mongo.Client {
	return db
}
