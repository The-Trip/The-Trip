-- ORIGIN TABLE (to amend use drop as below)

--CREATE DATABASE thetrip_db

DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS suggestion;

-- IMMUTABLE BASE TABLE FOR USER(S) (ONE-)
CREATE TABLE user (
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
FOREIGN KEY (trip_owner_id) REFERENCES user (id)
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
FOREIGN KEY (suggester_id) REFERENCES user (id)
);