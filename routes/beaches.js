const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/beaches

// get all beaches
router.get("/", ctrl.beaches.index)

module.exports = router;