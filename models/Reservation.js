const mongoose = require("mongoose");
const Floatie = require("./Floatie");
const Beach = require("./Beach");

const ReservationSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    floaties: [
        {
            floatie: Floatie.schema,
            quantity: Number
        }
    ],
    totalPrice: Number,
    type: String,
    deliveryAddress: String,
    pickupAddress: Beach.schema,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    resCollaborators: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }
})

const Reservation = mongoose.model("Reservation", ReservationSchema)

module.exports = Reservation

