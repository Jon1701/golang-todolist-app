package models

import (
	"context"
	"errors"
	"log"

	"github.com/Jon1701/golang-todolist-app/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TodoList struct {
	ID    *string        `json:"id,omitempty" bson:"_id,omitempty"`
	Name  *string        `json:"name,omitempty" bson:"name,omitempty"`
	Items []TodoListItem `json:"items,omitempty" bson:"items,omitempty"`
}

type TodoListItem struct {
	Description *string `json:"description,omitempty" bson:"description,omitempty"`
	IsComplete  *bool   `json:"isComplete,omitempty" bson:"isComplete,omitempty"`
}

// Fake empty database.
var db = []TodoList{}
var client *mongo.Client
var coll *mongo.Collection

func init() {
	config.Connect()
	client = config.GetDB()
	coll = client.Database("todolist").Collection("lists")
}

func (l *TodoList) CreateTodoList() (*string, error) {
	// Iterate over the Todo List Items
	for index := 0; index < len(l.Items); index++ {
		// Explicitly set IsComplete status.
		if l.Items[index].IsComplete == nil {
			b := false
			l.Items[index].IsComplete = &b
		}
	}

	// Insert document.
	result, err := coll.InsertOne(context.TODO(), l)
	if err != nil {
		return nil, err
	}

	// Get string representation of the Object ID.
	id := result.InsertedID.(primitive.ObjectID).Hex()

	return &id, nil
}

func GetTodoLists() []TodoList {
	cursor, err := coll.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}

	results := make([]TodoList, 0)
	err = cursor.All(context.TODO(), &results)
	if err != nil {
		log.Fatal(err)
	}

	return results
}

func GetTodoListByID(id string) *TodoList {
	// Convert ID to ObjectID.
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil
	}

	filter := bson.M{"_id": objectID}

	var result TodoList
	err = coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil
	}

	return &result
}

func DeleteTodoListByID(id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": objectID}

	res, err := coll.DeleteOne(context.TODO(), filter)

	if res.DeletedCount == 0 {
		return errors.New("not found")
	}

	if err != nil {
		return err
	}

	return nil
}

func (l *TodoList) UpdateTodoListByID(id string) (*TodoList, error) {
	// Iterate over the Todo List Items
	for index := 0; index < len(l.Items); index++ {
		// Explicitly set IsComplete status.
		if l.Items[index].IsComplete == nil {
			b := false
			l.Items[index].IsComplete = &b
		}
	}

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	filter := bson.M{"_id": objectID}

	result, err := coll.ReplaceOne(context.TODO(), filter, l)
	if err != nil {
		return nil, err
	}

	if result.ModifiedCount != 1 {
		return nil, errors.New("nothing to modify")
	}

	// Get updated todo list.
	u := GetTodoListByID(id)

	return u, nil
}
