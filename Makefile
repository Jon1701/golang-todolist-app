# Environment variables
GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME=golang-todolist-mongodb
GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME=admin
GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD=admin
GOLANG_TODOLIST_MONGO_DATABASE_NAME=todolist

# Starts the Go application.
run:
	go run cmd/web/main.go

# Starts the database.
start-db:
	MONGO_DOCKER_CONTAINER_NAME=${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
	MONGO_INITDB_DATABASE=${GOLANG_TODOLIST_MONGO_DATABASE_NAME} \
	MONGO_INITDB_ROOT_USERNAME=${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME} \
	MONGO_INITDB_ROOT_PASSWORD=${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD} \
		docker-compose up -d

# Stops the database.
stop-db:
	docker-compose down 

# Opens a shell on the database container.
db-shell:
	docker exec -it ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
		"bash"

# Opens Mongo Shell on the database container.
db-mongosh-admin:
	docker exec -it ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
		bash -c 'mongosh mongodb://${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME}:${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD}@localhost:27017/admin'

# Creates application user for MongoDB.
create-mongo-db-user:
	docker cp .db/create-user.js ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME}:/tmp/
	docker exec -it ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
		mongosh mongodb://${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME}:${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD}@localhost:27017/admin --file /tmp/create-user.js