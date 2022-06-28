# Golang Todo List App

## Project Description

This is yet another todo list application, but...written in Golang!

## Requirements

- [GNU Make](https://www.gnu.org/software/make/)
- [Go v1.18.3](https://go.dev/)
- [Docker v20.10.17](https://www.docker.com/)
  - [Docker Compose v2.6.0](https://www.docker.com/)
- [Node Version Manager v0.39.1](https://github.com/nvm-sh/nvm)
  - [nvm Deep Shell Integration](https://github.com/nvm-sh/nvm#deeper-shell-integration)
  - [Node.js v16.15.1 LTS](https://github.com/nvm-sh/nvm#long-term-support)

## API Documentation

### Endpoints

| Verb   | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| GET    | `/api/list`          | Gets all Todo Lists                  |
| POST   | `/api/list`          | Creates a new Todo List              |
| GET    | `/api/list/{listID}` | Gets a specific Todo List by ID      |
| PUT    | `/api/list/{listID}` | Replaces an existing Todo List by ID |
| DELETE | `/api/list/{listID}` | Deletes a specific Todo List by ID   |

where `listID` is a UUID associated with a specific Todo List.

### Structure

```
{
  "id": "62ab7f67ffe8a97663fc2283",
  "name":"Golang Todo List",
  "items":[
    {
      "description": "Write Hello World",
      "isComplete": false
    }
  ]
}
```

| Field                  | Type                                      | Required                | Description                                           |
| ---------------------- | ----------------------------------------- | ----------------------- | ----------------------------------------------------- |
| `id`                   | `string` (Converts to a MongoDB ObjectID) | Ignored in Request Body | Unique Identifier for the Todo List.                  |
| `name`                 | `string`                                  | Yes                     | Name of the list. Limited to 255 characters in length |
| `items`                | `[]Item`                                  | No                      | Array of Todo List Items                              |
| `items[0]`             | `Item`                                    | No                      | Todo List Item (`[]Item`)                             |
| `items[0].description` | `string`                                  | Yes                     | Item description                                      |
| `items[0].isComplete`  | `boolean`                                 | No                      | Indicates completion status                           |
