import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import Header from '../Header';

interface Props extends RouteComponentProps {}

const Workout: FunctionComponent<Props> = ({}) => {
  return (
    <Route
      render={({ location }) => (
        <div className="page">
          <Header />
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <div className="content">
                <Switch location={location}>
                  <Route
                    exact
                    path="/workout"
                    component={() => (
                      <div>
                        workout <Link to="/workout/1">to 1</Link>
                      </div>
                    )}
                  />
                  <Route
                    path="/workout/1"
                    component={() => (
                      <div>
                        workout/1 <Link to="/workout">to root</Link>
                      </div>
                    )}
                  />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
    />
  );
};

export default withRouter(Workout);
