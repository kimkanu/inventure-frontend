import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import BottomNavigator from './BottomNavigator';
import PrivateRoute from './PrivateRoute';
import { navigateTab, useGlobalState } from '../stores';
import Link from './Link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Workout from './Workout';
import Profile from './Profile';

interface Props extends RouteComponentProps {}

const Main: FunctionComponent<Props> = () => {
  return (
    <>
      <Route exact path="/" render={() => <Redirect to={{ pathname: '/workout' }} />} />
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <div>
                <Switch location={location}>
                  <Route path="/workout" component={Workout} />
                  <Route path="/profile" component={Profile} />
                </Switch>
              </div>
            </CSSTransition>
            <BottomNavigator />
          </TransitionGroup>
        )}
      />
    </>
  );
};

export default withRouter(Main);
