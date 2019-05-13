import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from './Link';
import { untilNthIndex } from '../utils';
import CardWithPicture from './CardWithPicture';
import ProfileCard from './ProfileCard';

interface Props extends RouteComponentProps {}

const Profile: FunctionComponent<Props> = ({ location }) => {
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
              <Route
                path="/profile"
                render={() => (
                  <div className="fade">
                    <div className="content">
                      <h1 className="heading">Profile</h1>
                      <ProfileCard
                        imgSrc="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y"
                        name="Chad"
                        id="chad0314"
                        gym="Silloe Gym"
                        level={16}
                        points={300}
                        maxPoints={2050}
                        message="Aksdalsdk"
                      />
                      <h2
                        className="heading"
                        style={{
                          marginTop: '3rem',
                        }}
                      >
                        Not Implemented
                      </h2>
                      <p>We didn't have enough time to do it.</p>
                    </div>
                  </div>
                )}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default withRouter(Profile);
