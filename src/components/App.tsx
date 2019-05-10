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
import { sansSerifFont, useStyles } from '../styles';

const NotFound: FunctionComponent = () => (
  <div className="top-level" style={{ height: '100vh', position: 'absolute' }}>
    <div className="content">
      <h1 className="heading">NotFound</h1>
      <Link to="/workout">Go to the main page</Link>
    </div>
  </div>
);
interface Props extends RouteComponentProps {}

const App: FunctionComponent<Props> = ({ location }) => {
  const { i18n } = useTranslation();
  const language = querystring.parse(location.search).lang as string | null | undefined;

  if (language) {
    i18n.changeLanguage(language);
  }

  return (
    <GlobalStateProvider>
      <Route exact path="/" render={() => <Redirect to={{ pathname: '/workout' }} />} />
      <TransitionGroup>
        <CSSTransition
          key={untilNthIndex(location.pathname, '/', 2)}
          timeout={{ enter: 1000, exit: 1000 }}
          classNames={'content--top-level-transition'}
        >
          <div style={useStyles(sansSerifFont)}>
            <Switch location={location}>
              <Route path="/workout" component={Workout} />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <BottomNavigator />
    </GlobalStateProvider>
  );
};

export default withRouter(App);
