const mongoose = require("mongoose");
const db = require("./models");
require("dotenv").config()
const dbUrl = process.env.MONGODB_URI ;
const key = process.env.KEY;
const fetch = require('node-fetch');


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(`MongoDB error: ${err}`))


const newFloatie = [
    {
        name: "Duncan the Unicorn",
        type: "raft",
        description: "Duncan wants you to know unicorns are great swimmers too! He'll keep you looking majestic all day long.",
        dogFriendly: false,
        goodFor: 1,
        deliverable: true,
        photo: "https://images.unsplash.com/photo-1585544313985-f84aac5abf7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        price: 15,
        reservations: []
    },
    {
        name: "Queen Calipsy",
        type: "raft",
        description: "She's fierce, she's fun, and she floats like a dream. Grab a pal and get in the water!",
        dogFriendly: true,
        goodFor: 2,
        deliverable: false,
        photo: "https://i.imgur.com/5Q3f4Pc.jpg",
        price: 30,
        reservations: []
    },
    {
        name: "Donut Tube",
        type: "innertube",
        description: "Classic way to float in what we would argue is the perfect food.",
        dogFriendly: false,
        goodFor: 1,
        deliverable: true,
        photo: "https://i.imgur.com/3aIEIdg.jpg",
        price: 10,
        reservations: []
    },
    {
        name: "Watermelon Tube",
        type: "innertube",
        description: "Classic way to float in the quintessential summertime treat.",
        dogFriendly: false,
        goodFor: 1,
        deliverable: true,
        photo: "https://images.unsplash.com/photo-1528129569480-450ab57e9499?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        price: 10,
        reservations: []
    },
    {
        name: "NYC Slice",
        type: "innertube",
        description: "Nothing like slinging slices on the riv'. Float on your favorite food in your favorite place!",
        dogFriendly: false,
        goodFor: 1,
        deliverable: true,
        photo: "https://i.imgur.com/f6ehKZZb.jpg",
        price: 15,
        reservations: []
    },
    {
        name: "Costco Pizza",
        type: "raft",
        description: "Do the words 'Costco pizza' make you smile? Same. This vessel guarantees a good time. Use all 8 slices or go halfsies.",
        dogFriendly: true,
        goodFor: 8,
        deliverable: false,
        photo: "https://images.unsplash.com/photo-1504740026538-8f4a7e4806ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        price: 50,
        reservations: []
    },
    {
        name: "Captain",
        type: "raft",
        description: "Be the captain of your own ship! Paddles included for optional exercise.",
        dogFriendly: true,
        goodFor: 1,
        deliverable: false,
        photo: "https://i.imgur.com/HQLx6aU.jpg",
        price: 35,
        reservations: []
    },
];

// db.Floatie.insertMany(newFloatie, (err, floatie) => {
//     if (err) {
//         console.log(err);
//         process.exit();
//     } else {
//         console.log("Created new floatie", floatie);
//         process.exit();
//     }
// });

// db.Floatie.deleteMany({}, (err, result) => {
//     if (err) {
//         console.log(err);
//         process.exit();
//     }
//     console.log(`Successfully deleted ${result.deletedCount} floaties`);
//     process.exit();
// });


async function createBeaches() {
    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=guerneville+beaches&key=${key}`;
    const data = await fetch(endpoint).then(res => res.json());
    let newBeaches = [];
    data.results.forEach(beach => {
        newBeach = {
            name: beach.name,
            address: beach.formatted_address,
            location: beach.geometry.location,
            rating: beach.rating,
            numRatings: beach.user_ratings_total,
            photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${beach.photos[0].width}&photoreference=${beach.photos[0].photo_reference}&key=${key}`,
            place_id: beach.place_id,
            reservations: []
        }
        newBeaches.push(newBeach);
    })
    db.Beach.insertMany(newBeaches, (err, beach) => {
        if (err) {
            console.log(err);
            process.exit();
        } else {
            console.log("Created new beach", beach);
            process.exit();
        }
    });
}

createBeaches();

// db.Beach.deleteMany({}, (err, result) => {
//     if (err) {
//         console.log(err);
//         process.exit();
//     }
//     console.log(`Successfully deleted ${result.deletedCount} beaches`);
//     process.exit();
// });



