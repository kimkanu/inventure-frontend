import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import EditWorkout from './EditWorkout';
import { untilNthIndex } from '../../utils';
import ViewWorkout from './ViewWorkout';
import Firebase, { FirebaseContext } from '../Firebase';

interface Props extends RouteComponentProps {}

const Workout: FunctionComponent<Props> = ({ location }) => {
  return (
    <Route
      render={() => (
        <TransitionGroup
          className="top-level"
          style={{ height: 'calc(100 * var(--vh))', position: 'absolute' }}
        >
          <CSSTransition
            key={untilNthIndex(location.pathname, '/', 3)}
            timeout={{ enter: 1000, exit: 1000 }}
            classNames={'content--fade-transition'}
          >
            <div>
              <Switch location={location}>
                <Route
                  exact
                  path="/workout"
                  render={() => (
                    /* TODO: temporary page */
                    <div className="fade">
                      <div className="content">
                        <h1 className="heading">Workout</h1>
                        <Link to="/workout/view">Go to /workout/view</Link>
                        <FirebaseContext.Consumer>
                          {(firebase) => <div>{}</div>}
                        </FirebaseContext.Consumer>
                      </div>
                    </div>
                  )}
                />
                <Route path="/workout/view" component={ViewWorkout} />
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
