const db = require("../models");
const bcrypt = require("bcrypt");

// POST create new user (signup)
const signup = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({status: 400, message: "Please enter a name, email, and password."})
    }
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) Response.status(500).json({status: 500, message: "Something went wrong. Please try again."})

        if (foundUser) return res.status(400).json({status: 400, message: "A user with that email address already exists."})

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({status: 500, message: "Something went wrong. Please try again."})

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({status: 500, message: "Something went wrong. Please try again."})

                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    favFloatie: req.body.favFloatie,
                    password: hash
                }

                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json({ status: 500, message: err })
                    req.session.currentUser = {id: savedUser._id};
                    console.log(savedUser)
                    console.log("Logging req.session.currentUser", req.session.currentUser)
                    return res.status(200).json({user: savedUser._id, status: 200, message: "User signed up!"})
                })
            })
        })
    })
}

// POST login user
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({status: 400, message: "Please enter your email and password." });
    }
    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({status: 500, message: "Email not found - Something went wrong. Please try again."});

        if (!foundUser) {
            return res.status(400).json({status: 400, message: "We don't recognize that email or password. Please try again."});
        }
        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({error: err, status: 500, message: "Bcrypt - Something went wrong. Please try again."});

            if (isMatch) {
                req.session.currentUser = {id: foundUser._id};
                console.log(req.session)
                console.log("logging foundUser._id", foundUser._id)
                return res.status(200).json({user: foundUser._id, status: 200, message: "Success"})
            } else {
                return res.status(400).json({status: 400, message: "Email or password is incorrect."})
            }
        })
    })
}

// GET verify user
const verify = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({status: 401, message: "Unauthorized."})
    res.status(200).json({status: 200, message: `Current user verified. User ID: ${req.session.currentUser.id}`})
}

// DELETE logout user
const logout = (req, res) => {
    console.log(req.session)
    if (!req.session.currentUser) return res.status(401).json({status: 401, message: "Unauthorized."})

    req.session.destroy((err) => {
        if (err) return res.status(500).json({status: 500, message: "Something went wrong. Please try again."})
        res.sendStatus(200)
    })
}


module.exports = {
    signup,
    login,
    verify,
    logout
}