const mongoose = require("mongoose");

const FloatieSchema = mongoose.Schema({
    name: String,
    type: String,
    description: String,
    goodFor: Number,
    deliverable: Boolean,
    dogFriendly: Boolean,
    photos: {
        show: String,
        index: String
    },
    price: Number,
    reservations: [mongoose.Schema.Types.ObjectId]
})

const Floatie = mongoose.model("Floatie", UserSchema)

module.exports = Floatie