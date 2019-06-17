import React, { FunctionComponent, useMemo, useEffect, useState } from 'react';
import BottomNavigator from './BottomNavigator';
import Workout from './Workout';

import Link from './Link';
import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import querystring from 'query-string';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { GlobalStateProvider, useGlobalState } from '../stores';

import './App.css';
import to, { untilNthIndex } from '../utils';
import Profile from './Profile';
import { sansSerifFont, useStyles } from '../styles';
import FirebaseDataPreloader from './FirebaseDataPreloader';
import { toggleLoading, LoadingData } from '../stores/loading';
import Friends from './Friends';
import WorkoutTimeManager from './WorkoutTimeManager';
import Banner from './Banner';
import VideoManager from './VideoManager';
import Settings from './Settings';
import { navigateTab, Tab } from '../stores/tab';
import { login, AuthState, calculateLevel } from '../stores/auth';
import Firebase, { FirebaseContext } from './Firebase';
import ButtonLarge from './Buttons/ButtonLarge';
import { COLORS } from '../colors';
import { History } from 'history';

interface LoginProps extends RouteComponentProps {
  firebase: Firebase;
}
const loginAs = (
  userId: string,
  firebase: Firebase,
  redirect: boolean = false,
  history?: History,
) => async () => {
  const response = await firebase.database.ref(`/users/${userId}`).once('value');
  const responseVal = response.val();
  const [, downloadURL] = await to(
    firebase.storage.ref(responseVal.profileImagePath).getDownloadURL(),
  );
  const userInfo = {
    friends: [],
    ...responseVal,
    id: userId,
    level: 0,
    profileImage: downloadURL,
  } as AuthState;
  localStorage.setItem('auth', userId);
  login(userInfo);
  if (redirect) {
    if (history) history.replace('/workout');
    navigateTab('workout');
  }
};
const Login: FunctionComponent<LoginProps> = ({ history, firebase }) => {
  const login = (userId: string) => loginAs(userId, firebase);
  const loginW = (userId: string) => loginAs(userId, firebase, true, history);
  const redirectTo = location.search.split('?redirect=')[1] || 'workout';
  useEffect(() => {
    if (localStorage.getItem('auth') !== null) {
      login(localStorage.getItem('auth')!)()
        .then(() => {
          history.replace(`/${redirectTo}`);
          navigateTab(redirectTo as Tab);
        })
        .catch(() => {
          localStorage.clear();
          login(localStorage.getItem('auth')!)().then(() => {
            history.replace(`/${redirectTo}`);
            navigateTab(redirectTo as Tab);
          });
        });
    }
  }, []);

  return localStorage.getItem('auth') ? null : (
    <div className="top-level" style={{ height: '100vh', position: 'absolute' }}>
      <div className="content">
        <h1 className="heading">Login</h1>
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 76px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonLarge
            backgroundColor="white"
            color={COLORS.gray!.darkest}
            shadowColor={COLORS.gray!.dark}
            onClick={loginW('juhokim')}
            labelInside="Login as Juho Kim"
          />
          <ButtonLarge
            backgroundColor="white"
            color={COLORS.gray!.darkest}
            shadowColor={COLORS.gray!.dark}
            onClick={loginW('chad0314')}
            labelInside="Login as Chad"
          />
          <ButtonLarge
            backgroundColor="white"
            color={COLORS.gray!.darkest}
            shadowColor={COLORS.gray!.dark}
            onClick={loginW('dmt322')}
            labelInside="Login as Zeppe"
          />
          <ButtonLarge
            backgroundColor="white"
            color={COLORS.gray!.darkest}
            shadowColor={COLORS.gray!.dark}
            onClick={loginW('ostrich101')}
            labelInside="Login as Emil"
          />
        </div>
      </div>
    </div>
  );
};

const NotFound: FunctionComponent = () => (
  <div className="top-level" style={{ height: '100vh', position: 'absolute' }}>
    <div className="content">
      <h1 className="heading">Not Found</h1>
      <Link to="/workout">Go to the main page</Link>
    </div>
  </div>
);

interface Props extends RouteComponentProps {}

const App: FunctionComponent<Props> = ({ location, history }) => {
  const { i18n } = useTranslation();
  /*
  const language = querystring.parse(location.search).lang as string | null | undefined;

  if (language) {
    i18n.changeLanguage(language);
  }
  */

  useEffect(() => {
    i18n.changeLanguage('en');

    toggleLoading(LoadingData.App);
    history.push(untilNthIndex(location.pathname, '/', 2));
    document.cookie = 'VISITOR_INFO1_LIVE=oKckVSqvaGw; path=/; domain=.youtube.com';
    const timeout = setTimeout(() => {
      document.getElementById('loader')!.className = 'hidden';
    }, 3030);
    const timeout2 = setTimeout(() => {
      document.getElementById('loader')!.style.display = 'none';
    }, 3330);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, []);

  const [auth] = useGlobalState('auth');
  return (
    <GlobalStateProvider>
      <Route
        exact
        path="/"
        render={() => {
          if (auth.id === '') {
            return <Redirect to="/login" />;
          }
          return <Redirect to={{ pathname: '/workout' }} />;
        }}
      />
      <TransitionGroup>
        <Banner />
        <CSSTransition
          key={untilNthIndex(location.pathname, '/', 2)}
          timeout={{ enter: 300, exit: 300 }}
          classNames={'content--top-level-transition'}
        >
          <div style={useStyles(sansSerifFont)}>
            <Switch location={location}>
              <Route
                exact
                path="/login"
                render={(props) => (
                  <FirebaseContext.Consumer>
                    {(firebase) => <Login {...props} firebase={firebase} />}
                  </FirebaseContext.Consumer>
                )}
              />
              <Route path="/workout" component={Workout} />
              <Route path="/profile" component={Profile} />
              <Route path="/friends" component={Friends} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" component={Login} />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <BottomNavigator />
      <FirebaseDataPreloader />
      <WorkoutTimeManager />
      <VideoManager />
    </GlobalStateProvider>
  );
};

export default withRouter(App);
