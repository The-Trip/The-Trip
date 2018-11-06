
INSERT INTO customer VALUES (1, 'Mark', 'mark@gmail.com');
INSERT INTO customer VALUES (2, 'Debbie', 'debbie@gmail.com');
INSERT INTO customer VALUES (3, 'Sarah', 'sarah@gmail.com');
INSERT INTO customer VALUES (4, 'Jon', 'jon@gmail.com');
INSERT INTO customer VALUES (5, 'William', 'william@gmail.com');
ALTER SEQUENCE customer_id_seq RESTART WITH 6 INCREMENT BY 1;

INSERT INTO trip VALUES (1, 'Mark and Emma Go Away', 'London', 'New York');
INSERT INTO trip VALUES (2, 'Jon''s Solo Adventure', 'Berlin', 'Rome');
ALTER SEQUENCE trip_id_seq RESTART WITH 3 INCREMENT BY 1;

INSERT INTO suggestion VALUES (1, 'Bobs Burgers', 'Best Burgers in Town', 2,1);
INSERT INTO suggestion VALUES (2, 'Big Lady Statue', 'Amazing Views', 3,1);
INSERT INTO suggestion VALUES (3, 'Scary Museum', 'SO SCARY', 3,1);
INSERT INTO suggestion VALUES (4, 'The Watering Hole', 'We got durnk! Hik!', 2,1);
INSERT INTO suggestion VALUES (5, 'Old Fighting Pit', 'Gladiators ROCK', 5,2);
ALTER SEQUENCE suggestion_id_seq RESTART WITH 6 INCREMENT BY 1;

-- ORIGIN TABLE (to amend use drop as below)

--CREATE DATABASE thetrip

DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS suggestion;

-- IMMUTABLE BASE TABLE FOR customer(S) (ONE-)
CREATE TABLE customer (
id serial,
fname TEXT varchar(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
PRIMARY KEY (id)
);

-- DYNAMIC TABLE FOR TRIP(S) (MANY-)
CREATE TABLE trip (
id serial,
trip_name varchar(50) NOT NULL UNIQUE,
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
