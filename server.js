const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const morgan = require("morgan")
const cors = require("cors")
const app = express()


// MIDDLEWARE


// ROUTES
app.get("/", (req, res) => {
    res.send("<h1>AUTH API</h1>")
})

// SERVER
app.listen(3001, () => {
    return console.log(`Server connected http://localhost:3001`)
})