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
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }

    db.Reservation.create(req.body, (err, newReservation) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }

        newReservation.user = req.session.currentUser.id;
        newReservation.save((err, savedReservation) => {
            if (err) {
                return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
            }
        
        // let beachToUpdate = newReservation.pickupAddress;
        // console.log("--------------------")
        // console.log("logging beach to update", beachToUpdate)
        // console.log("--------------------")
        // beachToUpdate.reservations.push(newReservation.id)
    
        // beachToUpdate.save((err, savedBeach) => {
        //     if (err) {
        //         return res.status(500).json({status: 500, error: "Something went wrong."})
        //     }
        //     console.log("--------------------")
        //     console.log("logging updated beach:", savedBeach);
        //     console.log("--------------------")
        // })

        // let floatiesToUpdate = newReservation.floaties
        // floatiesToUpdate.forEach(floatie => {
        //     floatie.floatie.reservations.push(newReservation.id)
        //     floatie.floatie.save((err, savedFloatie) => {
        //         if (err) {
        //             return res.status(500).json({status: 500, error: "Something went wrong."})
        //         }
        //         console.log("--------------------")
        //         console.log("logging updated floatie:", savedFloatie)
        //         console.log("--------------------")
        //     })
        // })
        
        res.json(savedReservation)
        })
    })
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

// TODO - splice reservationId from beach.reservations and floatie.reservations
const remove = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }
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