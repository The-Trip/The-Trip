INSERT INTO customer VALUES (1, 'Mark', 'mark@gmail.com', 'horse');
INSERT INTO customer VALUES (2, 'Debbie', 'debbie@gmail.com', 'pig');
INSERT INTO customer VALUES (3, 'Sarah', 'sarah@gmail.com', 'dog');
INSERT INTO customer VALUES (4, 'Jon', 'jon@gmail.com', 'cat');
INSERT INTO customer VALUES (5, 'William', 'william@gmail.com', 'ostrich');
ALTER SEQUENCE customer_id_seq RESTART WITH 6 INCREMENT BY 1;

INSERT INTO trip VALUES (1, 'electric-dog', 'Mark and Emma Go Away', 'London', 'New York',1);
INSERT INTO trip VALUES (2, 'messy-self', 'Jon''s Solo Adventure', 'Berlin', 'Rome',4);
ALTER SEQUENCE trip_id_seq RESTART WITH 3 INCREMENT BY 1;

INSERT INTO suggestion VALUES (1, 'Bobs Burgers', '1440 Avenue of the Americas, New York, NY', '2efeaf42323rfwefwe', 'bar', 1,2);
INSERT INTO suggestion VALUES (2, 'Big Lady Statue', '23 Tompkins Square Park, New York, NY', 'awdf42323rfwefwe', 'nightclub', 1,3);
INSERT INTO suggestion VALUES (3, 'Scary Museum', '13 Chestnut Lane, New York, NY', 'wefwefwefwefewf', 'cafe', 1,3);
INSERT INTO suggestion VALUES (4, 'The Watering Hole', '100 peartree lane, New York, NY', 'qwdqwdqwd575qwd', 'cafe', 1,3);
INSERT INTO suggestion VALUES (5, 'Old Fighting Pit', '23, Avenue road,New York, NY', '23er23r234234qwd', 'cafe', 2,5);
ALTER SEQUENCE suggestion_id_seq RESTART WITH 6 INCREMENT BY 1;

-- ORIGIN TABLE (to amend use drop as below)

--CREATE DATABASE thetrip

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
customer_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (customer_id) REFERENCES customer (id)
);

-- DYNAMIC MAPPING TABLE FOR SUGGESTION(S) (MANY-)
CREATE TABLE suggestion (
id serial,
place_name VARCHAR(50) NOT NULL,
place_address VARCHAR(50) NOT NULL,
place_id VARCHAR(50) NOT NULL,
place_category VARCHAR(50) NOT NULL,
trip_id INT NOT NULL,
customer_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (trip_id) REFERENCES trip (id),
FOREIGN KEY (customer_id) REFERENCES customer (id)
);
