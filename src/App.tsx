import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import querystring from 'query-string';

import { GlobalStateProvider } from './stores';
import Header from './components/Header';
import BottomNavigator from './components/BottomNavigator';
import { LongContent } from './components/LongContent';
import { createGlobalState } from 'react-hooks-global-state';

interface Props extends RouteComponentProps {}

const App: FunctionComponent<Props> = ({ location }) => {
  const { t, i18n } = useTranslation();
  const language = querystring.parse(location.search).lang as string | null | undefined;

  if (language) i18n.changeLanguage(language);

  return (
    <GlobalStateProvider>
      <Header />
      <LongContent />
      <BottomNavigator />
    </GlobalStateProvider>
  );
};

export default withRouter(App);
