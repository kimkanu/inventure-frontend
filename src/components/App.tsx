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
import { untilNthIndex } from '../utils';
import Profile from './Profile';
import { sansSerifFont, useStyles } from '../styles';
import FirebaseDataPreloader from './FirebaseDataPreloader';
import { toggleLoading, LoadingData } from '../stores/loading';
import SliderContainer from './test/SliderContainer';
import Friends from './Friends';
import WorkoutTimeManager from './WorkoutTimeManager';

const NotFound: FunctionComponent = () => (
  <div className="top-level" style={{ height: '100vh', position: 'absolute' }}>
    <div className="content">
      <h1 className="heading">Not Found</h1>
      <Link to="/workout">Go to the main page</Link>
    </div>
  </div>
);
const NotImplemented: FunctionComponent = () => (
  <div className="top-level" style={{ height: '100vh', position: 'absolute' }}>
    <div className="content">
      <h1 className="heading">Not Implemented</h1>
      <p>This is not in the main tasks, so we temporarily skipped to implement it.</p>
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
  toggleLoading(LoadingData.App);
  document.getElementById('loader')!.className = 'hidden';

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      history.push(untilNthIndex(location.pathname, '/', 2));
    }
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

  return (
    <GlobalStateProvider>
      <Route exact path="/" render={() => <Redirect to={{ pathname: '/workout' }} />} />
      <TransitionGroup>
        <CSSTransition
          key={untilNthIndex(location.pathname, '/', 2)}
          timeout={{ enter: 300, exit: 300 }}
          classNames={'content--top-level-transition'}
        >
          <div style={useStyles(sansSerifFont)}>
            <Switch location={location}>
              <Route path="/workout" component={Workout} />
              <Route path="/profile" component={Profile} />
              <Route path="/friends" component={Friends} />
              <Route path="/settings" component={NotImplemented} />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <BottomNavigator />
      <FirebaseDataPreloader />
      <WorkoutTimeManager />
    </GlobalStateProvider>
  );
};

export default withRouter(App);
