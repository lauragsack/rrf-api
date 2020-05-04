const db = require("../models");

const index = (req, res) => {
    db.Beach.find({}, (err, allBeaches) => {
        if (err) {
            return res.status(500).json({status: 400, error: "Something went wrong."})
        }
        res.json(allBeaches)
    })
}



module.exports = {
    index,
}