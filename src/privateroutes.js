import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
     localStorage.getItem('jwtToken')!==null ? (
        <div>
          <Component {...props} />
        </div>
      ) : (  
        <Redirect to='/' />
      )
    }
  />
);

export default PrivateRoute;
