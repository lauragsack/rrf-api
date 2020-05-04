const mongoose = require("mongoose");

const FloatieSchema = mongoose.Schema({
    name: String,
    type: String,
    description: String,
    goodFor: Number,
    deliverable: Boolean,
    dogFriendly: Boolean,
    photo: String,
    price: Number,
    reservations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Reservation"
    }
})

const Floatie = mongoose.model("Floatie", FloatieSchema)

module.exports = Floatie