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

// interface for selected workout
export interface Workout {
  type: string;
  plan: WorkoutPlan[];
  tempPlan: WorkoutPlan[];
  actionRecords: ActionRecord[];
}

export interface CreateRecord {
  type: 'create';
}
export interface DeleteRecord {
  type: 'delete';
  payload: number;
}

export type ActionRecord = CreateRecord | DeleteRecord;

export interface WorkoutState {
  workout: Workout;
}
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

export const initialWorkoutState: WorkoutState = {
  workout: {
    type: '' as string,
    plan: initialPlan,
    tempPlan: initialPlan,
    actionRecords: [],
  },
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

export type WorkoutAction =
  | DeleteWorkoutAction
  | UndoEditWorkoutPlanAction
  | SaveEditWorkoutPlanAction
  | DiscardEditWorkoutPlanAction;
export const WORKOUT_ACTION_TYPES = [
  'DELETE_WORKOUT',
  'UNDO_EDIT_WORKOUT_PLAN',
  'SAVE_EDIT_WORKOUT_PLAN',
  'DISCARD_EDIT_WORKOUT_PLAN',
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
      const c = {
        ...state,
        workout: {
          ...state.workout,
          tempPlan: toggledPlan(state.workout.tempPlan, action.payload),
          actionRecords: [
            ...state.workout.actionRecords,
            { type: 'delete', payload: action.payload } as DeleteRecord,
          ],
        },
      };
      return c;
    case 'UNDO_EDIT_WORKOUT_PLAN':
      if (state.workout.actionRecords.length === 0) return state;
      const lastAction = state.workout.actionRecords[state.workout.actionRecords.length - 1];
      switch (lastAction.type) {
        case 'create':
          return {
            ...state,
            workout: {
              ...state.workout,
              tempPlan: state.workout.tempPlan.slice(0, -1),
              actionRecords: state.workout.actionRecords.slice(0, -1),
            },
          };
        case 'delete':
          return {
            ...state,
            workout: {
              ...state.workout,
              tempPlan: toggledPlan(state.workout.tempPlan, lastAction.payload),
              actionRecords: state.workout.actionRecords.slice(0, -1),
            },
          };
        default:
          return state;
      }
    case 'SAVE_EDIT_WORKOUT_PLAN':
      return {
        ...state,
        workout: {
          ...state.workout,
          plan: state.workout.tempPlan,
          actionRecords: [],
        },
      };
    case 'DISCARD_EDIT_WORKOUT_PLAN':
      return {
        ...state,
        workout: {
          ...state.workout,
          tempPlan: state.workout.plan,
          actionRecords: [],
        },
      };
    default:
      return state;
  }
};

export const deleteWorkout = (i: number) => {
  dispatch({ type: 'DELETE_WORKOUT', payload: i });
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
/*
export const addWorkout = (i: number) => {
  dispatch({ type: 'DELETE_WORKOUT', payload: i });
};
*/
