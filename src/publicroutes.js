import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      !localStorage.getItem('jwtToken') ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to='/dashboard' />
      )
    }
  />
);

export default PublicRoute;
