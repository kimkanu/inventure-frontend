import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from '../Link';
import Header from '../Header';

interface Props extends RouteComponentProps {}

const Profile: FunctionComponent<Props> = ({}) => {
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
                  path="/profile"
                  component={() => (
                    <div>
                      <Header />
                      profile <Link to="/profile/1">to 1</Link>
                    </div>
                  )}
                />
                <Route
                  path="/profile/1"
                  component={() => (
                    <div>
                      profile/1 <Link to="/profile">to root</Link>
                    </div>
                  )}
                />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default withRouter(Profile);
