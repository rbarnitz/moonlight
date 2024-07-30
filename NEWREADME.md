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
