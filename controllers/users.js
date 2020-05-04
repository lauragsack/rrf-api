const db = require("../models");
const auth = require("./auth")

const show = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({status: 401, message: "Unauthorized."})
    }
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        })
        res.status(200).json({
            status: 200, 
            data: foundUser
        })
    })
}


const index = (req, res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(allUsers)
    })
}


module.exports = {
    show,
    index
}