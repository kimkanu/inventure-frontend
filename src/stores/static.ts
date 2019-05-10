import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';

export interface StaticState {
  workoutInfo: {
    nameToImagePath: { name: string; imagePath: string }[];
    nameToImage: { name: string; image: string }[];
  };
}

export const initialStaticState: StaticState = {
  workoutInfo: {
    nameToImagePath: [],
    nameToImage: [],
  },
};

export interface SetNameToImagePathAction {
  type: 'SET_NAME_TO_IMAGE_PATH_ACTION';
  payload: { name: string; imagePath: string }[];
}
export interface SetNameToImageAction {
  type: 'SET_NAME_TO_IMAGE_ACTION';
  payload: { name: string; image: string }[];
}

export type StaticAction = SetNameToImagePathAction | SetNameToImageAction;
export const STATIC_ACTION_TYPES = ['SET_NAME_TO_IMAGE_PATH_ACTION', 'SET_NAME_TO_IMAGE_ACTION'];

export const staticReducer: Reducer<StaticState, StaticAction> = (state, action) => {
  switch (action.type) {
    case 'SET_NAME_TO_IMAGE_PATH_ACTION':
      return { ...state, workoutInfo: { ...state.workoutInfo, nameToImagePath: action.payload } };
    case 'SET_NAME_TO_IMAGE_ACTION':
      return { ...state, workoutInfo: { ...state.workoutInfo, nameToImage: action.payload } };
    default:
      return state;
  }
};

export const setNameToImagePath = (payload: { name: string; imagePath: string }[]) => {
  dispatch({ payload, type: 'SET_NAME_TO_IMAGE_PATH_ACTION' });
};
export const setNameToImage = (payload: { name: string; image: string }[]) => {
  dispatch({ payload, type: 'SET_NAME_TO_IMAGE_ACTION' });
};
