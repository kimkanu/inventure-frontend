import { createGlobalState } from 'react-hooks-global-state';

export type Tabs = 'workout' | 'profile' | 'friends' | 'settings' | '';
export const TABS = ['workout', 'profile', 'friends', 'settings'];

interface Workout {
  type: string;
  plan: { name: string; reps: number; sets: number; time: string }[];
}

const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState({
  tabs: {
    current: '' as Tabs,
    previous: '' as Tabs,
  },
  workout: {
    type: '' as string,
    plan: [
      {
        name: 'incline dumbbell bench press',
        reps: 12,
        sets: 2,
        time: '1:00',
      },
      {
        name: 'diamond pushups',
        reps: 20,
        sets: 3,
        time: '0:45',
      },
      {
        name: 'dumbbell shrugs',
        reps: 12,
        sets: 1,
        time: '0:45',
      },
    ],
  } as Workout,
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
