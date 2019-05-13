import React, { FunctionComponent } from 'react';
import { LinkProps, Link as Lnk } from 'react-router-dom';
import { useGlobalState } from '../stores';
import { TABS, navigateTab, Tab } from '../stores/tab';

interface Props extends LinkProps {}

const Link: FunctionComponent<Props> = (props) => {
  const [tab] = useGlobalState('tab');
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

  if (!TABS.includes(name) || tab === name) {
    [willChangeTab, name] = [false, ''];
  }

  return <Lnk {...props} onClick={() => willChangeTab && navigateTab(name as Tab)} />;
};

export default Link;
