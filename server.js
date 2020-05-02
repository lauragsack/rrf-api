const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const routes = require("./routes")


// MIDDLEWARE


// ROUTES
app.get("/", (req, res) => {
    res.send("<h1>AUTH API</h1>")
})

app.use("/api/v1/users", routes.users)
app.use("/api/v1/auth", routes.auth)
app.use("/api/v1/floaties", routes.floaties)
app.use("/api/v1/reservations", routes.reservations)
app.use("/api/v1/beaches", routes.beaches)

// SERVER
app.listen(3001, () => {
    return console.log(`Server connected http://localhost:3001`)
})