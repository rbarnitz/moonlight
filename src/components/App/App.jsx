import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MyTrips from '../MyTrips/MyTrips';
import Location from '../Location/Location';
import MoonData from '../MoonData/MoonData';
import SetDates from '../SetDates/SetDates';
import EditTrip from '../EditTrip/EditTrip';
import ViewTrip from '../ViewTrip.jsx/ViewTrip';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const trips = useSelector((store) => store.trips);

  //set MUI themes
  const theme = createTheme({
    palette: {
      primary: {
        main: '#e4cfb6', // Your desired primary color
      },
    },
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div id="background-overlay">
          <Nav />
          <Switch>
            {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:5173/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
            </Route>

            <Route exact path="/mytrips/:userId">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <MyTrips />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
            </Route>

            <Route exact path="/location">
              <Location />
            </Route>

            <Route path="/edittrip/:id" exact>
              <EditTrip />
            </Route>

            <Route path="/viewtrip/:id" exact>
              <ViewTrip />
            </Route>

            <Route exact path="/moondata">
              <MoonData />
            </Route>

            <Route exact path="/setdates/:userId">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <SetDates />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
