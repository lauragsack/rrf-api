const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/reservations

// Get user's reservations
router.get("/user", ctrl.reservations.userReservations)

// Get a reservation
router.get("/:reservationId", ctrl.reservations.show)

// Create reservation
router.post("/", ctrl.reservations.create)

// Update reservation
router.put("/:reservationId", ctrl.reservations.update)

// Delete reservation
router.delete("/:reservationId", ctrl.reservations.remove)



module.exports = router;