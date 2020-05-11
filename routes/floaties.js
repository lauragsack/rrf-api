const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/floaties

// get all floaties
router.get("/", ctrl.floaties.index)

// get a floatie by name
router.get("/:name", ctrl.floaties.show)


module.exports = router;