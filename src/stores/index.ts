import { createStore, Reducer } from 'react-hooks-global-state';
import { TAB_ACTION_TYPES, tabReducer, TabState, TabAction, initialTabState } from './tab';
import {
  WorkoutState,
  workoutReducer,
  WorkoutAction,
  WORKOUT_ACTION_TYPES,
  initialWorkoutState,
} from './workout';

// interface for entire data -- store
interface StoreState extends TabState, WorkoutState {}

const initialState: StoreState = {
  ...initialTabState,
  ...initialWorkoutState,
};

type StoreAction = TabAction | WorkoutAction;

const reducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (true) {
    case TAB_ACTION_TYPES.includes(action.type):
      return { ...state, ...tabReducer(state as TabState, action as TabAction) };
    case WORKOUT_ACTION_TYPES.includes(action.type):
      return { ...state, ...workoutReducer(state as WorkoutState, action as WorkoutAction) };
    default:
      return state;
  }
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);
