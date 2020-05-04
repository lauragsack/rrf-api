const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/auth

// get user by Id
router.get("/:id", ctrl.users.show)

// get all users (TODO: delete after testing)
router.get("/", ctrl.users.index)

module.exports = router;