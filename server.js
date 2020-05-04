const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const morgan = require("morgan")
const cors = require("cors")
const app = express()
require("dotenv").config()

const routes = require("./routes")

// MIDDLEWARE

// Handle Cors
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// Logging with Morgan
app.use(morgan("tiny"))

// BodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Express Session - Auth
app.use(session({
    store: new MongoStore({url: process.env.MONGO_URI}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))


// ROUTES
app.get("/", (req, res) => {
    res.send("<h1>AUTH API</h1>")
})

app.use("/api/v1/users", routes.users)
app.use("/api/v1/auth", routes.auth)
// app.use("/api/v1/floaties", routes.floaties)
// app.use("/api/v1/reservations", routes.reservations)
// app.use("/api/v1/beaches", routes.beaches)

// SERVER
app.listen(3001, () => {
    return console.log(`Server connected http://localhost:3001`)
})