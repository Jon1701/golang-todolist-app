# Golang Todo List App

## Project Description

This is yet another todo list application, but...written in Golang!

## API Documentation

### Endpoints

| Verb | Endpoint | Description |
| --- | --- | --- | 
| GET | `/api/list` | Gets all Todo Lists | 
| POST | `/api/list` | Creates a new Todo List | 
| GET | `/api/list/{listID}` | Gets a specific Todo List by ID | 
| PATCH | `/api/list/{listID}` | Updates an existing Todo List by ID | 
| DELETE | `/api/list/{listID}` | Deletes a specific Todo List by ID | 

where `listID` is a UUID associated with a specific Todo List.

### Structure

```
{
  "id": "0c71252b-0405-4b8b-89ab-4d49da812449",
  "name":"Golang Todo List",
  "items":[
    {
      "description": "Write Hello World",
      "isComplete": false
    }
  ]
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Ignored in Request Body | Unique Identifier for the Todo List |
| `name` | `string` | Yes | Name of the list. Limited to 255 characters in length |
| `items` | `[]Item` | No | Array of Todo List Items |
| `items[0]` | `Item` | No | Todo List Item (`[]Item`) |
| `items[0].description` | `string` | Yes | Item description |
| `items[0].isComplete` | `boolean` | No | Indicates completion status |