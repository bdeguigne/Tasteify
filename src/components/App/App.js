import React, { useEffect } from 'react';
import { connect } from "react-redux";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { authenticateUser } from "../../redux/actions/userActions";
import HomePage from "../HomePage/HomePage";
import NotLogged from "../NotLogged/NotLogged";
import PrivateRoute from "../PrivateRoute";
import Callback from "../Callback";

function App(props) {
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (!props.user && accessToken && refreshToken) {
      props.authenticateUser(accessToken, refreshToken);
    }
  }, [props])

  return (
    <Switch>
      <Route exact path="/"
        render={() => {
          return (
            props.isLogged ?
              <Redirect to="/home" /> :
              <Redirect to="/login" />
          )
        }}>
      </Route>
      <PrivateRoute path="/home" component={HomePage} />
      <Route path="/login">
        <NotLogged />
      </Route>
      <Route path="/spotify/callback">
        <Callback />
      </Route>
    </Switch>
  );
}

const actionCreators = {
  authenticateUser
}

function mapStateToProps(state) {
  return {
    data: state.user.user,
    user: state.user.tokens,
    isLogged: state.ui.isLogged
  }
}

const connectedApp = connect(mapStateToProps, actionCreators)(App);

export default connectedApp;