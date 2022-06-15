# Environment variables
GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME=golang-todolist-mongodb
GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME=admin
GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD=admin
GOLANG_TODOLIST_MONGO_DATABASE_NAME=todolist
GOLANG_TODOLIST_MONGO_APP_USERNAME=appuser
GOLANG_TODOLIST_MONGO_APP_PASSWORD=appuser

# Starts the Go application.
run:
	MONGO_CONN_STRING="mongodb://${GOLANG_TODOLIST_MONGO_APP_USERNAME}:${GOLANG_TODOLIST_MONGO_APP_PASSWORD}@localhost:27017/${GOLANG_TODOLIST_MONGO_DATABASE_NAME}" \
		go run cmd/web/main.go

# Starts application services.
start-services:
	@echo "Starting application services..."
	MONGO_DOCKER_CONTAINER_NAME=${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
	MONGO_INITDB_DATABASE=${GOLANG_TODOLIST_MONGO_DATABASE_NAME} \
	MONGO_INITDB_ROOT_USERNAME=${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME} \
	MONGO_INITDB_ROOT_PASSWORD=${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD} \
		docker-compose up -d
	@echo "Done starting application services"

# Stops application services.
stop-services:
	@echo "Stopping services..."
	@docker-compose down 
	@echo "Done stopping services"

# Opens a shell on the database container.
db-shell:
	@docker exec -it ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
		"bash"

# Opens Mongo Shell on the database container.
db-mongosh:
	@docker exec -it ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
		bash -c 'mongosh mongodb://${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME}:${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD}@127.0.0.1:27017/admin'

# Creates application user in MongoDB.
create-mongodb-application-user:
	@echo "Creating application user in MongoDB..."
	@docker cp .db/create-user.js ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME}:/tmp/
	@docker exec -it ${GOLANG_TODOLIST_MONGO_DOCKER_CONTAINER_NAME} \
		mongosh mongodb://${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_USERNAME}:${GOLANG_TODOLIST_MONGO_DATABASE_ROOT_PASSWORD}@127.0.0.1:27017/admin --file /tmp/create-user.js
	@echo "Done creating application user in MongoDB"

# Waits for 5 seconds.
wait-5s:
	@echo "Waiting for 5 seconds..."
	@sleep 5s
	@echo "Done waiting"
