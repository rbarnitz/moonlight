-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


INSERT INTO "user" ("username", "password")
VALUES ('user1', 'password'), 
('user2', 'password'),
('user3', 'password'),
('user4', 'password'),
('user5', 'password');



CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    trip_location VARCHAR(80) NOT NULL,
    trip_latitude FLOAT NOT NULL,
    trip_longitude FLOAT NOT NULL,
    trip_start VARCHAR(10) NOT NULL,
    trip_end VARCHAR(10) NOT NULL
);

INSERT INTO trips (trip_location, trip_latitude, trip_longitude, trip_start, trip_end)
    VALUES ('Albuquerque, New Mexico, USA', 49.12413, 106.34256, '2023-01-01', '2024-02-02'),
           ('Albuquerque, New Mexico, USA', 49.12413, 06.34256, '2023-01-01', '2024-02-02'),
           ('Albuquerque, New Mexico, USA', 49.12413, 106.34256, '2023-01-01', '2024-02-02'),
           ('Albuquerque, New Mexico, USA', 49.12413, 106.34256, '2023-01-01', '2024-02-02');