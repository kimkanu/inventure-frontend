import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import Header from '../Header';
import { Second } from './Second';

interface Props extends RouteComponentProps {}

const Workout: FunctionComponent<Props> = ({}) => {
  return (
    <Route
      render={({ location }) => (
        <div className="page">
          <Header />
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'content--fade-transition'}
            >
              <div className="content">
                <Switch location={location}>
                  <Route
                    exact
                    path="/workout"
                    component={() => (
                      <div>
                        <h1 className="heading">Workout</h1>
                        <Link to="/workout/1">Go to /workout/1</Link>
                      </div>
                    )}
                  />
                  <Route
                    path="/workout/1"
                    component={() => (
                      <div>
                        <h1 className="heading">Workout/1</h1>
                        <Link to="/workout">Back to /workout</Link>
                      </div>
                    )}
                  />
                  <Route path="/workout/2" component={() => <Second text="hello" />} />
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
