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


// TODO - fix saving floaties
const create = (req, res) => {
    console.log("--------------------------------")
    console.log("req.body:", req.body)
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

    // this works but doesn't make it into db.create
//     req.body.floaties.forEach(floatie => {
//         db.Floatie.findById(floatie.floatie, (err, foundFloatie) => {
//             if (err) {
//                 return res.status(500).json({status: 500, error: "Something went wrong."})
//             }
//             console.log("foundFloatie", foundFloatie)
//             reservation.floaties.push({floatie: foundFloatie, quantity: floatie.quantity});
//             console.log("--------------------------------")
//             console.log("floaties", reservation.floaties)
//             console.log("--------------------------------")
//     })
// })

    if (reservation.type === "Pickup") {
        console.log("got to pickup code block")
        db.Beach.findById(reservation.pickupAddress, (err, foundBeach) => {
            if (err) {
                return res.status(500).json({status: 500, error: "Something went wrong."})
            }
            reservation.pickupAddress = foundBeach;
 
            db.Reservation.create(reservation, (err, newReservation) => {
                console.log("--------------------------------")
                console.log("reservation", reservation)
                console.log("--------------------------------")
        
            if (err) {
                return res.status(500).json({status: 500, error: "Something went wrong."})
            }
            res.json(newReservation)
            }) 
        })
    } else if (reservation.type === "Delivery") {
        console.log("got to delivery code block")
        db.Reservation.create(reservation, (err, newReservation) => {
            console.log("--------------------------------")
            console.log("reservation", reservation)
            console.log("--------------------------------")
    
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(newReservation)
        }) 
    }
}


const update = (req, res) => {
    console.log("req.body:", req.body)
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }

    db.Reservation.findById(req.params.reservationId, (err, foundReservation) => {
        if (err) {
            return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
        }
    
        if (req.body.type === "Pickup") {
            db.Beach.findById(req.body.reservation.pickupAddress, (err, foundBeach) => {
                if (err) {
                    return res.status(500).json({status: 500, error: "Something went wrong."})
                }

                foundReservation.type = req.body.type;
                foundReservation.pickupAddress = foundBeach;

                foundReservation.save((err, savedReservation) => {
                    console.log("saving")
                    if (err) {
                        return res.status(500).json({status: 500, message: "Something went wrong, please try again."})
                    }
                    res.json(savedReservation)
                }) 
            })
        } else if (foundReservation.type === "Delivery") {
            foundReservation.type = req.body.reservation.type;
            console.log("req.body.type:", req.body.type)
            console.log("foundReservation.type:", foundReservation.type)

            foundReservation.deliveryAddress = req.body.reservation.deliveryAddress;
            console.log("req.body.reservation.deliveryAddress:", req.body.reservation.deliveryAddress)
            console.log("foundReservation.deliveryAddress:", foundReservation.deliveryAddress)

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
    show,
    // TODO - delete below after testing
    allReservations,
    removeAllReservations
}