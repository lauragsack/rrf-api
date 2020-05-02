const mongoose = require("mongoose");

const BeachSchema = new mongoose.Schema({
    place_id: String,
    name: String,
    address: String,
    location: {
        lat: Number,
        lng: Number
    },
    rating: Number,
    numRatings: Number,
    photo: {
        html_attributions: String,
        height: Number,
        width: Number,
        photo_reference: String,
    },
    reservations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Reservation"
    }
})

const Beach = mongoose.model("Beach", BeachSchema)

module.exports = Beach