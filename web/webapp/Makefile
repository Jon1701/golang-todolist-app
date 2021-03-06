# Path to folders.
PATH_TO_NODE_BIN=./node_modules/.bin

# Ports
PORT_DEV_SERVER=8080

# Installs dependencies
install-node-dependencies:
	@echo Installing Node dependencies...
	@npm ci
	@echo Done installing Node dependencies

# Run all linters.
lint: run-eslint run-prettier

# Run ESLint.
run-eslint:
	@echo "Running ESLint..."
	@${PATH_TO_NODE_BIN}/next lint
	@echo "Done running ESLint"

# Run Stylelint.
run-stylelint:
	@echo "Running Stylelint..."
	@${PATH_TO_NODE_BIN}/stylelint "**/*.tsx"
	@echo "Done running Stylelint"

# Run Prettier.
run-prettier:
	@echo "Running Prettier..."
	@${PATH_TO_NODE_BIN}/prettier --check **/*.{ts,tsx,js}
	@echo "Done running Prettier"

# Starts development server
dev:
	@echo "Starting development server..."
	@PORT=${PORT_DEV_SERVER} \
		${PATH_TO_NODE_BIN}/next dev
	@echo "Done starting development server"

# Builds the front-end.
build:
	@echo "Building webapp..."
	@${PATH_TO_NODE_BIN}/next build
	@echo "Done building webapp"

# Exports the front-end to static HTML.
export: build
	@echo "Exporting webapp..."
	@${PATH_TO_NODE_BIN}/next export
	@echo "Done exporting webapp"