const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    favFloatie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floatie"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User