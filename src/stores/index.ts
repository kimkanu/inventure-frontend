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
import {
  LoadingAction,
  initialLoadingState,
  LoadingState,
  LOADING_ACTION_TYPES,
  loadingReducer,
} from './loading';

// interface for entire data -- store
interface StoreState {
  tab: TabState;
  workout: WorkoutState;
  static: StaticState;
  loading: LoadingState;
}

const initialState: StoreState = {
  tab: initialTabState,
  workout: initialWorkoutState,
  static: initialStaticState,
  loading: initialLoadingState,
};

type StoreAction = TabAction | WorkoutAction | StaticAction | LoadingAction;

const reducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (true) {
    case TAB_ACTION_TYPES.includes(action.type):
      return { ...state, tab: tabReducer(state.tab, action as TabAction) };
    case WORKOUT_ACTION_TYPES.includes(action.type):
      return { ...state, workout: workoutReducer(state.workout, action as WorkoutAction) };
    case STATIC_ACTION_TYPES.includes(action.type):
      return { ...state, static: staticReducer(state.static, action as StaticAction) };
    case LOADING_ACTION_TYPES.includes(action.type):
      return { ...state, loading: loadingReducer(state.loading, action as LoadingAction) };
    default:
      return state;
  }
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);
