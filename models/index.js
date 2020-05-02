const mongoose = require('mongoose');
const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/rrf';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(`MongoDB error: ${err}`))

// TODO: export models
module.exports = {
    User: require("./User"),
    Floatie: require("./Floatie")
}