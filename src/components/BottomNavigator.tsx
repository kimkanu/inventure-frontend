import React, { FunctionComponent, ChangeEvent, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faUserCircle, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@bit/mui-org.material-ui.icon';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { useGlobalState } from '../stores';
import './BottomNavigator.css';
import { COLORS } from '../colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { shadowText } from '../styles';
import { useTranslation } from 'react-i18next';
import { navigateTab, TABS, Tab } from '../stores/tab';
import { untilNthIndex } from '../utils';

interface Props extends RouteComponentProps {}

const bottomNavigatorTheme = createMuiTheme({
  palette: {
    primary: {
      light: COLORS.blue!.lighter,
      main: COLORS.blue!.light,
      dark: COLORS.blue!.dark,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'CircularStd, NotoSans !important',
  },
});

const bottomNavigationStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: `1px solid ${COLORS.gray!.lightest}`,
    boxShadow: shadowText({ depth: 4, opacity: 1.2 }),
  },
});

const BottomNavigator: FunctionComponent<Props> = ({ location, history }) => {
  const { t } = useTranslation();

  const [tab] = useGlobalState('tab');
  const handleChange = (event: ChangeEvent<{}>, value: string) => {
    if (['/workout/start', '/workout/rest'].includes(location.pathname) && value === 'workout') {
      return;
    }
    const to = `${value}/`.slice(0, `${value}/`.slice(1).indexOf('/') + 1) as Tab;
    navigateTab(to);
    history.replace(`/${TABS.includes(to) ? to : ''}`);
  };

  const category = untilNthIndex(location.pathname, '/', 2).slice(1);

  useMemo(() => {
    if (TABS.includes(category) || !category) {
      navigateTab((category || 'workout') as Tab);
    } else {
      navigateTab('' as Tab);
    }
  }, []);

  const bottomNavigationClasses = bottomNavigationStyles();

  return (
    <MuiThemeProvider theme={bottomNavigatorTheme}>
      <BottomNavigation
        value={tab}
        onChange={handleChange}
        className={bottomNavigationClasses.root}
      >
        <BottomNavigationAction
          label={t('workout')}
          value="workout"
          icon={
            <Icon>
              <FontAwesomeIcon icon={faRunning} style={{ fontSize: '100%' }} />
            </Icon>
          }
        />
        <BottomNavigationAction
          label={t('profile')}
          value="profile"
          icon={
            <Icon>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: '92%', transform: 'translateY(-1px)' }}
              />
            </Icon>
          }
        />
        <BottomNavigationAction
          label={t('friends')}
          value="friends"
          icon={
            <Icon>
              <FontAwesomeIcon icon={faUserFriends} style={{ fontSize: '80%' }} />
            </Icon>
          }
        />
        <BottomNavigationAction
          label={t('settings')}
          value="settings"
          icon={
            <Icon>
              <FontAwesomeIcon icon={faCog} style={{ fontSize: '100%' }} />
            </Icon>
          }
        />
      </BottomNavigation>
    </MuiThemeProvider>
  );
};

export default withRouter(BottomNavigator);
