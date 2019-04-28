import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import BottomNavigator from './BottomNavigator';
import PrivateRoute from './PrivateRoute';
import Workout from './Workout';

import './Main.css';
import Link from './Link';

interface Props extends RouteComponentProps {}

const NotFound: FunctionComponent = () => (
  <div>
    <h1 className="heading">NotFound</h1>
    <Link to="/workout">Go to the main page</Link>
  </div>
);

const Main: FunctionComponent<Props> = () => {
  return (
    <>
      <Route exact path="/" render={() => <Redirect to={{ pathname: '/workout' }} />} />
      <Route
        render={({ location }) => (
          <div>
            <Switch location={location}>
              <PrivateRoute path="/workout" component={Workout} />
              <PrivateRoute path="/" component={NotFound} />
            </Switch>
            <BottomNavigator />
          </div>
        )}
      />
    </>
  );
};

export default withRouter(Main);
