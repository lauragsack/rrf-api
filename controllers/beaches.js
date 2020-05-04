const db = require("../models");

const index = (req, res) => {
    db.Beach.find({}, (err, allBeaches) => {
        if (err) {
            return res.status(500).json({status: 400, error: "Something went wrong."})
        }
        res.json(allBeaches)
    })
}

// TODO: remove this controller after testing
const remove = (req, res) => {
    db.Beach.findByIdAndDelete(req.params.beachId, (err, foundBeach) => {
        if (err) {
            return res.status(500).json({status: 400, error: "Something went wrong."})
        }
        res.json(foundBeach)
    })
}


module.exports = {
    index,
    remove,
}