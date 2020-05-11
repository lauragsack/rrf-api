const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/auth

// get user by Id
router.get("/:id", ctrl.users.show)


module.exports = router;