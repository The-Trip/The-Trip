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

const tripWordsArray = ['trip','holiday','vacation','break','rest','recess',
                        'tour', 'journey','voyage','vacay','hols'];

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/dist', express.static('dist'));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.post("/api/login", (req, res) => {
    db.one(
        `SELECT * FROM customer
            WHERE email=$1 and password=$2`, [req.body.email, req.body.password]
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
    
    console.log(`${randomURLString} ${req.body.trip.name} ${req.body.trip.origin} ${req.body.trip.destination} ${req.body.user.id}`);

    db.one(
        `INSERT INTO trip (url, name, origin, destination, customer_id)
            VALUES($1,$2,$3,$4,$5) RETURNING id`,
            [randomURLString, req.body.trip.name, req.body.trip.origin, req.body.trip.destination, req.body.user.id])
        .then(trip => {
            console.log('db insert done');
            const response = {id: trip.id, fname: req.body.fname, destination: req.body.destination};
            return res.json(response)
        })
        .catch(error => {
            console.log(error.stack);
            res.json({error: error.message})
        })
}); //allows logged in customer to add a trip (will error if not logged in as needs id)

app.post("/api/suggestion", (req, res) => {
    console.log(req.body);
    db.one(`INSERT INTO suggestion (place, comment, trip_id, customer_id)
                VALUES ($1, $2, $3, $4) RETURNING id`, [req.body.suggestion.place, req.body.suggestion.comment, req.body.trip, req.body.user])
        .then(suggestion => {
            return res.json({suggestionID: suggestion.id})
        })
        .catch(error => {
            console.log(error.stack);
            res.json({error: error.message})
        })
}); // allows a suggestion to be made (will error if not logged in as needs id)

app.post("/api/customer", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(function(hash) {
             return db.one(
                `INSERT INTO customer (first_name, email, password, hash) VALUES ($1, $2, $3, $4) RETURNING id`,
                [req.body.fname, req.body.email, req.body.password, hash])
        })
        .then(result => {
            return res.json({id: result.id});
        })
        .catch(error => res.json({ error: error.message }));
}); // allows a customer to be added to DB. Returns their new customer ID if success


app.get('/api/user/:id/trip', function (req, res) {
    const userId = req.params.id;
    console.log(req.params);
    db.any('SELECT * FROM trip WHERE customer_id = ($1)', [userId])
      .then(function(data){
        console.log(data);
        res.json(data)
      })
        .catch(error => {
            console.log(`${error}`)
        })
    });

app.get('/api/trip/:id/suggestion', function (req, res) {
    const tripId = req.params.id;
    db.any('SELECT * FROM suggestion WHERE trip_id = $1', [tripId])
      .then(function(data){
        console.log(data);
        res.json(data)
      })
        .catch(error => {
            console.log(`${error}`)
        })
    });

app.get('/api/google', function(req, res){
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=AIzaSyCimBnFkoA9Bb1y23hJqngTpjmjz_Z-gWs`)
        .then(function(response) {
            return response.json();
            })
        .then(data => {
            // console.log(data);
            // alert("I am fetching")
            res.json(data)
          })
        .catch(function(error) {
        // something went wrong. let's sort it out
          });
      });


app.listen(8080, function(){
    console.log('Listening on port 8080');
});
