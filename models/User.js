const mongoose = require("mongoose");
const Floatie = require("./Floatie");

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
        required: [true, "Password is required"],
    },
    favFloatie: Floatie.schema,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User