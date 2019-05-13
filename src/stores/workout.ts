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
  | 'chest-n-back'
  | 'stomach-n-waist'
  | 'shoulder'
  | 'arm'
  | 'wrist'
  | 'thigh'
  | 'knee'
  | 'calf'
  | 'ankle';
export type PainInfo = { [part in BodyPart]: { name: string; ban: string[]; checked: boolean }[] };

// interface for selected workout
export interface Workout {
  type: string;
  plan: WorkoutPlan[];
  tempPlan: WorkoutPlan[];
  actionRecords: ActionRecord[];
  painInfo: PainInfo;
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
const initialPainInfo = {
  neck: [
    {
      name: '목아파',
      ban: [],
      checked: false,
    },
  ],
  'chest-n-back': [],
  'stomach-n-waist': [],
  shoulder: [],
  arm: [
    {
      name: '팔아파',
      ban: ['deadlift'],
      checked: false,
    },
  ],
  wrist: [],
  thigh: [],
  knee: [],
  calf: [],
  ankle: [],
};

export const initialWorkoutState: WorkoutState = {
  type: '' as string,
  plan: initialPlan,
  tempPlan: initialPlan,
  actionRecords: [],
  painInfo: initialPainInfo,
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
  payload: { bodyPart: BodyPart; name: string; checked?: boolean };
}
export interface UnbanWorkoutAction {
  type: 'UNBAN_WORKOUT';
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
  | ToggleMuteAction;
export const WORKOUT_ACTION_TYPES = [
  'DELETE_WORKOUT',
  'UNDO_EDIT_WORKOUT_PLAN',
  'SAVE_EDIT_WORKOUT_PLAN',
  'DISCARD_EDIT_WORKOUT_PLAN',
  'ADD_WORKOUT',
  'TOGGLE_PAIN',
  'UNBAN_WORKOUT',
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
      const newBodyState = (origState: { name: string; ban: string[]; checked: boolean }[]) => {
        const index = origState.map((pain) => pain.name).indexOf(action.payload.name);
        if (index < 0) {
          return state;
        }
        return [
          ...origState.slice(0, index),
          {
            name: action.payload.name,
            ban: origState[index].ban,
            checked:
              action.payload.checked !== undefined
                ? action.payload.checked
                : !origState[index].checked,
          },
          ...origState.slice(index + 1),
        ];
      };
      return {
        ...state,
        painInfo: {
          ...state.painInfo,
          [action.payload.bodyPart]: newBodyState(state.painInfo[action.payload.bodyPart]),
        },
      };
    case 'UNBAN_WORKOUT':
      return {
        ...state,
        unbannedWorkouts: state.unbannedWorkouts.includes(action.payload)
          ? state.unbannedWorkouts.filter((x) => x !== action.payload)
          : [...state.unbannedWorkouts, action.payload],
      };
    case 'TOGGLE_MUTE':
      return {
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
export const togglePain = (payload: { bodyPart: BodyPart; name: string; checked?: boolean }) => {
  dispatch({ payload, type: 'TOGGLE_PAIN' });
};
export const unbanWorkout = (payload: string) => {
  console.log(payload);
  dispatch({ payload, type: 'UNBAN_WORKOUT' });
};
export const toggleMute = () => {
  dispatch({ type: 'TOGGLE_MUTE' });
};
