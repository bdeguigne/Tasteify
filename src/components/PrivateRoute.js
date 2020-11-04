import React from 'react'
import { connect } from "react-redux";
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={routeProps =>
        rest.user ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
        )
      }
    />
  )
}

function mapStateToProps(state) {
    return {
      user: state.user.tokens
    }
  }

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default connectedPrivateRoute;