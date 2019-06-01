import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';

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

export type AuthAction = LoginAction | LogoutAction;
export const AUTH_ACTION_TYPES = ['LOGIN_ACTION', 'LOGOUT_ACTION'];

export const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return action.payload;
    case 'LOGOUT_ACTION':
      return initialAuthState;
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
