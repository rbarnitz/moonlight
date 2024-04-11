# Moonlight

Moonlight is a web application that displays location-specific astronomical data to identify days with high, early-evening moon illumination. Users can use this data to plan trips by selecting and saving specific locations and dates.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node
Postgres
Git

```
Give examples
```

## Installing

Clone the repository
Navigate to the project directory

Install project dependencies:

//MUI dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-day-picker date-fns

// Moon Icon dependencies:
npm install react-icons
npm install react-icons/wi

//Date Manipulation:
npm install luxon

## Sun Calcs

Sun calcs takes an input of location and date, and returns astronomical data

## Running Application

Run database from postgresql. Us the 'database.sql' file to initialize the database.

Name database 'moonlight_users'.

In one terminal, run:

```
npm run client
```

In another terminal, run:

```
npm run server
```

## Authors

- **Richard Barnitz** - _Initial work_ - [Github Profile](https://github.com/rbarnitz)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Notes

Moon logic:
if rise < set : then it's a same-day cycle, easy
no action
if rise > set : then rise today, sets tomorrow  
 retrieve tomorrow's moonset
if only moonrise : then transition.
retrieve tomorrow's moonset
if only moonset : noon-ish set, no rise.
"no moonrise today"

For camping purposes:
Want early-evening moonlight (Moon visibility period = 9-14hrs)

Edit Notes:

Changed app location
sent history push to editTrips

To Do:
parameters to edit specific trip [x]

Delete:
parameters to delete specific trip
Alert not working, fix.

To Do small Tasks:
footer to bottom of page
moondata - borders for moondata boxes

color fix
days to database changing based on Australia
css property of background-attachment: 'fixed'

For presentation:
Make About page prettier & add back button
change "register" button
Different tabs to show different app pages
Clear input history:  
 https://www.google.com/search?q=remove+input+history+in+chrome&oq=remove+input+history+in+chrome&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yDQgCEAAYhgMYgAQYigUyDQgDEAAYhgMYgAQYigXSAQg3ODY1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8

Which technologies did you use: slides? Pics of
React Redux Express Node JS

For practice:
Check for user ID and trip ID's displaying/consoling
Check all button links
