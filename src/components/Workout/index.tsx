import React, { FunctionComponent, useState, useMemo, useEffect, Component } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import EditWorkout from './EditWorkout';
import { untilNthIndex } from '../../utils';
import ViewWorkout from './ViewWorkout';
import Firebase, { FirebaseContext } from '../Firebase';
import StartWorkout from '../StartWorkout';
import RestTime from '../StartWorkout/RestTime';
import PainSelection from './PainSelection';
import CardWithPicture from '../CardWithPicture';
import { useGlobalState } from '../../stores';
import WorkoutType from './WorkoutType';
import WorkoutOption from './WorkoutOption';
import Congrats from './Congrats';
import { navigateTab } from '../../stores/tab';
import { AuthState, login } from '../../stores/auth';

interface Props extends RouteComponentProps {}

const Workout: FunctionComponent<Props> = ({ location, history }) => {
  const [auth] = useGlobalState('auth');
  useEffect(() => {
    if (auth.id === '') {
      history.push('/login?redirect=workout');
      navigateTab('');
    }
  });
  return (
    <Route
      render={() => (
        <div
          className="top-level"
          style={{ height: 'calc(100 * var(--vh))', position: 'absolute' }}
        >
          <div>
            <Route path="/workout" render={() => <WorkoutType />} />
            <Route
              render={() => (
                <div>
                  <TransitionGroup>
                    <CSSTransition
                      key={
                        [
                          '/workout/option',
                          '/workout/pain',
                          '/workout/view',
                          '/workout/edit',
                        ].includes(untilNthIndex(location.pathname, '/', 3))
                          ? 1
                          : 0
                      }
                      timeout={{ enter: 300, exit: 300 }}
                      classNames={'content--to-right-transition'}
                    >
                      <div>
                        <Route
                          path={[
                            '/workout/option',
                            '/workout/pain',
                            '/workout/view',
                            '/workout/edit',
                          ]}
                          location={location}
                          render={() => <WorkoutOption />}
                        />
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
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
                          path={['/workout/pain', '/workout/view', '/workout/edit']}
                          location={location}
                          render={() => <PainSelection />}
                        />
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                  <TransitionGroup>
                    <CSSTransition
                      key={
                        ['/workout/view', '/workout/edit'].includes(
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
                  <TransitionGroup>
                    <CSSTransition
                      key={untilNthIndex(location.pathname, '/', 3)}
                      timeout={{ enter: 300, exit: 500 }}
                      classNames={'content--pop-up-transition'}
                    >
                      <div>
                        <Route
                          location={location}
                          path="/workout/congrats"
                          render={() => <Congrats />}
                        />
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                  <Route path="/workout/start" render={() => <StartWorkout />} />
                  <Route path="/workout/rest" render={() => <RestTime />} />
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
