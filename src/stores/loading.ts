import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';

export enum LoadingData {
  App,
  WorkoutInfo,
  Images,
}

export type LoadingState = { [key in LoadingData]: boolean };

export const initialLoadingState: LoadingState = {
  [LoadingData.App]: false,
  [LoadingData.WorkoutInfo]: false,
  [LoadingData.Images]: false,
};

export interface ToggleLoadingAction {
  type: 'TOGGLE_LOADING_ACTION';
  payload: LoadingData;
}

export type LoadingAction = ToggleLoadingAction;
export const LOADING_ACTION_TYPES = ['TOGGLE_LOADING_ACTION'];

export const loadingReducer: Reducer<LoadingState, LoadingAction> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING_ACTION':
      return { ...state, [action.payload]: true };
    default:
      return state;
  }
};

export const toggleLoading = (payload: LoadingData) => {
  dispatch({ payload, type: 'TOGGLE_LOADING_ACTION' });
};
