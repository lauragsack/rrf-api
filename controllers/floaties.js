const db = require("../models");

const index = (req, res) => {
    db.Floatie.find({}, (err, allFloaties) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(allFloaties)
    })
}

const show = (req, res) => {
    db.Floatie.findOne({name: req.params.name}, (err, foundFloatie) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong."})
        }
        res.json(foundFloatie)
    })
}

// TODO - delete this controller when done testing
const update = (req, res) => {
    db.Floatie.findOne({name: req.params.name}, (err, foundFloatie) => {
        if (err) {
            return res.status(500).json({status: 500, error: "Something went wrong, please try again."})
        }

        console.log("logging foundFloatie", foundFloatie)

        foundFloatie.name = req.body.name;
        foundFloatie.photo = req.body.photo;
        
        foundFloatie.save((err, savedFloatie) => {
            if (err) {
                return res.status(500).json({status: 500, error: "Something went wrong, please try again."})
            }
            res.json(savedFloatie)
        })
    })
}


module.exports = {
    index,
    show,
    update
}