import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import BottomNavigator from './BottomNavigator';
import PrivateRoute from './PrivateRoute';
import Workout from './Workout';
import Profile from './Profile';

import './Main.css';

interface Props extends RouteComponentProps {}

const Main: FunctionComponent<Props> = () => {
  return (
    <>
      <Route exact path="/" render={() => <Redirect to={{ pathname: '/workout' }} />} />
      <Route
        render={({ location }) => (
          <div>
            <Switch location={location}>
              <PrivateRoute path="/workout" component={Workout} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
            <BottomNavigator />
          </div>
        )}
      />
    </>
  );
};

export default withRouter(Main);
