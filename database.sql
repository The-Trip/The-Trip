INSERT INTO customer VALUES (1, 'Mark', 'mark@gmail.com', 'horse');
INSERT INTO customer VALUES (2, 'Debbie', 'debbie@gmail.com', 'pig');
INSERT INTO customer VALUES (3, 'Sarah', 'sarah@gmail.com', 'dog');
INSERT INTO customer VALUES (4, 'Jon', 'jon@gmail.com', 'cat');
INSERT INTO customer VALUES (5, 'William', 'william@gmail.com', 'ostrich');
ALTER SEQUENCE customer_id_seq RESTART WITH 6 INCREMENT BY 1;

INSERT INTO trip VALUES (1, 'electric-dog', 'Mark and Emma Go Away', 'London', 'New York',1);
INSERT INTO trip VALUES (2, 'messy-self', 'Jon''s Solo Adventure', 'Berlin', 'Rome',4);
ALTER SEQUENCE trip_id_seq RESTART WITH 3 INCREMENT BY 1;

INSERT INTO suggestion VALUES (1, 'Bobs Burgers', 'Best Burgers in Town', 1,2);
INSERT INTO suggestion VALUES (2, 'Big Lady Statue', 'Amazing Views', 1,3);
INSERT INTO suggestion VALUES (3, 'Scary Museum', 'SO SCARY', 1,3);
INSERT INTO suggestion VALUES (4, 'The Watering Hole', 'We got durnk! Hik!', 1,3);
INSERT INTO suggestion VALUES (5, 'Old Fighting Pit', 'Gladiators ROCK', 2,5);
ALTER SEQUENCE suggestion_id_seq RESTART WITH 6 INCREMENT BY 1;

-- ORIGIN TABLE (to amend use drop as below)

--CREATE DATABASE thetrip

DROP TABLE IF EXISTS suggestion;
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS customer;

-- IMMUTABLE BASE TABLE FOR customer(S) (ONE-)
CREATE TABLE customer (
id serial,
fname varchar(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(15) NOT NULL,
hash VARCHAR(72),
PRIMARY KEY (id)
);

-- DYNAMIC TABLE FOR TRIP(S) (MANY-)
CREATE TABLE trip (
id serial,
trip_url VARCHAR(100) NOT NULL UNIQUE,
trip_name VARCHAR(50) NOT NULL UNIQUE,
origin VARCHAR(50) NOT NULL,
destination VARCHAR(50) NOT NULL,
trip_owner_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (trip_owner_id) REFERENCES customer (id)
);

-- DYNAMIC MAPPING TABLE FOR SUGGESTION(S) (MANY-)
CREATE TABLE suggestion (
id serial,
place VARCHAR(50) NOT NULL,
place_commment TEXT NOT NULL,
trip_id INT NOT NULL,
suggester_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (trip_id) REFERENCES trip (id),
FOREIGN KEY (suggester_id) REFERENCES customer (id)
);
