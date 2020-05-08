const db = require("../models");


// TODO - delete this after testing
const allReservations = (req, res) => {
    db.Reservation.find({}, (err, foundReservations) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(foundReservations)
    })
}


const userReservations = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }
    console.log(req.session.currentUser.id)


    db.Reservation.find({user: req.session.currentUser.id}, (err, foundReservations) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(foundReservations)
    })
}


// TODO - fix save issue for beach and floatie to update
const create = (req, res) => {
    console.log("--------------------------------")
    console.log("req.body", req.body)
    console.log("--------------------------------")
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }

   let reservation = {
        user: req.body.user,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        totalPrice: req.body.totalPrice,
        type: req.body.type,
        deliveryAddress: req.body.deliveryAddress,
        pickupAddress: req.body.pickupAddress,
        floaties: []
    }

    if (reservation.pickupAddress !== "") {
        db.Beach.findById(reservation.pickupAddress, (err, foundBeach) => {
            if (err) {
                return res.status(500).json({status: 500, error: "Something went wrong."})
            }
            console.log("foundBeach", foundBeach)
            reservation.pickupAddress = foundBeach;

            console.log("--------------------------------")
            console.log("pickupAddress", reservation.pickupAddress)
            console.log("--------------------------------")
        })
    

        req.body.floaties.forEach(floatie => {
            db.Floatie.findById(floatie.floatie, (err, foundFloatie) => {
                if (err) {
                    return res.status(500).json({status: 500, error: "Something went wrong."})
                }
                console.log("foundFloatie", foundFloatie)
                reservation.floaties.push({floatie: foundFloatie, quantity: floatie.quantity});

                console.log("--------------------------------")
                console.log("floaties", reservation.floaties)
                console.log("--------------------------------")
            })
        })    

        console.log("--------------------------------")
        console.log("reservation", reservation)
        console.log("--------------------------------")
        db.Reservation.create(reservation, (err, newReservation) => {

            if (err) {
                return res.status(500).json({status: 500, error: "Something went wrong."})
            }
            res.json(newReservation)
        })
    }
}

// TODO - update floatie.reservations and beach.reservations
const update = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }
    db.Reservation.findById(req.params.reservationId, (err, foundReservation) => {
        foundReservation.startDate = req.body.startDate;
        foundReservation.endDate = req.body.endDate;
        foundReservation.totalPrice = req.body.totalPrice;
        foundReservation.type = req.body.type;
        foundReservation.deliveryAddress = req.body.deliveryAddress;
        foundReservation.pickupAddress = req.body.pickupAddress;
        
        foundReservation.floaties = [];
        req.body.floaties.forEach(floatie => {
            updatedFloatie = {
                floatie: floatie.floatie,
                quantity: floatie.quantity,
            }
            foundReservation.floaties.push(updatedFloatie);
        })

        foundReservation.save((err, savedReservation) => {
            if (err) {
                return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
            }
            res.json(savedReservation)
        })
    })
}


const remove = (req, res) => {
    db.Reservation.findByIdAndDelete(req.params.reservationId, (err, deletedReservation) => {
        if (err) {
            return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
        }
        res.json(deletedReservation)
    })
}

// TODO - delete this after testing
const removeAllReservations = (req, res) => {
    db.Reservation.deleteMany({}, (err, deletedReservations) => {
        if (err) {
            return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
        }
        res.json(deletedReservations)
    })
}

module.exports = {
    userReservations,
    create,
    update,
    remove,
    // TODO - delete below after testing
    allReservations,
    removeAllReservations
}