import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Link from './Link';
import { untilNthIndex } from '../utils';
import CardWithPicture from './CardWithPicture';
import ProfileCard from './ProfileCard';
import SectionSelector from './SectionSelector';
import { useGlobalState } from '../stores';
import { sansSerifFont } from '../styles';

interface Props extends RouteComponentProps {}

const Profile: FunctionComponent<Props> = ({ location }) => {
  const [staticInfo] = useGlobalState('static');
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
                        alt="Profile image"
                        name="Chad"
                        id="chad0314"
                        gym="Silloe Gym"
                        level={16}
                        points={300}
                        maxPoints={2050}
                        message="Aksdalsdk"
                      />
                      <SectionSelector onChange={() => {}} labels={['Overview', 'Trends']} />
                      <CardWithPicture imgSrc={(staticInfo.images.bulking || {}).image}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            ...sansSerifFont,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              margin: '1rem 0 .5rem',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                lineHeight: '1.5rem',
                              }}
                            >
                              Benchpress
                            </span>
                            <span style={{ fontSize: '0.9rem' }}>
                              <span
                                style={{
                                  fontSize: '1.1rem',
                                  fontWeight: 'bold',
                                  lineHeight: '1.5rem',
                                }}
                              >
                                #3
                              </span>{' '}
                              in friends
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <span style={{ fontSize: '1rem' }}>Recent achievement: </span>
                            <span style={{ fontSize: '1rem' }}>Recent achievement: </span>
                          </div>
                        </div>
                      </CardWithPicture>
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
