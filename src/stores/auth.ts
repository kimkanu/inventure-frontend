import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';
import { StaticState, staticReducer } from './static';

export interface UserProps {
  name: string;
  profileImagePath?: string;
  profileMessage: string;
  gym: string;
  points: number;
  level: number;
}

export type Track = {
  createdAt: number;
  reps: number;
  sets: number;
  name: string;
  points?: number;
} & {
  [params: string]: number;
};
export type AuthState = {
  id: string;
  name: string;
  points: number;
  level: number;
  profileImagePath: string;
  profileImage?: string;
  profileMessage: string;
  gym: string;
  friends: string[];
  track: Track[];
  users: ({ id: string } & UserProps)[];
};

export const initialAuthState: AuthState = {
  id: '',
  name: '',
  points: 0,
  level: 0,
  profileImagePath: '',
  profileImage: '',
  profileMessage: '',
  gym: '',
  friends: [],
  track: [],
  users: [],
};

export interface LoginAction {
  type: 'LOGIN_ACTION';
  payload: AuthState;
}
export interface LogoutAction {
  type: 'LOGOUT_ACTION';
}
export interface CalculateLevelAction {
  type: 'CALCULATE_LEVEL_ACTION';
  payload: { staticInfo: StaticState; points: number };
}
export interface SaveUsersAction {
  type: 'SAVE_USERS_ACTION';
  payload: ({ id: string } & UserProps)[];
}
export interface AddFriendAction {
  type: 'ADD_FRIEND_ACTION';
  payload: string;
}
export interface GetPointsAction {
  type: 'GET_POINTS_ACTION';
  payload: number;
}
type SetTrackAction = {
  type: 'SET_TRACK_ACTION';
  payload: Track[];
};

export type AuthAction =
  | LoginAction
  | LogoutAction
  | CalculateLevelAction
  | SaveUsersAction
  | AddFriendAction
  | GetPointsAction
  | SetTrackAction;
export const AUTH_ACTION_TYPES = [
  'LOGIN_ACTION',
  'LOGOUT_ACTION',
  'CALCULATE_LEVEL_ACTION',
  'SAVE_USERS_ACTION',
  'ADD_FRIEND_ACTION',
  'GET_POINTS_ACTION',
  'SET_TRACK_ACTION',
];

export const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return action.payload;
    case 'LOGOUT_ACTION':
      return initialAuthState;
    case 'CALCULATE_LEVEL_ACTION':
      if (
        Array.isArray(action.payload.staticInfo.others.levels) &&
        action.payload.staticInfo.others.levels.length !== 0
      ) {
        const level = (action.payload.staticInfo.others.levels as number[])
          .reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], [] as number[])
          .findIndex((x: number) => x > action.payload.points);
        console.log(level);
        return {
          ...state,
          level,
          points: action.payload.points,
        };
      }
      return {
        ...state,
        points: action.payload.points,
      };
    case 'SAVE_USERS_ACTION':
      return {
        ...state,
        users: action.payload,
      };
    case 'ADD_FRIEND_ACTION':
      if (state.friends.includes(action.payload)) return state;
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
    case 'GET_POINTS_ACTION':
      return {
        ...state,
        points: state.points + action.payload,
      };
    case 'SET_TRACK_ACTION':
      return {
        ...state,
        track: action.payload,
      };
    default:
      return state;
  }
};

export const login = (payload: AuthState) => {
  dispatch({ payload, type: 'LOGIN_ACTION' });
};
export const logout = () => {
  dispatch({ type: 'LOGOUT_ACTION' });
};
export const calculateLevel = (payload: { staticInfo: StaticState; points: number }) => {
  dispatch({ payload, type: 'CALCULATE_LEVEL_ACTION' });
};
export const saveUsers = (payload: ({ id: string } & UserProps)[]) => {
  dispatch({ payload, type: 'SAVE_USERS_ACTION' });
};
export const addFriend = (payload: string) => {
  dispatch({ payload, type: 'ADD_FRIEND_ACTION' });
};
export const getPoints = (payload: number) => {
  dispatch({ payload, type: 'GET_POINTS_ACTION' });
};
export const setTrack = (payload: Track[]) => {
  dispatch({ payload, type: 'SET_TRACK_ACTION' });
};
