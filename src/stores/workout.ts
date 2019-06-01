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
  restTime: number;
  plan: WorkoutPlan[];
  completedPlan: WorkoutPlan[];
  tempPlan: WorkoutPlan[];
  actionRecords: ActionRecord[];
  pain: Pain;
  unbannedWorkouts: string[];
  muted: boolean;
  paused: boolean;
  current: [number, number];
  time: number;
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

const initialPlan: WorkoutPlan[] = [];
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
  restTime: 60,
  plan: initialPlan,
  completedPlan: [],
  tempPlan: initialPlan,
  actionRecords: [],
  pain: initialPain,
  unbannedWorkouts: [],
  muted: false,
  paused: false,
  current: [-1, -1],
  time: 0,
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
type SetTimeAction = {
  type: 'SET_TIME';
  payload: number;
};
type SkipWorkoutAction = {
  type: 'SKIP_WORKOUT';
};
type QuitWorkoutAction = {
  type: 'QUIT_WORKOUT';
};
type EmergencyQuitAction = {
  type: 'EMERGENCY_QUIT';
};
type TogglePauseAction = {
  type: 'TOGGLE_PAUSE';
};
type InitializeWorkoutAction = {
  type: 'INITIALIZE_WORKOUT';
};
type GoNextAction = {
  type: 'GO_NEXT';
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
  | ToggleMuteAction
  | SetTimeAction
  | SkipWorkoutAction
  | QuitWorkoutAction
  | EmergencyQuitAction
  | GoNextAction
  | InitializeWorkoutAction
  | TogglePauseAction;
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
  'SET_TIME',
  'SKIP_WORKOUT',
  'QUIT_WORKOUT',
  'EMERGENCY_QUIT',
  'GO_NEXT',
  'INITIALIZE_WORKOUT',
  'TOGGLE_PAUSE',
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
    case 'SET_TIME':
      return {
        ...state,
        time: action.payload,
      };
    case 'SKIP_WORKOUT':
      return {
        ...state,
        current: [state.current[0], state.current[1] + 1],
      };
    case 'QUIT_WORKOUT':
      return {
        ...state,
        current: [state.current[0] + 1, 0],
      };
    case 'INITIALIZE_WORKOUT':
      return {
        ...state,
        current: [-1, -1] as [number, number],
        time: 10,
      };
    case 'GO_NEXT':
      const plan = state.plan.filter((p) => !p.hidden);
      const [nextCurrent, nextTime] = (() => {
        if (state.current[0] === -2) {
          return [[-1, -1], 10];
        }
        if (state.current[0] === -1) {
          return [[0, 0], state.restTime];
        }
        if (state.current[1] === plan[state.current[0]].sets * 2 - 1) {
          if (state.current[0] === plan.length - 1) {
            return [[-2, -2], 10];
          }
          return [[state.current[0] + 1, 0], state.restTime];
        }
        return [
          [state.current[0], state.current[1] + 1],
          state.current[1] % 2 === 0 ? plan[state.current[0]].time : state.restTime,
        ];
      })() as [[number, number], number];
      return {
        ...state,
        current: nextCurrent,
        time: nextTime,
        paused: false,
      };
    case 'TOGGLE_PAUSE':
      return {
        ...state,
        paused: !state.paused,
      };
    case 'EMERGENCY_QUIT':
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
export const setTime = (payload: number) => {
  dispatch({ payload, type: 'SET_TIME' });
};
export const skipWorkout = () => {
  dispatch({ type: 'SKIP_WORKOUT' });
};
export const quitWorkout = () => {
  dispatch({ type: 'QUIT_WORKOUT' });
};
export const goNext = () => {
  dispatch({ type: 'GO_NEXT' });
};
export const togglePause = () => {
  dispatch({ type: 'TOGGLE_PAUSE' });
};
export const initializeWorkout = () => {
  dispatch({ type: 'INITIALIZE_WORKOUT' });
};
