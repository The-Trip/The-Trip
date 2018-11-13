--CREATE DATABASE thetrip
-- ORIGIN TABLE (to amend use drop as below)
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS suggestion;
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS customer;

-- IMMUTABLE BASE TABLE FOR customer(S) (ONE-)
CREATE TABLE customer (
id serial,
first_name varchar(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(15) NOT NULL,
hash VARCHAR(72),
PRIMARY KEY (id)
);

-- DYNAMIC TABLE FOR TRIP(S) (MANY-)
CREATE TABLE trip (
id serial,
url VARCHAR(100) NOT NULL UNIQUE,
name VARCHAR(50) NOT NULL UNIQUE,
origin VARCHAR(50) NOT NULL,
destination VARCHAR(50) NOT NULL,
details VARCHAR(50) NOT NULL,
image VARCHAR(500) NOT NULL,
customer_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (customer_id) REFERENCES customer (id)
);

-- DYNAMIC MAPPING TABLE FOR SUGGESTION(S) (MANY-)
CREATE TABLE suggestion (
id serial,
place_name VARCHAR(100) NOT NULL,
place_address VARCHAR(500) NOT NULL,
place_id VARCHAR(50) NOT NULL,
place_category VARCHAR(50) NOT NULL,
trip_id INT NOT NULL,
customer_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (trip_id) REFERENCES trip (id),
FOREIGN KEY (customer_id) REFERENCES customer (id)
);

-- DYNAMIC TABLE FOR FLIGHTS
CREATE TABLE flight (
id serial,
trip_id INT
airport_from VARCHAR(50) NOT NULL,
airport_to VARCHAR(50) NOT NULL,
city_from VARCHAR(50) NOT NULL,
city_to VARCHAR(50) NOT NULL,
flight_combination_id TEXT NOT NULL,
outbound_flight_date DATE NOT NULL,
outbound_local_departure_time TIME NOT NULL,
outbound_local_arrival_time TIME NOT NULL,
price INT NOT NULL,
return_flight_date DATE NOT NULL,
return_local_arrival_time TIME NOT NULL,
return_local_departure_time TIME NOT NULL,
PRIMARY KEY (id)
FOREIGN KEY (trip_id) REFERENCES trip (id),
);

-- DYNAMIC TABLE FOR COMMENTS ON SUGGESTIONS
CREATE TABLE comment (
id serial,
suggestion_id INT NOT NULL,
customer_id INT NOT NULL,
comment VARCHAR(500) NOT NULL,
time timestamptz default current_timestamp NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (suggestion_id) REFERENCES suggestion (id),
FOREIGN KEY (customer_id) REFERENCES customer (id)
);

INSERT INTO customer VALUES (1, 'Mark', 'mark@gmail.com', 'horse');
INSERT INTO customer VALUES (2, 'Debbie', 'debbie@gmail.com', 'pig');
INSERT INTO customer VALUES (3, 'Sarah', 'sarah@gmail.com', 'dog');
INSERT INTO customer VALUES (4, 'Jon', 'jon@gmail.com', 'cat');
INSERT INTO customer VALUES (5, 'William', 'william@gmail.com', 'ostrich');
ALTER SEQUENCE customer_id_seq RESTART WITH 6 INCREMENT BY 1;

INSERT INTO trip VALUES (1, 'electric-dog', 'Mark and Emma Go Away', 'London', 'New York', 'Travel makes the world go around', 'https://images.unsplash.com/photo-1510379872535-9310dc6fd6a7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM2NzU0fQ&s=892bad4d3f7fec1823f0668a2598e041',1);
INSERT INTO trip VALUES (2, 'messy-self', 'Jon''s Solo Adventure', 'Berlin', 'Rome', 'Lets make amore!', 'https://images.unsplash.com/photo-1510379872535-9310dc6fd6a7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM2NzU0fQ&s=892bad4d3f7fec1823f0668a2598e041', 4);
ALTER SEQUENCE trip_id_seq RESTART WITH 3 INCREMENT BY 1;

INSERT INTO suggestion VALUES (1, 'Bobs Burgers', '1440 Avenue of the Americas, New York, NY', '2efeaf42323rfwefwe', 'bar', 1,2);
INSERT INTO suggestion VALUES (2, 'Big Lady Statue', '23 Tompkins Square Park, New York, NY', 'awdf42323rfwefwe', 'nightclub', 1,3);
INSERT INTO suggestion VALUES (3, 'Scary Museum', '13 Chestnut Lane, New York, NY', 'wefwefwefwefewf', 'cafe', 1,3);
INSERT INTO suggestion VALUES (4, 'The Watering Hole', '100 peartree lane, New York, NY', 'qwdqwdqwd575qwd', 'cafe', 1,3);
INSERT INTO suggestion VALUES (5, 'Old Fighting Pit', '23, Avenue road,New York, NY', '23er23r234234qwd', 'cafe', 2,5);
ALTER SEQUENCE suggestion_id_seq RESTART WITH 6 INCREMENT BY 1;

INSERT INTO comment VALUES (1, 1, 3,'Lovely place');
INSERT INTO comment VALUES (2, 1, 2,'This is where we first looked up at the stars and expressed or mutual love of Seinfeld');
INSERT INTO comment VALUES (3, 2, 2,'Rude waiters, but the exquisite food keeps me going back, again, and again and again');
ALTER SEQUENCE comment_id_seq RESTART WITH 4 INCREMENT BY 1;