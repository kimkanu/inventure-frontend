import React, { FunctionComponent, ChangeEvent, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faUserCircle, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@bit/mui-org.material-ui.icon';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { useGlobalState, navigateTab, Tabs, TABS } from '../stores';
import './BottomNavigator.css';
import { colorScheme } from '../colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { shadowText } from '../styles';
import { useTranslation } from 'react-i18next';

interface Props extends RouteComponentProps {}

const bottomNavigatorTheme = createMuiTheme({
  palette: {
    primary: {
      light: colorScheme.red!.lighter,
      main: colorScheme.red!.light,
      dark: colorScheme.red!.dark,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'CircularStd, Nanum Square !important',
  },
});

const bottomNavigationStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: `1px solid ${colorScheme.gray!.lightest}`,
    boxShadow: shadowText({ depth: 4, opacity: 1.2 }),
  },
});

const BottomNavigator: FunctionComponent<Props> = ({ location, history }) => {
  const { t } = useTranslation();

  const [tabs] = useGlobalState('tabs');
  const handleChange = (event: ChangeEvent<{}>, value: string) => {
    const to = `${value}/`.slice(0, `${value}/`.slice(1).indexOf('/') + 1) as Tabs;
    navigateTab(to, tabs.current);
    history.replace(`/${TABS.includes(to) ? to : ''}`);
  };

  const category = location.pathname.slice(
    1,
    1 + location.pathname.slice(1).indexOf('/') || undefined,
  ) as Tabs;

  useMemo(() => {
    navigateTab(category || 'workout', tabs.current);
  }, []);

  const bottomNavigationClasses = bottomNavigationStyles();

  return TABS.includes(category) ? (
    <MuiThemeProvider theme={bottomNavigatorTheme}>
      <BottomNavigation
        value={tabs.current}
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
  ) : null;
};

export default withRouter(BottomNavigator);
