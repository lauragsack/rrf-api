const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/beaches

// get all beaches
router.get("/", ctrl.beaches.index)

// delete a beach (TODO: remove after testing)
router.delete("/:beachId", ctrl.beaches.remove)


module.exports = router;