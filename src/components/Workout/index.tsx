import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';

interface Props extends RouteComponentProps {}

const Workout: FunctionComponent<Props> = ({}) => {
  return (
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
                <Route
                  exact
                  path="/workout"
                  component={() => (
                    <div>
                      workout <Link to="/workout/1">to 1</Link>
                    </div>
                  )}
                />
                <Route path="/workout/1" component={() => <div>workout/1</div>} />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default withRouter(Workout);
