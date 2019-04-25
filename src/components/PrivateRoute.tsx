import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { useGlobalState } from '../stores';

interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PrivateRoute: FunctionComponent<Props> = ({ component: C, ...rest }) => {
  const [{ isLoggedIn }] = useGlobalState('auth');

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <C {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
