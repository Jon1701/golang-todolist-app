myDB = db.getSiblingDB("todolist");

// Find existing u
if (myDB.getUser("appuser") == null) {
  myDB.createUser({
    user: "appuser",
    pwd: "appuser",
    roles: [
      {
        role: "readWrite",
        db: "todolist"
      }
    ]
  });
}