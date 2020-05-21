# Russian River Floaties

### About This Web App
https://russian-river-floaties.herokuapp.com/

The Russian River is my happy place. My sister and I float the river each summer. An integral part of the fun is the floaties, but they're also inconvenient. 

If you live in a city or don't frequent a large body of water, you likely don't have a float handy. Before you can start floating, you first need to acquire a floatie. Then you need to get the floatie blown up (think falty pumps and paying for air). Next you need to transport the unwieldy inflated floatie to wherever you're staying and shuttle it back and forth to the river. Finally you need to deflate it before you leave and bring it home to collect dust. It's a process! 

I created this app to make floaties easy. Reserve online, pickup at the beach or get them delivered to wherever is convenient for you. Return them or get them picked back up when you're done.

### User Stories
For a complete list of Russian River Floaties user stories, checkout this [Trello board.](https://trello.com/invite/b/rULRgCqy/bf3c66380a67b21f309d5439a8a5b36a/floatie-project) See the "Post MVP" card list for RRF's future plans. See the "Bugs" card list for open bugs.

### Wireframes

![Wireframes](https://i.imgur.com/YIJlGmW.png)

![Wireframes](https://i.imgur.com/huhUnPA.png)

![Wireframes](https://i.imgur.com/tPVyxSy.png)

![Wireframes](https://i.imgur.com/Q90Oc0K.png)

### ERD
![ERD](https://i.imgur.com/t0aMvFD.png)

### Technologies Used
I built this app using a MERN stack (MongoDB, Express, React, Node), Google Places API, Google Maps Static API, and React Bootstrap.

#### Installation Steps

##### Frontend
* Fork and clone this repo [frontend repo](https://github.com/lauragsack/rrf-client)
* Run "npm i" to install dependencies
* Run "npm start" to load the frontend
* Frontend runs at https://localhost:3001
* Dependencies:
  * axios
  * bootstrap
  * react-bootsrap
  * react-dom
  * react-router-dom
  * react-scripts

##### Backend
* For and clone this repo [backend repo](https://github.com/lauragsack/rrf-client)
* The server runs at https://localhost:3001
* Run "npm i" to install dependencies
* Run "node server.js" to start the server
* Run "nodemon" to keep the server running in the background
* Run "node seed" to seed your data
* Dependencies:
  * bcrypt
  * body-parser
  * cors
  * dotenv
  * express
  * express-session
  * mongoose
  * morgan
  * node-fetch

##### References
These sources helped make Russian River Floaties a reality:
* https://unsplash.com/
* https://www.freelogodesign.org/
* https://thenounproject.com/search/?q=floatie&i=1866474
* https://burst.shopify.com/
* https://react-bootstrap.github.io/getting-started/introduction/
* https://developers.google.com/places/web-service/intro
* https://developers.google.com/maps/documentation/maps-static/dev-guide
* https://github.com/d3/d3-fetch/issues/19
* https://www.npmjs.com/package/node-fetch
* https://stackoverflow.com/questions/58021942/date-conversion-in-react-js
* https://github.com/reactstrap/reactstrap/issues/431
* https://flaviocopes.com/how-to-count-days-between-dates-javascript/
* https://stackoverflow.com/questions/38810843/how-can-i-write-an-else-if-structure-using-react-jsx-the-ternary-is-not-expr
* https://medium.com/better-programming/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c
* https://stackoverflow.com/questions/45054970/react-updating-one-state-property-removes-other-states-properties-in-the-state
* https://github.com/reactjs/react-modal/issues/702
