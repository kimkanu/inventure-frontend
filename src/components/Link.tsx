import React, { FunctionComponent } from 'react';
import { LinkProps, Link as Lnk } from 'react-router-dom';
import { useGlobalState, navigateTab, Tabs } from '../stores';

interface Props extends LinkProps {}

const Link: FunctionComponent<Props> = (props) => {
  const [tabs] = useGlobalState('tabs');
  const to = typeof props.to === 'string' ? props.to : props.to.pathname || '.';
  let [willChangeTab, name] = (() => {
    switch (true) {
      case !to.startsWith('/'):
        return [false, ''];
      case to === '/':
        return [true, 'workout'];
      default:
        return [true, `${to}/`.slice(1, `${to}/`.slice(1).indexOf('/') + 1)];
    }
  })() as [boolean, string];

  if (!['workout', 'profile', 'friends', 'settings'].includes(name) || tabs.current === name) {
    [willChangeTab, name] = [false, ''];
  }

  return (
    <Lnk {...props} onClick={() => willChangeTab && navigateTab(name as Tabs, tabs.current)} />
  );
};

export default Link;
