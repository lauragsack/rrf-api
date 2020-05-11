const db = require("../models");


const show = (req, res) => {
    db.Reservation.findById(req.params.reservationId, (err, foundReservation) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(foundReservation)
    })
}


const userReservations = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }
    
    db.Reservation.find({user: req.session.currentUser.id}, (err, foundReservations) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(foundReservations)
    })
}


const create = (req, res) => {
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

    if (reservation.type === "Pickup") {
        db.Beach.findById(reservation.pickupAddress, (err, foundBeach) => {
            if (err) {
                return res.status(500).json({status: 500, error: "Something went wrong."})
            }
            reservation.pickupAddress = foundBeach;
 
            db.Reservation.create(reservation, (err, newReservation) => {
        
            if (err) {
                return res.status(500).json({status: 500, error: "Something went wrong."})
            }
            res.json(newReservation)
            }) 
        })
    } else if (reservation.type === "Delivery") {
        db.Reservation.create(reservation, (err, newReservation) => {
    
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(newReservation)
        }) 
    }
}


const update = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }

    db.Reservation.findById(req.params.reservationId, (err, foundReservation) => {
        if (err) {
            return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
        }
    
        if (req.body.reservation.type === "Pickup") {
            db.Beach.findById(req.body.reservation.pickupAddress, (err, foundBeach) => {
                if (err) {
                    return res.status(500).json({status: 500, error: "Something went wrong."})
                }

                foundReservation.type = req.body.reservation.type;
                foundReservation.pickupAddress = foundBeach;

                foundReservation.save((err, savedReservation) => {
                    console.log("saving")
                    if (err) {
                        return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
                    }
                    res.json(savedReservation)
                }) 
            })
        } else if (req.body.reservation.type === "Delivery") {
            foundReservation.type = req.body.reservation.type;

            foundReservation.deliveryAddress = req.body.reservation.deliveryAddress;

            foundReservation.save((err, savedReservation) => {
                console.log("saving")
                if (err) {
                    return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
                }
                res.json(savedReservation)
            })
        }
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


module.exports = {
    userReservations,
    create,
    update,
    remove,
    show,
}