var router = require("express").Router();

var mongoose = require('mongoose');
const snake = require("../controllers/snake.controller");

// Register a new snake
router.get("/:username/:pass/register", snake.register);

// Login a new snake
router.get("/:username/:pass/login", snake.login);

// Retrieve all snake
router.get("/", snake.findAll);


// Retrieve a single snake with id
// router.get("/:id", snake.findOne);

// Update a snake with id
// router.put("/:id", snake.update);

// Delete a snake with id
// router.delete("/:id", snake.delete);

// Create a new snake
// router.delete("/", snake.deleteAll);

module.exports = router;
