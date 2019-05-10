import { createStore, Reducer } from 'react-hooks-global-state';
import { TAB_ACTION_TYPES, tabReducer, TabState, TabAction, initialTabState } from './tab';
import {
  WorkoutState,
  workoutReducer,
  WorkoutAction,
  WORKOUT_ACTION_TYPES,
  initialWorkoutState,
} from './workout';
import {
  StaticState,
  initialStaticState,
  StaticAction,
  STATIC_ACTION_TYPES,
  staticReducer,
} from './static';

// interface for entire data -- store
interface StoreState {
  tab: TabState;
  workout: WorkoutState;
  static: StaticState;
}

const initialState: StoreState = {
  tab: initialTabState,
  workout: initialWorkoutState,
  static: initialStaticState,
};

type StoreAction = TabAction | WorkoutAction | StaticAction;

const reducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (true) {
    case TAB_ACTION_TYPES.includes(action.type):
      return { ...state, tab: tabReducer(state.tab, action as TabAction) };
    case WORKOUT_ACTION_TYPES.includes(action.type):
      return { ...state, workout: workoutReducer(state.workout, action as WorkoutAction) };
    case STATIC_ACTION_TYPES.includes(action.type):
      return { ...state, static: staticReducer(state.static, action as StaticAction) };
    default:
      return state;
  }
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);
