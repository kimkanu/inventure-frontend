import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';
import { BodyPart } from './workout';

export interface WorkoutInfo {
  imagePath: string;
  image?: string;
  youtube?: string;
  type: { name: string };
}
export interface Images {
  imagePath?: string;
  image?: string;
}

export interface StaticState {
  workoutInfo: { [name: string]: WorkoutInfo };
  images: { [name: string]: Images };
  others: {
    painInfo: { [bodyPart: string]: string[] };
    [key: string]: any;
  };
}

export const initialStaticState: StaticState = {
  workoutInfo: {},
  images: {},
  others: {
    painInfo: {},
  },
};

export interface SetWorkoutInfoAction {
  type: 'SET_WORKOUT_INFO_ACTION';
  payload: {
    name: string;
    imagePath: string;
    image?: string;
    youtube: string;
    type: { name: string };
  }[];
}
export interface SetWorkoutImageAction {
  type: 'SET_WORKOUT_IMAGE_ACTION';
  payload: { name: string; image?: string; youtube?: string }[];
}
export interface SetStaticImagesAction {
  type: 'SET_STATIC_IMAGES_ACTION';
  payload: { name: string; imagePath?: string; image?: string }[];
}
export interface SetOthersInfoAction {
  type: 'SET_OTHERS_INFO_ACTION';
  payload: any;
}

export type StaticAction =
  | SetWorkoutInfoAction
  | SetWorkoutImageAction
  | SetStaticImagesAction
  | SetOthersInfoAction;
export const STATIC_ACTION_TYPES = [
  'SET_WORKOUT_INFO_ACTION',
  'SET_WORKOUT_IMAGE_ACTION',
  'SET_STATIC_IMAGES_ACTION',
  'SET_OTHERS_INFO_ACTION',
];

export const staticReducer: Reducer<StaticState, StaticAction> = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUT_INFO_ACTION':
      return {
        ...state,
        workoutInfo: {
          ...state.workoutInfo,
          ...action.payload
            .map(({ name, imagePath, image, youtube, type }) => ({
              [name]: { imagePath, image, youtube, type },
            }))
            .reduce((a, b) => ({ ...a, ...b }), {}),
        },
      };
    case 'SET_WORKOUT_IMAGE_ACTION':
      return {
        ...state,
        workoutInfo: {
          ...state.workoutInfo,
          ...action.payload
            .map(({ name, image, youtube }) => ({
              [name]: {
                image,
                type: (state.workoutInfo[name] || { type: { name: '' } }).type,
                youtube: youtube || (state.workoutInfo[name] || { youtube: undefined }).youtube,
                imagePath: (state.workoutInfo[name] || { imagePath: undefined }).imagePath,
              },
            }))
            .reduce((a, b) => ({ ...a, ...b }), {}),
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
    case 'SET_OTHERS_INFO_ACTION':
      return {
        ...state,
        others: {
          ...state.others,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const setWorkoutInfo = (
  payload: {
    name: string;
    imagePath: string;
    image?: string;
    youtube: string;
    type: { name: string };
  }[],
) => {
  dispatch({ payload, type: 'SET_WORKOUT_INFO_ACTION' });
};
export const setWorkoutImage = (payload: { name: string; image?: string; youtube?: string }[]) => {
  dispatch({ payload, type: 'SET_WORKOUT_IMAGE_ACTION' });
};
export const setStaticImages = (
  payload: { name: string; imagePath?: string; image?: string }[],
) => {
  dispatch({ payload, type: 'SET_STATIC_IMAGES_ACTION' });
};
export const setOthersInfo = (payload: any) => {
  dispatch({ payload, type: 'SET_OTHERS_INFO_ACTION' });
};
