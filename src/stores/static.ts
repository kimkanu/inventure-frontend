import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';

export interface WorkoutInfo {
  imagePath: string;
  image?: string;
}
export interface Images {
  imagePath?: string;
  image?: string;
}

export interface StaticState {
  workoutInfo: { [name: string]: WorkoutInfo };
  images: { [name: string]: Images };
}

export const initialStaticState: StaticState = {
  workoutInfo: {},
  images: {},
};

export interface SetWorkoutInfoAction {
  type: 'SET_WORKOUT_INFO_ACTION';
  payload: { name: string; imagePath: string; image?: string }[];
}
export interface SetWorkoutImageAction {
  type: 'SET_WORKOUT_IMAGE_ACTION';
  payload: { name: string; image: string }[];
}
export interface SetStaticImagesAction {
  type: 'SET_STATIC_IMAGES_ACTION';
  payload: { name: string; imagePath?: string; image?: string }[];
}

export type StaticAction = SetWorkoutInfoAction | SetWorkoutImageAction | SetStaticImagesAction;
export const STATIC_ACTION_TYPES = [
  'SET_WORKOUT_INFO_ACTION',
  'SET_WORKOUT_IMAGE_ACTION',
  'SET_STATIC_IMAGES_ACTION',
];

export const staticReducer: Reducer<StaticState, StaticAction> = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUT_INFO_ACTION':
      return {
        ...state,
        workoutInfo: {
          ...state.workoutInfo,
          ...action.payload
            .map(({ name, imagePath, image }) => ({ [name]: { imagePath, image } }))
            .reduce((a, b) => ({ ...a, ...b })),
        },
      };
    case 'SET_WORKOUT_IMAGE_ACTION':
      return {
        ...state,
        workoutInfo: {
          ...state.workoutInfo,
          ...action.payload
            .map(({ name, image }) => ({
              [name]: { image, imagePath: state.workoutInfo[name].imagePath },
            }))
            .reduce((a, b) => ({ ...a, ...b })),
        },
      };
    case 'SET_STATIC_IMAGES_ACTION':
      return {
        ...state,
        images: {
          ...state.images,
          ...action.payload
            .map((imageObj) => ({
              [imageObj.name]: { ...state.images[name], ...imageObj },
            }))
            .reduce((a, b) => ({ ...a, ...b })),
        },
      };
    default:
      return state;
  }
};

export const setWorkoutInfo = (payload: { name: string; imagePath: string; image?: string }[]) => {
  dispatch({ payload, type: 'SET_WORKOUT_INFO_ACTION' });
};
export const setWorkoutImage = (payload: { name: string; image: string }[]) => {
  dispatch({ payload, type: 'SET_WORKOUT_IMAGE_ACTION' });
};
export const setStaticImages = (
  payload: { name: string; imagePath?: string; image?: string }[],
) => {
  dispatch({ payload, type: 'SET_STATIC_IMAGES_ACTION' });
};
