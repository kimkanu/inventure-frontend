import React, { FunctionComponent, useState, useMemo, useEffect, Component } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import Header from '../Header';
import Timer from '../StartWorkout/Timer';
import StartWorkout from '../StartWorkout';

const Workout: FunctionComponent = () => {
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
                  <Route exact path="/workout" component={() => <StartWorkout />} />
                  <Route
                    path="/workout/1"
                    component={() => (
                      <div>
                        <h1 className="heading">Workout/1</h1>
                        <Link to="/workout">Back to /workout</Link>
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
