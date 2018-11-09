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
const api = process.env.GOOGLE_API
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
    // console.log(req.body);
    const randomNum = Math.floor(Math.random()*tripWordsArray.length);
    const randomArrayValue = tripWordsArray[randomNum];
    const destinationSplit = req.body.trip.destination.split(" ");
    const destinationJoin = destinationSplit.join("-");
    const randomURLString = `${req.body.user.name}-${destinationJoin}-${randomArrayValue}`;
    
    // console.log(`${randomURLString} ${req.body.trip.name} ${req.body.trip.origin} ${req.body.trip.destination} ${req.body.user.id}`)

    db.one(
        `INSERT INTO trip (trip_url, trip_name, origin, destination, trip_owner_id)
            VALUES($1,$2,$3,$4,$5) RETURNING id`,
            [randomURLString, req.body.trip.name, req.body.trip.origin, req.body.trip.destination, req.body.user.id])
        .then(trip => {
            console.log('db insert done')
            const response = {id: trip.id, fname: req.body.fname, destination: req.body.destination};
            return res.json(response)
        })
        .catch(error => {
            // console.log(error.stack)
            res.json({error: error.message})
        })
}); //allows logged in customer to add a trip (will error if not logged in as needs id)

app.post("/api/suggestion", (req, res) => {
    // console.log(req.body)
    db.one(`INSERT INTO suggestion (place, place_comment, trip_id, suggester_id)
                VALUES ($1, $2, $3, $4) RETURNING id`, [req.body.suggestion.place, req.body.suggestion.comment, req.body.trip, req.body.user])
        .then(suggestion => {
            return res.json({suggestionID: suggestion.id})
        })
        .catch(error => {
            console.log(error.stack)
            res.json({error: error.message})
        })
}); // allows a suggestion to be made (will error if not logged in as needs id)

app.post("/api/customer", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(function(hash) {
             return db.one(
                `INSERT INTO customer (fname, email, password, hash) VALUES ($1, $2, $3, $4) RETURNING id`,
                [req.body.fname, req.body.email, req.body.password, hash])
        })
        .then(result => {
            return res.json({id: result.id});
        })
        .catch(error => res.json({ error: error.message }));
}); // allows a customer to be added to DB. Returns their new customer ID if success



app.post('/api/google', function(req, res){
    // console.log(req.body.location);
    // console.log(req.body.place);
    
    // fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.body.place}&inputtype=textquery&fields=photos,formatted_address,name,rating,type,geometry&key=${api}`)
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.place}&key=${api}`)
    // fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.location}%20${req.body.place}&key=${api}`)
  
    .then(function(response) {
            return response.json();
            })
        .then(data => {
            // console.log(data);
            // console.log("I am fetching")


            return res.json(data.results)
            // return console.log(data)
          })
        .catch(function(error) {
        // something went wrong. let's sort it out
          });
      })

app.listen(8080, function(){
    console.log('Listening on port 8080');
});