import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import BottomNavigator from './BottomNavigator';
import PrivateRoute from './PrivateRoute';
import { navigateTab, useGlobalState } from '../stores';
import Link from './Link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Workout from './Workout';

interface Props extends RouteComponentProps {}

const Main: FunctionComponent<Props> = () => {
  return (
    <>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <div>
                <Switch location={location}>
                  <Route exact path="/" render={() => <Redirect to={{ pathname: '/workout' }} />} />
                  <Route path="/workout" component={Workout} />
                  <Route exact path="/profile" component={Workout} />
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
