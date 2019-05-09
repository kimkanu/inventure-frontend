import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';

export interface DialogState {
  dialog: {
    show: boolean;
    title: string;
    children: React.ReactNode;
  };
}

export const initialDialogState: DialogState = {
  dialog: {
    show: false,
    title: '',
    children: null,
  },
};

export interface ShowDialogAction {
  type: 'SHOW_DIALOG';
  payload: {
    title: string;
    children: React.ReactNode;
  };
}

export type DialogAction = ShowDialogAction;
export const DIALOG_ACTION_TYPES = ['SHOW_DIALOG'];

export const dialogReducer: Reducer<DialogState, DialogAction> = (state, action) => {
  switch (action.type) {
    case 'SHOW_DIALOG':
      return {
        ...state,
        dialog: {
          show: true,
          title: action.payload.title,
          children: action.payload.children,
        },
      };
    default:
      return state;
  }
};

export const showDialog = (title: string, children: React.ReactNode) => {
  dispatch({ type: 'SHOW_DIALOG', payload: { title, children } });
};
