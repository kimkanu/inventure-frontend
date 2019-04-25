import React, { FunctionComponent, useMemo, useEffect } from 'react';
import {
  withRouter,
  RouteComponentProps,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import querystring from 'query-string';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { GlobalStateProvider, useGlobalState } from '../stores';
import Login from './Login';
import Main from './Main';
import PrivateRoute from './PrivateRoute';

interface Props extends RouteComponentProps {}

const App: FunctionComponent<Props> = ({ history }) => {
  const { t, i18n } = useTranslation();
  const language = querystring.parse(location.search).lang as string | null | undefined;

  if (language) i18n.changeLanguage(language);

  return (
    <GlobalStateProvider>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" component={Main} />
    </GlobalStateProvider>
  );
};

export default withRouter(App);
