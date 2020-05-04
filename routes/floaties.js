const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/floaties

// get all floaties
router.get("/", ctrl.floaties.index)

// get a floatie by Id
router.get("/:name", ctrl.floaties.show)

// TODO - delete this route when done testing
router.put("/:name", ctrl.floaties.update)


module.exports = router;