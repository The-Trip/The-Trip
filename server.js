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
  const randomNumSuggest = Math.floor(Math.random() * 100);
  const randomNumCollaborate = Math.floor(Math.random() * 100);

  const randomArrayValue = tripWordsArray[randomNum];
  const destinationSplit = req.body.trip.destination.split(" ");
  const destinationJoin = destinationSplit.join("-");
  const randomURLString = `${
    req.body.user.name
  }-${destinationJoin}-${randomArrayValue}`;

  const suggest_code = `${req.body.trip.destination
    .split(" ")[0]
    .toUpperCase()}_${req.body.user.id}${randomNumSuggest}`;

  const collaborate_code = `${req.body.trip.destination.split(" ")[0]}_${
    req.body.user.id
  }${randomNumCollaborate}`;

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
// app.post(
//   "/api/login",
//   passport.authenticate("local", { session: true }),
//   function(req, res) {
//     console.log(req.user);
//     console.log("api login");
//     res.json(req.user).end();
//   }
// );

app.post("/api/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    console.log(err);
    console.log(user);
    console.log(info);

    console.log(1);
    if (err) {
      console.log(2);
      return next(err);
    }
    if (!user) {
      console.log(3);
      return res.json(null);
    }
    req.logIn(user, function(err) {
      console.log(4);
      if (err) {
        return next(err);
      }
      return res.json(req.user);
    });
  })(req, res, next);
});

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
    .catch("getUserByUserName" + console.error);
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
        console.log(user);
        if (!user) return done(null, false);

        bcrypt
          .compare(password, user.hash)
          .then(matches => {
            matches ? done(null, user) : done(null, false);
          })
          .catch(error => console.log("bcrypt  :  " + error));
      })
      .catch(error => console.log(error.received));
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
    "SELECT trip.id, trip.auth_code_suggest, trip.name, trip.origin, trip.destination, trip.details, trip.image, trip.customer_id, trip.time, permission.permission, permission.customer_id FROM trip, permission WHERE permission.customer_id = $1 AND trip.id = permission.trip_id ORDER BY trip.time DESC",
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
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference, suggestion.favourite FROM customer, suggestion, trip WHERE customer.id = suggestion.customer_id AND trip_id = ($1) GROUP BY suggestion.customer_id, suggestion.id, customer.id",
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
        trip_id,
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
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
    [
      request.tripId,
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

app.get("/api/trip/:id/flights", function(req, res) {
  console.log(req.params);
  const tripId = req.params.id;
  console.log(tripId, "flights fetch on server");
  db.any("SELECT * FROM flight WHERE trip_id = ($1)", [tripId])
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.delete("/api/flights/:flightId", (req, res) => {
  console.log("trying to remove");
  let flight = req.params.flightId;
  db.none(
    `DELETE FROM flight
            WHERE id = ($1)`,
    [flight]
  )
    .then(() => {
      return res.json({ flightRemovedID: flight });
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error.message });
    });
}); // allows a flight to be deleted

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
          console.log(`527 ${trip.id}`);
          return res.json(trip.id);
        })
        .catch(error => {
          console.error(error.stack);
          res.json({ error: error.message });
        });
    })
    .catch(console.error);
}); // al

//Likes

app.post("/api/addlike", (req, res) => {
  console.log("adding");

  const { suggestionId, customerId, tripId } = req.body;

  db.none(
    `INSERT INTO likes (suggestion_id, customer_id)
        VALUES ($1, $2)`,
    [suggestionId, customerId]
  )
    .then(() => {
      db.any(
        `SELECT likes.id, likes.suggestion_id, likes.customer_id, customer.first_name FROM likes, suggestion, customer WHERE suggestion.trip_id = $1 AND likes.suggestion_id = suggestion.id AND customer.id = likes.customer_id`,
        [tripId]
      )
        .then(likes => {
          return res.json(likes);
        })
        .catch(error => {
          console.error(error.stack);
          res.json({ error: error.message });
        });
    })
    .catch(console.error);
});

app.post("/api/removelike", (req, res) => {
  console.log("removing");
  const { suggestionId, customerId, tripId } = req.body;

  db.none(`DELETE FROM likes WHERE suggestion_id = $1 AND customer_id = $2`, [
    suggestionId,
    customerId
  ])
    .then(() => {
      db.any(
        `SELECT likes.id, likes.suggestion_id, likes.customer_id FROM likes, suggestion WHERE suggestion.trip_id = $1 AND likes.suggestion_id = suggestion.id`,
        [tripId]
      )
        .then(likes => {
          return res.json(likes);
        })
        .catch(error => {
          console.error(error.stack);
          res.json({ error: error.message });
        });
    })
    .catch(console.error);
});

app.get("/api/:tripId/likefetch", function(req, res) {
  const { tripId } = req.params;
  console.log(tripId);
  db.any(
    "SELECT likes.id, likes.suggestion_id, likes.customer_id, customer.first_name FROM likes, suggestion, customer WHERE suggestion.trip_id = $1 AND likes.suggestion_id = suggestion.id AND customer.id = likes.customer_id",
    [tripId]
  )
    .then(function(likes) {
      res.json(likes);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

//ADD TO favourites
app.post("/api/add-favourite", (req, res) => {
  const { suggestionId, customerId } = req.body;

  db.none(
    `UPDATE suggestion
    SET favourite = true
    WHERE suggestion.id = $1 AND customer_id = $2`,
    [suggestionId, customerId]
  )
    .then(() => {
      return res.send(204);
    })
    .catch(error => {
      console.error(error.stack);
      res.json({ error: error.message });
    });
});

app.post("/api/remove-favourite", (req, res) => {
  const { suggestionId, customerId } = req.body;

  db.none(
    `UPDATE suggestion
    SET favourite = false
    WHERE suggestion.id = $1 AND customer_id = $2`,
    [suggestionId, customerId]
  )
    .then(() => {
      return res.json(204);
    })
    .catch(error => {
      console.error(error.stack);
      res.json({ error: error.message });
    });
});

// FILTER GETs WIP

app.get("/api/trip/:id/suggestion/achron", function(req, res) {
  const tripId = req.params.id;
  console.log("achron");
  db.any(
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference, suggestion.favourite FROM customer, suggestion, trip WHERE customer.id = suggestion.customer_id AND trip_id = ($1) GROUP BY suggestion.customer_id, suggestion.id, customer.id ORDER BY suggestion.time ASC",
    [tripId]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.get("/api/trip/:id/suggestion/dchron", function(req, res) {
  const tripId = req.params.id;
  console.log("dchron");
  db.any(
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference, suggestion.favourite FROM customer, suggestion, trip WHERE customer.id = suggestion.customer_id AND trip_id = ($1) GROUP BY suggestion.customer_id, suggestion.id, customer.id ORDER BY suggestion.time DESC",
    [tripId]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.get("/api/trip/:id/suggestion/alike", function(req, res) {
  const tripId = req.params.id;

  db.any(
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference, suggestion.favourite, COUNT(likes.suggestion_id) AS likes FROM customer, likes, suggestion, trip WHERE likes.suggestion_id = suggestion.id AND trip_id = $1 AND customer.id = suggestion.customer_id GROUP BY suggestion.customer_id, suggestion.id, customer.id ORDER BY COUNT(suggestion_id) ASC;",
    [tripId]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.get("/api/trip/:id/suggestion/dlike", function(req, res) {
  const tripId = req.params.id;
  console.log("dlike");
  db.any(
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference, suggestion.favourite, COUNT(likes.suggestion_id) AS likes FROM customer, likes, suggestion, trip WHERE likes.suggestion_id = suggestion.id AND trip_id = $1 AND customer.id = suggestion.customer_id GROUP BY suggestion.customer_id, suggestion.id, customer.id ORDER BY COUNT(suggestion_id) DESC;",
    [tripId]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

//get all suggestions for Trip Items
app.get("/api/trip/suggestion", function(req, res) {
  db.any(
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference, suggestion.favourite FROM customer, suggestion, trip WHERE customer.id = suggestion.customer_id GROUP BY suggestion.customer_id, suggestion.id, customer.id"
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.get("/api/trip/${tripId}/suggestion/favfilter", function(req, res) {
  const tripId = req.params.id;
  db.any(
    "SELECT suggestion.id, suggestion.place_name, suggestion.place_address, suggestion.place_id, suggestion.place_category, trip_id, suggestion.customer_id, customer.first_name, suggestion.photo_reference, suggestion.favourite FROM customer, suggestion, trip WHERE customer.id = suggestion.customer_id AND trip_id = $1 AND suggestion.favourite = true GROUP BY suggestion.customer_id, suggestion.id, customer.id",
    [tripId]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(error => {
      console.error(`${error}`);
    });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log("Listening on port 8080");
});
