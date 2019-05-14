import { Reducer } from 'react-hooks-global-state';
import { dispatch } from '.';

// interface for a workout plan
export interface WorkoutPlan {
  name: string;
  reps: number;
  sets: number;
  time: number; // in seconds
  hidden: boolean;
}

export type BodyPart =
  | 'neck'
  | 'chest'
  | 'back'
  | 'stomach'
  | 'waist'
  | 'shoulder'
  | 'arm'
  | 'wrist'
  | 'thigh'
  | 'knee'
  | 'calf'
  | 'ankle';
export type Pain = { [part in BodyPart]: boolean };

// interface for selected workout
export interface Workout {
  type: string;
  plan: WorkoutPlan[];
  tempPlan: WorkoutPlan[];
  actionRecords: ActionRecord[];
  pain: Pain;
  unbannedWorkouts: string[];
  muted: boolean;
  current: number;
}
export interface CreateRecord {
  type: 'create';
}
export interface DeleteRecord {
  type: 'delete';
  payload: number;
}

export type WorkoutState = Workout;
export type ActionRecord = CreateRecord | DeleteRecord;

const initialPlan = [
  // FIXME: temporary value
  {
    name: 'incline dumbbell bench press',
    reps: 12,
    sets: 2,
    time: 60,
    hidden: false,
  },
  {
    name: 'diamond pushups',
    reps: 20,
    sets: 3,
    time: 45,
    hidden: false,
  },
  {
    name: 'dumbbell shrugs',
    reps: 12,
    sets: 1,
    time: 45,
    hidden: false,
  },
];
const initialPain = {
  neck: false,
  chest: false,
  back: false,
  stomach: false,
  waist: false,
  shoulder: false,
  arm: false,
  wrist: false,
  thigh: false,
  knee: false,
  calf: false,
  ankle: false,
};

export const initialWorkoutState: WorkoutState = {
  type: '' as string,
  plan: initialPlan,
  tempPlan: initialPlan,
  actionRecords: [],
  pain: initialPain,
  unbannedWorkouts: [],
  muted: false,
  current: -1,
};

export interface DeleteWorkoutAction {
  type: 'DELETE_WORKOUT';
  payload: number;
}
export interface UndoEditWorkoutPlanAction {
  type: 'UNDO_EDIT_WORKOUT_PLAN';
}
export interface SaveEditWorkoutPlanAction {
  type: 'SAVE_EDIT_WORKOUT_PLAN';
}
export interface DiscardEditWorkoutPlanAction {
  type: 'DISCARD_EDIT_WORKOUT_PLAN';
}
export interface AddWorkoutAction {
  type: 'ADD_WORKOUT';
  payload: WorkoutPlan;
}
export interface TogglePainAction {
  type: 'TOGGLE_PAIN';
  payload: { bodyPart: BodyPart; checked?: boolean };
}
export interface UnbanWorkoutAction {
  type: 'UNBAN_WORKOUT';
  payload: string;
}
export interface ChangeWorkoutTypeAction {
  type: 'CHANGE_WORKOUT_TYPE';
  payload: string;
}
type ToggleMuteAction = {
  type: 'TOGGLE_MUTE';
};

export type WorkoutAction =
  | DeleteWorkoutAction
  | UndoEditWorkoutPlanAction
  | SaveEditWorkoutPlanAction
  | DiscardEditWorkoutPlanAction
  | AddWorkoutAction
  | TogglePainAction
  | UnbanWorkoutAction
  | ChangeWorkoutTypeAction
  | ToggleMuteAction;
export const WORKOUT_ACTION_TYPES = [
  'DELETE_WORKOUT',
  'UNDO_EDIT_WORKOUT_PLAN',
  'SAVE_EDIT_WORKOUT_PLAN',
  'DISCARD_EDIT_WORKOUT_PLAN',
  'ADD_WORKOUT',
  'TOGGLE_PAIN',
  'UNBAN_WORKOUT',
  'CHANGE_WORKOUT_TYPE',
  'TOGGLE_MUTE',
];

const toggledPlan = (plan: WorkoutPlan[], i: number) => {
  return [
    ...plan.slice(0, i),
    {
      ...plan[i],
      hidden: !plan[i].hidden,
    },
    ...plan.slice(i + 1),
  ];
};

export const workoutReducer: Reducer<WorkoutState, WorkoutAction> = (state, action) => {
  switch (action.type) {
    case 'DELETE_WORKOUT':
      return {
        ...state,
        tempPlan: toggledPlan(state.tempPlan, action.payload),
        actionRecords: [
          ...state.actionRecords,
          { type: 'delete', payload: action.payload } as DeleteRecord,
        ],
      };
    case 'UNDO_EDIT_WORKOUT_PLAN':
      if (state.actionRecords.length === 0) return state;
      const lastAction = state.actionRecords[state.actionRecords.length - 1];
      switch (lastAction.type) {
        case 'create':
          return {
            ...state,
            tempPlan: state.tempPlan.slice(0, -1),
            actionRecords: state.actionRecords.slice(0, -1),
          };
        case 'delete':
          return {
            ...state,
            tempPlan: toggledPlan(state.tempPlan, lastAction.payload),
            actionRecords: state.actionRecords.slice(0, -1),
          };
        default:
          return state;
      }
    case 'SAVE_EDIT_WORKOUT_PLAN':
      return {
        ...state,
        plan: state.tempPlan,
        actionRecords: [],
      };
    case 'DISCARD_EDIT_WORKOUT_PLAN':
      return {
        ...state,
        tempPlan: state.plan,
        actionRecords: [],
      };
    case 'ADD_WORKOUT':
      return {
        ...state,
        tempPlan: [...state.tempPlan, action.payload],
        actionRecords: [...state.actionRecords, { type: 'create' } as CreateRecord],
      };
    case 'TOGGLE_PAIN':
      return {
        ...state,
        pain: {
          ...state.pain,
          [action.payload.bodyPart]: action.payload.checked || !state.pain[action.payload.bodyPart],
        },
      };
    case 'UNBAN_WORKOUT':
      return {
        ...state,
        unbannedWorkouts: state.unbannedWorkouts.includes(action.payload)
          ? state.unbannedWorkouts.filter((x) => x !== action.payload)
          : [...state.unbannedWorkouts, action.payload],
      };
    case 'CHANGE_WORKOUT_TYPE':
      return {
        ...state,
        type: action.payload,
      };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        muted: !state.muted,
      };
    default:
      return state;
  }
};

export const deleteWorkout = (payload: number) => {
  dispatch({ payload, type: 'DELETE_WORKOUT' });
};
export const undoEditWorkoutPlan = () => {
  dispatch({ type: 'UNDO_EDIT_WORKOUT_PLAN' });
};
export const saveEditWorkoutPlan = () => {
  dispatch({ type: 'SAVE_EDIT_WORKOUT_PLAN' });
};
export const discardEditWorkoutPlan = () => {
  dispatch({ type: 'DISCARD_EDIT_WORKOUT_PLAN' });
};
export const addWorkout = (payload: WorkoutPlan) => {
  dispatch({ payload, type: 'ADD_WORKOUT' });
};
export const togglePain = (payload: { bodyPart: BodyPart; checked?: boolean }) => {
  dispatch({ payload, type: 'TOGGLE_PAIN' });
};
export const unbanWorkout = (payload: string) => {
  dispatch({ payload, type: 'UNBAN_WORKOUT' });
};
export const changeWorkoutType = (payload: string) => {
  dispatch({ payload, type: 'CHANGE_WORKOUT_TYPE' });
};
export const toggleMute = () => {
  dispatch({ type: 'TOGGLE_MUTE' });
};
