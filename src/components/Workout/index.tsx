import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import EditWorkout from './EditWorkout';
import { untilNthIndex } from '../../utils';

interface Props extends RouteComponentProps {}

const Workout: FunctionComponent<Props> = ({ location }) => {
  return (
    <Route
      render={() => (
        <TransitionGroup className="top-level" style={{ height: '100vh', position: 'absolute' }}>
          <CSSTransition
            key={untilNthIndex(location.pathname, '/', 3)}
            timeout={{ enter: 300, exit: 300 }}
            classNames={'content--fade-transition'}
          >
            <div>
              <Switch location={location}>
                <Route
                  exact
                  path="/workout"
                  render={() => (
                    <div className="fade">
                      <div className="content">
                        <h1 className="heading">Workout</h1>
                        <Link to="/workout/edit">Go to /workout/edit</Link>
                      </div>
                    </div>
                  )}
                />
                <Route path="/workout/edit" component={EditWorkout} />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default withRouter(Workout);
