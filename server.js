require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fetch = require("node-fetch");
const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = pgp({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

app.use("/dist", express.static("dist"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: "hello goodevening welcome and goodbye. carter usm", // used to generate session ids
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

const airports = require("airport-codes/airports.json")
  .filter(function(cityObject) {
    return !cityObject.name.includes("Heli");
  })
  .filter(function(cityObject) {
    return !cityObject.name.includes("Bus");
  })
  .filter(function(cityObject) {
    return cityObject.icao !== "\\N" || cityObject.name.startsWith("All"); //UNLESS cityObject.name CONTAINS "All"
  })
  .filter(function(cityObject) {
    return cityObject.iata !== "";
  })
  .map(cityObject =>
    Object.assign(cityObject, {
      value: cityObject.iata,
      label: `${cityObject.city} - ${cityObject.name} - ${cityObject.iata} - ${
        cityObject.country
      }`
    })
  );

function filterAirport(airport, query) {
  return airport.city.startsWith(query) || airport.iata === query;
}

const tripWordsArray = [
  "trip",
  "holiday",
  "vacation",
  "break",
  "rest",
  "recess",
  "tour",
  "journey",
  "voyage",
  "vacay",
  "hols"
];

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

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.get("/api/airports", function(req, res) {
  const city = req.query.query;
  const results = airports.filter(function(airport) {
    return filterAirport(airport, city);
  });
  res.json(results);
});

app.post("/api/trip", isLoggedIn, (req, res) => {
  const randomNum = Math.floor(Math.random() * tripWordsArray.length);
  const randomArrayValue = tripWordsArray[randomNum];
  const destinationSplit = req.body.trip.destination.split(" ");
  const destinationJoin = destinationSplit.join("-");
  const randomURLString = `${
    req.body.user.name
  }-${destinationJoin}-${randomArrayValue}`;
  const suggest_code = `${randomNum}_${
    req.body.trip.destination.split(" ")[0]
  }_${req.body.user.id}_suggest`;
  const collaborate_code = `${randomNum}_${
    req.body.trip.destination.split(" ")[0]
  }_${req.body.user.id}_collarborate`;

  const photoUrl = `https://api.unsplash.com/search/photos?page=1&query=${
    req.body.trip.destination
  }&client_id=${unsplashId}`;

  fetch(photoUrl)
    .then(response => response.json())

    .then(unSplashData => unSplashData.results[0].urls.regular)
    .then(unsplashImage => {
      db.one(
        `INSERT INTO trip (url, auth_code_suggest, auth_code_collaborate, name, origin, destination, details, image, customer_id)
                VALUES($1,$2,$3,$4,$5, $6, $7, $8, $9) RETURNING id`,
        [
          randomURLString,
          suggest_code,
          collaborate_code,
          req.body.trip.tripName,
          req.body.trip.origin,
          req.body.trip.destination,
          req.body.trip.details,
          unsplashImage,
          req.body.user.id
        ]
      )
        .then(tripId => {
          return db
            .none(
              `INSERT INTO permission (trip_id, customer_id, permission)
                VALUES ($1, $2, 'owner')`,
              [tripId.id, req.body.user.id, req.body.permission]
            )
            .then(permission => {
              console.log(permission);
              const response = {
                id: tripId.id,
                fname: req.body.fname,
                destination: req.body.destination
              };
              console.log("trip creation response " + response.id);
              return res.json(response);
            });
        })
        .catch(error => {
          // console.log(error.stack)
          res.json({ error: error.message });
        });
    })
    .catch(error => console.error(error));
}); //allows logged in customer to add a trip (will error if not logged in as needs id)

app.post("/api/permission", isLoggedIn, (req, res) => {
  db.one(
    `INSERT INTO permission (trip_id, customer_id, permission)
            VALUES ($1, $2, 'owner') RETURNING trip_id`,
    [req.body_trip_id, req.body.cust_id, req.body.permission]
  )
    .then(id => {
      return res.json({ permission: id });
    })
    .catch(error => {
      console.error(error.stack);
      res.json({ error: error.message });
    });
}); // al

app.post("/api/suggestion", (req, res) => {
  db.one(
    `INSERT INTO suggestion (place_name, place_address, place_id, place_category, trip_id, customer_id, photo_reference)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [
      req.body.place.name,
      req.body.place.formatted_address,
      req.body.place.place_id,
      req.body.place.types[0],
      req.body.trip,
      req.body.user,
      req.body.place.photos[0].photo_reference
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
  console.log("calling", req);
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
    .hash(req.body.registrationPassword, saltRounds)
    .then(function(hash) {
      return db.one(
        `INSERT INTO customer (first_name, email, hash) VALUES ($1, $2, $3) RETURNING id`,
        [req.body.firstName, req.body.registrationEmail, hash]
      );
    })
    .then(result => {
      return res.json({ id: result.id });
    })
    .catch(error => res.json({ error: error.message }));
}); // allows a comment to be added to DB. Returns new comment ID if success

// route to accept logins
app.post(
  "/api/login",
  //(req, res) => console.log("post login", req.body),
  passport.authenticate("local", { session: true }),
  function(req, res) {
    console.log(req.user);
    console.log("api login");
    res.json(req.user).end();
  }
);

// const users = {
//   1: {
//     id: 1,
//     username: "dmitri",
//     password: "supersecret"
//   },
//   2: {
//     id: 2,
//     username: "oliver",
//     password: "evenmoresecret"
//   }
// };

function getUserByUsername(username) {
  return db
    .one(`SELECT * FROM customer WHERE email = ($1)`, [username])
    .catch(console.error);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// deserialise user from session
passport.deserializeUser(function(id, done) {
  console.log({ deserialiseUser: id });
  getUserById(id)
    .then(user => done(null, user))
    .catch(console.error);
});

function getUserById(id) {
  return db
    .one(`SELECT * FROM CUSTOMER WHERE id = ($1)`, [id])
    .catch(console.error);
}

// configure passport to use local strategy
// that is use locally stored credentials

passport.use(
  new LocalStrategy(function(username, password, done) {
    getUserByUsername(username)
      .then(user => {
        if (!user) return done(null, false);

        bcrypt
          .compare(password, user.hash)
          .then(matches => {
            matches ? done(null, user) : done(null, false);
          })
          .catch(console.error);
      })
      .catch(console.error);
  })
);

// middleware function to check user is logged in
function isLoggedIn(req, res, next) {
  if (req.user && req.user.id) {
    next();
  } else {
    res.send(401);
  }
}

app.get("/api/checklogin/", function(req, res) {
  console.log("check logged in");
  res.send(req.user);
});

app.get("/api/user/trip", isLoggedIn, function(req, res) {
  const userId = req.user.id;
  console.log("trip get");
  console.log(userId);
  // console.log(req.params)
  db.any(
    "SELECT trip.id, trip.url, trip.name, trip.origin, trip.destination, trip.details, trip.image, trip.customer_id, trip.time, permission.permission, permission.customer_id FROM trip, permission WHERE permission.customer_id = $1 AND trip.id = permission.trip_id ORDER BY trip.time DESC",
    [userId]
  )
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
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference FROM customer, suggestion, trip WHERE customer.id = suggestion.customer_id AND trip_id = ($1) GROUP BY suggestion.customer_id, suggestion.id, customer.id",
    [tripId]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.get("/api/trip/:id/comments", function(req, res) {
  const tripId = req.params.id;

  db.any(
    "SELECT comment.id, comment.suggestion_id, comment.customer_id,  comment.comment, customer.first_name FROM suggestion, comment, customer WHERE trip_id = ($1) AND suggestion.id = comment.suggestion_id AND customer.id = comment.customer_id",
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
    }%20in%20${req.body.location}&key=${api}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      return res.json(data.results);
    })
    .catch(console.error);
});

app.get("/api/google-photo/:reference", (req, res) => {
  console.log("here");
  const { reference } = req.params;
  const url = `https://maps.googleapis.com/maps/api/place/photo?key=${api}&photoreference=${reference}&maxwidth=600`;

  fetch(url)
    .then(response => response.body.pipe(res))
    .catch(error => {
      console.log("Error fetching photo from Google API", error.message);
      res.json(500, { error: error.message });
    });
});

app.post("/api/flights", (req, res) => {
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
    ]
  )
    .then(flight => {
      return res.json({ flightID: flight.id });
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error.message });
    });
}); // allows a flight to be added

// fetches all trips and their owner info for homepage
app.get("/api/custlocations", (req, res) => {
  db.any(
    "SELECT trip.destination, trip.image, customer.first_name FROM trip, customer WHERE trip.customer_id = customer.id"
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

//splash page fetch from array (to complete post fri demo)
app.get("/api/splash", function(req, res) {
  const tripId = req.params.id;

  const photoUrl = `https://api.unsplash.com/search/photos?page=1&query=${
    req.body.trip.destination
  }&client_id=${unsplashId}`;

  fetch(photoUrl)
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      return res.json(data.results);
    })
    .catch(console.error);
});

app.post("/api/invite", isLoggedIn, (req, res) => {
  console.log("invite");
  db.one(`SELECT * FROM trip WHERE auth_code_suggest = ($1)`, [
    req.body.inviteCode
  ])
    .then(trip => {
      console.log(trip.id);
      console.log(req.user);

      db.one(
        `INSERT INTO permission (trip_id, customer_id, permission)
            VALUES ($1, $2, $3) RETURNING id`,
        [trip.id, req.user.id, "suggester"]
      )
        .then(id => {
          return res.json({ tripId: trip.id });
        })
        .catch(error => {
          console.error(error.stack);
          res.json({ error: error.message });
        });
    })
    .catch(console.error);
}); // al

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log("Listening on port 8080");
});
