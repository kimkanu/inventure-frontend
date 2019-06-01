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
import { initialAuthState, AuthAction, AUTH_ACTION_TYPES, authReducer, AuthState } from './auth';

// interface for entire data -- store
interface StoreState {
  tab: TabState;
  workout: WorkoutState;
  static: StaticState;
  loading: LoadingState;
  auth: AuthState;
}

const initialState: StoreState = {
  tab: initialTabState,
  workout: initialWorkoutState,
  static: initialStaticState,
  loading: initialLoadingState,
  auth: initialAuthState,
};

type StoreAction = TabAction | WorkoutAction | StaticAction | LoadingAction | AuthAction;

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
    case AUTH_ACTION_TYPES.includes(action.type):
      return { ...state, auth: authReducer(state.auth, action as AuthAction) };
    default:
      return state;
  }
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);
