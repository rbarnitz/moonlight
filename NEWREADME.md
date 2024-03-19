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

### Installing

Install project dependencies:

npm install

//MUI dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-day-picker date-fns

// installing dependencies for moon icons
npm install react-icons
npm install react-icons/wi

//date manipulation
npm install luxon

//date install

End with an example of getting some data out of the system or using it for a little demo

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

## Acknowledgments

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

<div>
      {A && !B ? (
        <p>{`Only A exists: A = ${A}, C = ${C}`}</p>
      ) : B && !A ? (
        <p>No rise today</p>
      ) : A > B ? (
        <p>{`A is greater than B: A = ${A}, C = ${C}`}</p>
      ) : (
        <p>{`A is less than or equal to B: A = ${A}, B = ${B}`}</p>
      )}
    </div>
  );
}
