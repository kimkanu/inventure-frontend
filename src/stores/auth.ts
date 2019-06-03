import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';
import { StaticState, staticReducer } from './static';

export type Track = {
  createdAt: number;
  reps: number;
  sets: number;
  workoutName: string;
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

export type AuthAction = LoginAction | LogoutAction | CalculateLevelAction;
export const AUTH_ACTION_TYPES = ['LOGIN_ACTION', 'LOGOUT_ACTION', 'CALCULATE_LEVEL_ACTION'];

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
    default:
      return state;
  }
};

export const login = (payload: AuthState) => {
  console.log(payload);
  dispatch({ payload, type: 'LOGIN_ACTION' });
};
export const logout = () => {
  dispatch({ type: 'LOGOUT_ACTION' });
};
export const calculateLevel = (payload: { staticInfo: StaticState; points: number }) => {
  console.log(payload);
  dispatch({ payload, type: 'CALCULATE_LEVEL_ACTION' });
};
