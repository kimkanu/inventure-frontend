import { createStore, Reducer } from 'react-hooks-global-state';

// a type and an array for tabs
export type Tabs = 'workout' | 'profile' | 'friends' | 'settings' | ''; // '' for initial state
export const TABS = ['workout', 'profile', 'friends', 'settings'];

// interface for a workout plan
interface Plan {
  name: string;
  reps: number;
  sets: number;
  time: string;
}

// interface for selected workout
interface Workout {
  type: string;
  plan: Plan[];
  muted: boolean;
}

// interface for entire data -- store
interface StoreState {
  tabs: {
    current: Tabs;
    previous: Tabs;
  };
  workout: Workout;
}

const initialState: StoreState = {
  tabs: {
    current: '' as Tabs,
    previous: '' as Tabs,
  },
  workout: {
    type: '' as string,
    plan: [
      // FIXME: temporary value
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
};

type NavigateTabAction = {
  type: 'NAVIGATE_TAB';
  payload: Tabs;
};
type DeleteWorkoutAction = {
  type: 'DELETE_WORKOUT';
  payload: number;
};
type ToggleMuteAction = {
  type: 'TOGGLE_MUTE';
};
type StoreAction = NavigateTabAction | DeleteWorkoutAction | ToggleMuteAction;

const reducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (action.type) {
    case 'NAVIGATE_TAB':
      if (state.tabs.current === action.payload) {
        return state;
      }
      return { ...state, tabs: { previous: state.tabs.current, current: action.payload } };
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workout: {
          ...state.workout,
          plan: state.workout.plan
            .slice(0, action.payload)
            .concat(state.workout.plan.slice(action.payload + 1)),
        },
      };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        workout: {
          ...state.workout,
          muted: !state.workout.muted,
        },
      };
    default:
      return state;
  }
};

const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);

export const navigateTab = (c: Tabs) => {
  dispatch({ type: 'NAVIGATE_TAB', payload: c });
};
export const deleteWorkout = (i: number) => {
  dispatch({ type: 'DELETE_WORKOUT', payload: i });
};
export const toggleMute = () => {
  dispatch({ type: 'TOGGLE_MUTE' });
};

export { GlobalStateProvider, dispatch, useGlobalState };
