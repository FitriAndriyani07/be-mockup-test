const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const todos = require('../controllers/todos');
const middlewares = require('../middlewares/auth');

router.get("/", (req, res) =>
  res.status(200).json({
    status:true,
    message: "Welcome to TodoApps API",
  })
);

// USERS
router.post("/register", users.register);
router.post("/login", users.login);

// TODOS
router.post("/todos", middlewares.auth, todos.store);
router.get("/users/:id/todos", middlewares.auth, todos.show);
router.put("/todos", middlewares.auth, todos.edit);
router.get("/todos/:id", middlewares.auth, todos.index);
router.delete("/todos/:id", middlewares.auth, todos.delete);

module.exports = router;