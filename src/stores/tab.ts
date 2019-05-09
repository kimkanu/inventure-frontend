import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';

// a type and an array for tabs
export type Tab = 'workout' | 'profile' | 'friends' | 'settings' | ''; // '' for initial state
export const TABS = ['workout', 'profile', 'friends', 'settings'];

export interface TabState {
  tab: Tab;
}

export const initialTabState: TabState = {
  tab: '',
};

export interface NavigateTabAction {
  type: 'NAVIGATE_TAB';
  payload: Tab;
}

export type TabAction = NavigateTabAction;
export const TAB_ACTION_TYPES = ['NAVIGATE_TAB'];

export const tabReducer: Reducer<TabState, TabAction> = (state, action) => {
  switch (action.type) {
    case 'NAVIGATE_TAB':
      if (state.tab === action.payload) {
        return state;
      }
      return { ...state, tab: action.payload };
    default:
      return state;
  }
};

export const navigateTab = (c: Tab) => {
  dispatch({ type: 'NAVIGATE_TAB', payload: c });
};
