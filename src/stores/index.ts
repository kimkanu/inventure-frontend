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
  DialogState,
  initialDialogState,
  DialogAction,
  DIALOG_ACTION_TYPES,
  dialogReducer,
} from './dialog';

// interface for entire data -- store
interface StoreState extends TabState, WorkoutState, DialogState {}

const initialState: StoreState = {
  ...initialTabState,
  ...initialWorkoutState,
  ...initialDialogState,
};

type StoreAction = TabAction | WorkoutAction | DialogAction;

const reducer: Reducer<StoreState, StoreAction> = (state, action) => {
  switch (true) {
    case TAB_ACTION_TYPES.includes(action.type):
      return { ...state, ...tabReducer(state as TabState, action as TabAction) };
    case WORKOUT_ACTION_TYPES.includes(action.type):
      return { ...state, ...workoutReducer(state as WorkoutState, action as WorkoutAction) };
    case DIALOG_ACTION_TYPES.includes(action.type):
      return { ...state, ...dialogReducer(state as DialogState, action as DialogAction) };
    default:
      return state;
  }
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(reducer, initialState);
