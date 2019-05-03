import { createGlobalState } from 'react-hooks-global-state';

export type Tabs = 'workout' | 'profile' | 'friends' | 'settings' | '';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({
  tabs: {
    current: '' as Tabs,
    previous: '' as Tabs,
  },
  // FIXME: temporary state
  auth: {
    isLoggedIn: true,
  },
});

export const navigateTab = (c: Tabs, p: Tabs) => {
  setGlobalState('tabs', {
    current: c,
    previous: p,
  });
};

export { GlobalStateProvider, useGlobalState };
