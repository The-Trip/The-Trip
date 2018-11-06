INSERT INTO customer VALUES (1, 'Mark', 'mark@gmail.com');
INSERT INTO customer VALUES (2, 'Debbie', 'debbie@gmail.com');
INSERT INTO customer VALUES (3, 'Sarah', 'sarah@gmail.com');
INSERT INTO customer VALUES (4, 'Jon', 'jon@gmail.com');
INSERT INTO customer VALUES (5, 'William', 'william@gmail.com');
ALTER SEQUENCE song_id_seq RESTART WITH 6 INCREMENT BY 1;

INSERT INTO trip VALUES (1, 'Mark and Emma Go Away', 'London', 'New York');
INSERT INTO trip VALUES (2, 'Jon''s Solo Adventure', 'Berlin', 'Rome');
ALTER SEQUENCE trip_id_seq RESTART WITH 3 INCREMENT BY 1;

INSERT INTO suggestion VALUES (1, 'Bobs Burgers', 'Best Burgers in Town', 2,1);
INSERT INTO suggestion VALUES (2, 'Big Lady Statue', 'Amazing Views', 3,1);
INSERT INTO suggestion VALUES (3, 'Scary Museum', 'SO SCARY', 3,1);
INSERT INTO suggestion VALUES (4, 'The Watering Hole', 'We got durnk! Hik!', 2,1);
INSERT INTO suggestion VALUES (5, 'Old Fighting Pit', 'Gladiators ROCK', 5,2);
ALTER SEQUENCE song_id_seq RESTART WITH 6 INCREMENT BY 1;