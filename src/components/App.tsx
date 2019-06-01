import React, { FunctionComponent, useMemo, useEffect } from 'react';
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
import SliderContainer from './test/SliderContainer';
import Friends from './Friends';
import WorkoutTimeManager from './WorkoutTimeManager';
import Banner from './Banner';
import VideoManager from './VideoManager';
import Settings from './Settings';
import { navigateTab } from '../stores/tab';
import { ButtonBase } from '@material-ui/core';
import { login, AuthState } from '../stores/auth';
import Firebase, { FirebaseContext } from './Firebase';
import ButtonLarge from './Buttons/ButtonLarge';
import { COLORS } from '../colors';
import { History } from 'history';

interface LoginProps extends RouteComponentProps {
  firebase: Firebase;
}
const Login: FunctionComponent<LoginProps> = ({ history, firebase }) => {
  const loginAs = (userId: string) => async () => {
    const response = await firebase.database.ref(`/users/${userId}`).once('value');
    const responseVal = response.val();
    const [, downloadURL] = await to(
      firebase.storage.ref(responseVal.profileImagePath).getDownloadURL(),
    );
    const userInfo = {
      ...responseVal,
      id: userId,
      level: 0,
      profileImage: downloadURL,
    } as AuthState;
    if (!userInfo) return;
    login(userInfo);
    history.push('/workout');
    navigateTab('workout');
  };
  return (
    <div className="top-level" style={{ height: '100vh', position: 'absolute' }}>
      <div className="content">
        <h1 className="heading">Login</h1>
        <ButtonLarge
          backgroundColor={COLORS.blue!.light}
          shadowColor={COLORS.blue!.dark}
          onClick={loginAs('chad0314')}
          labelInside="Login as Chad"
        />
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
  const language = querystring.parse(location.search).lang as string | null | undefined;

  if (language) {
    i18n.changeLanguage(language);
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      history.push(untilNthIndex(location.pathname, '/', 2));
    }
    document.cookie = 'VISITOR_INFO1_LIVE=oKckVSqvaGw; path=/; domain=.youtube.com';
    const timeout = setTimeout(() => {
      toggleLoading(LoadingData.App);
      document.getElementById('loader')!.className = 'hidden';
    }, 1030);
    const timeout2 = setTimeout(() => {
      document.getElementById('loader')!.style.display = 'none';
    }, 1330);
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
        render={() =>
          auth === null ? <Redirect to="/login" /> : <Redirect to={{ pathname: '/workout' }} />
        }
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
