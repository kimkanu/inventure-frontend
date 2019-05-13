import React, { FunctionComponent, useEffect } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import EditWorkout from './EditWorkout';
import { untilNthIndex } from '../../utils';
import ViewWorkout from './ViewWorkout';
import Firebase, { FirebaseContext } from '../Firebase';
import PainSelection from './PainSelection';

interface Props extends RouteComponentProps {}

const Workout: FunctionComponent<Props> = ({ location, history }) => {
  return (
    <Route
      render={() => (
        <div
          className="top-level"
          style={{ height: 'calc(100 * var(--vh))', position: 'absolute' }}
        >
          <div>
            <Route
              path="/workout"
              render={() => (
                /* TODO: temporary page */
                <div className="fade">
                  <div className="content">
                    <h1 className="heading">Start Workout</h1>
                    <Link to="/workout/pain">Go to /workout/pain</Link>
                  </div>
                </div>
              )}
            />
            <Route
              render={({ location }) => (
                <div>
                  <TransitionGroup>
                    <CSSTransition
                      key={
                        ['/workout/pain', '/workout/view', '/workout/edit'].includes(
                          untilNthIndex(location.pathname, '/', 3),
                        )
                          ? 1
                          : 0
                      }
                      timeout={{ enter: 300, exit: 300 }}
                      classNames={'content--to-right-transition'}
                    >
                      <div>
                        <Route
                          path={[
                            '/workout/body',
                            '/workout/pain',
                            '/workout/view',
                            '/workout/edit',
                          ]}
                          location={location}
                          render={() => <PainSelection />}
                        />
                        <Route
                          path={['/workout/pain', '/workout/view', '/workout/edit']}
                          location={location}
                          render={() => <PainSelection />}
                        />
                        <Route
                          path={['/workout/view', '/workout/edit']}
                          location={location}
                          render={() => <ViewWorkout />}
                        />
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                  <TransitionGroup>
                    <CSSTransition
                      key={untilNthIndex(location.pathname, '/', 3)}
                      timeout={{ enter: 300, exit: 300 }}
                      classNames={'content--fade-transition'}
                    >
                      <div>
                        <Route
                          path="/workout/edit"
                          location={location}
                          render={() => <EditWorkout />}
                        />
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              )}
            />
          </div>
        </div>
      )}
    />
  );
};

export default withRouter(Workout);
