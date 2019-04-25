import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import querystring from 'query-string';

import { GlobalStateProvider } from '../stores';
import Header from './Header';
import BottomNavigator from './BottomNavigator';
import { LongContent } from './LongContent';
import { createGlobalState } from 'react-hooks-global-state';

interface Props extends RouteComponentProps {}

const Login: FunctionComponent<Props> = ({ location, history }) => {
  return (
    <>
      <Link to="#" onClick={() => history.replace('/')}>
        login
      </Link>
    </>
  );
};

export default withRouter(Login);
