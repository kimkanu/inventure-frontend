import { createGlobalState } from 'react-hooks-global-state';

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({
  tabs: {
    current: '',
    previous: null as string | null,
  },
  // FIXME: temporary state
  auth: {
    isLoggedIn: true,
  },
});

export const navigateTab = (c: string, p: string) => {
  setGlobalState('tabs', {
    current: c,
    previous: p,
  });
};

export { GlobalStateProvider, useGlobalState };
