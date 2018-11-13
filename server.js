require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

const airports = require('airport-codes/airports.json')
    .filter(function(cityObject){
        return !cityObject.name.includes("Heli")
    })
    .filter(function(cityObject){
        return !cityObject.name.includes("Bus")
    })
    .filter(function(cityObject){
        return cityObject.icao !== "\\N" || cityObject.name.startsWith('All') //UNLESS cityObject.name CONTAINS "All"
    })
    .filter(function(cityObject){
        return cityObject.iata !== ""
    })
    .map(cityObject => Object.assign(cityObject, {value: cityObject.iata, label: `${cityObject.city} - ${cityObject.name} - ${cityObject.iata} - ${cityObject.country}`}));

function filterAirport(airport, query) {
    return airport.city.startsWith(query) || airport.iata === query
}

const tripWordsArray = ['trip','holiday','vacation','break','rest','recess',
                        'tour', 'journey','voyage','vacay','hols'];

io.on("connection", socket => {
  console.log("New client connected");
  setInterval(() => getApiAndEmit(socket), 1000000000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
  try {
    const res = await fetch(
      "https://api.darksky.net/forecast/81723aec02f11fffdcebd670b516a840/43.7695,11.2558"
    ).then(res => res.json());
    socket.emit("FromAPI", res.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.stack}`);
  }
};

const api = process.env.GOOGLE_API;
const unsplashId = process.env.UNSPLASH_API;


app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/dist', express.static('dist'));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/api/airports', function (req, res) {
     const city = req.query.query;
     const results = airports.filter(function(airport){
         return filterAirport(airport, city)
         });
    res.json(results)
});

app.post("/api/login", (req, res) => {
  db.one(
    `SELECT * FROM customer
            WHERE email=$1 and password=$2`,
    [req.body.email, req.body.password]
  )
    .then(data => res.json(data))
    .catch(error => res.json({ error: error.message }));
}); //allows a customer to login - NOTE USES PASSWORD NOT BCRYPT HASH ATM

app.post("/api/trip", (req,res) =>{
    console.log(req.body);
    const randomNum = Math.floor(Math.random()*tripWordsArray.length);
    const randomArrayValue = tripWordsArray[randomNum];
    const destinationSplit = req.body.trip.destination.split(" ");
    const destinationJoin = destinationSplit.join("-");
    const randomURLString = `${req.body.user.name}-${destinationJoin}-${randomArrayValue}`;
    
  const photoUrl = `https://api.unsplash.com/search/photos?page=1&query=${
    req.body.trip.destination
  }&client_id=${unsplashId}`;

  fetch(photoUrl)
    .then(response => response.json())

    .then(unSplashData => unSplashData.results[0].urls.regular)
    .then(unsplashImage => {
      db.one(
        `INSERT INTO trip (url, name, origin, destination, details, image, customer_id)
                VALUES($1,$2,$3,$4,$5, $6, $7) RETURNING id`,
        [
          randomURLString,
          req.body.trip.tripName,
          req.body.trip.origin,
          req.body.trip.destination,
          req.body.trip.details,
          unsplashImage,
          req.body.user.id
        ]
      )
        .then(trip => {
          const response = {
            id: trip.id,
            fname: req.body.fname,
            destination: req.body.destination
          };
          return res.json(response);
        })
        .catch(error => {
          // console.log(error.stack)
          res.json({ error: error.message });
        });
    })
    .catch(error => console.error(error));
}); //allows logged in customer to add a trip (will error if not logged in as needs id)

app.post("/api/suggestion", (req, res) => {

  db.one(
    `INSERT INTO suggestion (place_name, place_address, place_id, place_category, trip_id, customer_id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [
      req.body.place.name,
      req.body.place.formatted_address,
      req.body.place.place_id,
      req.body.place.types[0],
      req.body.trip,
      req.body.user
    ]
  )
    .then(suggestion => {
      return res.json({ suggestionID: suggestion.id });
    })
    .catch(error => {
      console.error(req.body.place.name, error);
      res.json({ error: error.message });
    });
}); // allows a suggestion to be made (will error if not logged in as needs id)

app.post("/api/comment", (req, res) => {
  db.one(
    `INSERT INTO comment (suggestion_id, customer_id, comment)
            VALUES ($1, $2, $3) RETURNING id`,
    [req.body.suggest_id, req.body.cust_id, req.body.comment]
  )
    .then(id => {
      return res.json({ commentID: id });
    })
    .catch(error => {
      console.error(error.stack);
      res.json({ error: error.message });
    });
}); // al

app.post("/api/customer", (req, res) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then(function(hash) {
      return db.one(
        `INSERT INTO customer (first_name, email, password, hash) VALUES ($1, $2, $3, $4) RETURNING id`,
        [req.body.fname, req.body.email, req.body.password, hash]
      );
    })
    .then(result => {
      return res.json({ id: result.id });
    })
    .catch(error => res.json({ error: error.message }));
}); // allows a comment to be added to DB. Returns new comment ID if success

app.get("/api/user/:id/trip", function(req, res) {
  const userId = req.params.id;
  // console.log(req.params)
  db.any("SELECT * FROM trip WHERE customer_id = ($1)", [userId])
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.get("/api/trip/:id/suggestion", function(req, res) {
  const tripId = req.params.id;

  db.any(
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name , comment.comment FROM customer, suggestion, comment, trip WHERE customer.id = suggestion.customer_id AND trip_id = ($1) AND suggestion.id = comment.suggestion_id GROUP BY suggestion.customer_id, suggestion.id, customer.id, comment.id",
    [tripId]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.post("/api/google", function(req, res) {
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
      req.body.place
    }%in%${req.body.location}&key=${api}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      return res.json(data.results);
    })
    .catch(console.error);
});

app.get("*", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/api/flights", (req, res) => {
    console.log(req.body);
    let request = req.body.flightObject;
    db.one(
        `INSERT INTO flight (
        airport_from, 
        airport_to, 
        city_from, 
        city_to, 
        flight_combination_id, 
        outbound_flight_date, 
        outbound_local_departure_time, 
        outbound_local_arrival_time, 
        price, 
        return_flight_date, 
        return_local_arrival_time, 
        return_local_departure_time)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
        [
            request.airportFrom,
            request.airportTo,
            request.cityFrom,
            request.cityTo,
            request.flightCombinationID,
            request.outboundFlightDate,
            request.outboundLocalDepartureTime,
            request.outboundLocalArrivalTime,
            request.price,
            request.returnFlightDate,
            request.returnLocalArrivalTime,
            request.returnLocalDepartureTime
        ])
        .then(flight => {
            return res.json({flightID: flight.id });
        })
        .catch(error => {
            console.error(error);
            res.json({ error: error.message });
        });
}); // allows a flight to be added

server.listen(8080, function() {
  console.log("Listening on port 8080");
});
