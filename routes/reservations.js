const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/reservations

// Get user's reservations
router.get("/user", ctrl.reservations.userReservations)

// Create reservation
router.post("/", ctrl.reservations.create)

// Update reservation
router.put("/:reservationId", ctrl.reservations.update)

// Delete reservation
router.delete("/:reservationId", ctrl.reservations.remove)

// TODO - delete these routes after testing
router.get("/", ctrl.reservations.allReservations)

router.delete("/", ctrl.reservations.removeAllReservations)

router.get("/:id", ctrl.reservations.reservationShow)


module.exports = router;