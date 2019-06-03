import React, { FunctionComponent, useEffect } from 'react';
import Link from './Link';
import Switch from 'react-switch';
import { ButtonBase } from '@material-ui/core';
import { shadow, sansSerifFont } from '../styles';
import { COLORS } from '../colors';
import { useGlobalState } from '../stores';
import { RouteComponentProps, withRouter } from 'react-router';
import { navigateTab } from '../stores/tab';
import { login, AuthState, logout } from '../stores/auth';
interface CardProps {
  title: string;
}
const Card: FunctionComponent<CardProps> = ({ title, children }) => {
  return (
    <div
      style={{
        ...shadow({ depth: 2 }),
        backgroundColor: 'white',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '.67rem',
      }}
    >
      <div
        style={{
          padding: '0.2rem 0.8rem',
          fontSize: '0.8rem',
          color: COLORS.gray!.dark,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
};

interface MenuProps {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
const Menu: FunctionComponent<MenuProps> = ({ children, onClick }) => {
  return (
    <ButtonBase
      style={{
        width: '100%',
        textAlign: 'left',
        ...sansSerifFont,
      }}
      onClick={onClick}
    >
      <div
        style={{
          padding: '1rem 0.8rem',
          fontSize: '0.97rem',
          width: '100%',
        }}
      >
        {children}
      </div>
    </ButtonBase>
  );
};

const Settings: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [auth] = useGlobalState('auth');
  useEffect(() => {
    if (auth.id === '') {
      const a = localStorage.getItem('auth');
      if (a !== null) {
        login(JSON.parse(a) as AuthState);
      } else {
        history.replace('/login');
        navigateTab('');
      }
    }
  }, []);
  return (
    <div className="top-level" style={{ height: '100vh', position: 'absolute' }}>
      <div className="content">
        <h1
          className="heading"
          style={{
            marginBottom: '1rem',
          }}
        >
          Settings
        </h1>
        <Card title="Account">
          <Menu onClick={() => {}}>{auth ? `Signed in as ${auth.name}` : 'Log in'}</Menu>
          <Menu
            onClick={() => {
              logout();
              localStorage.removeItem('auth');
              navigateTab('');
              history.push('/login');
            }}
          >
            Log out
          </Menu>
        </Card>
        <Card title="Cache">
          <Menu
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Remove cache and reload
          </Menu>
        </Card>
        <Card title="Version">
          <Menu onClick={() => {}}>inVenture App v{process.env.REACT_APP_VERSION}</Menu>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(Settings);
