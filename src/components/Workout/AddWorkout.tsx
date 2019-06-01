import React, {
  FunctionComponent,
  useState,
  Component,
  PureComponent,
  useEffect,
  useMemo,
} from 'react';
import BackButton from '../Buttons/BackButton';
import { COLOR_BACKGROUND } from '../../colors';
import { useGlobalState } from '../../stores';
import { Route, RouteComponentProps, withRouter, Prompt } from 'react-router-dom';
import { untilNthIndex, randomString, capitalizeFirst } from '../../utils';
import { ButtonBase } from '@material-ui/core';
import Dialog from '../Dialog';
import DialogTextButton from '../Dialog/DialogTextButton';
import { useStyles, sansSerifFont, shadow } from '../../styles';
import { WorkoutInfo } from '../../stores/static';
import Fuse from 'fuse.js';
import Slider from '../Slider';
import { addWorkout, WorkoutPlan } from '../../stores/workout';

const searchId = randomString(8);

interface AlbumProps {
  workouts: ({ name: string } & WorkoutInfo)[];
  setDialog: any;
  setSelected: any;
}

const WorkoutAlbum: FunctionComponent<AlbumProps> = ({ workouts, setDialog, setSelected }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '16px',
      }}
    >
      {workouts.map((x, i) => (
        <ButtonBase
          style={{
            borderRadius: '8px',
            margin: '8px',
            WebkitAppearance: 'none',
            ...shadow({ depth: 6, opacity: 2 }),
          }}
          onClick={() => {
            setSelected((ss: WorkoutPlan) => ({
              ...ss,
              name: x.name,
            }));
            setDialog({ show: true, title: capitalizeFirst(x.name) });
          }}
          key={i}
        >
          <div
            style={useStyles({
              width: '162px',
              maxWidth: 'calc(50vw - 30px)',
              height: '162px',
              maxHeight: 'calc(50vw - 30px)',
              background: '#3b3e43',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            })}
          >
            <div
              style={{
                position: 'relative',
                maxWidth: 'calc(100% - 4px)',
                maxHeight: 'calc(100% - 16px)',
                display: 'flex',
              }}
            >
              <div
                style={{
                  margin: '8px 8px 0',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={x.image}
                  style={{
                    height: '116px',
                    borderRadius: '8px',
                  }}
                  alt={`An image of the workout '${x.name}'`}
                />
              </div>
            </div>
            <div
              style={useStyles(sansSerifFont, {
                width: '156px',
                height: '28px',
                lineHeight: '28px',
                fontSize: '0.82rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              })}
            >
              {x.name.toLocaleUpperCase()}
            </div>
          </div>
        </ButtonBase>
      ))}
    </div>
  );
};

interface SearchProps {
  label: string;
  setDialog: any;
  setSelected: any;
}

const WorkoutSearch: FunctionComponent<SearchProps> = ({ label, setDialog, setSelected }) => {
  const [active, setActive] = useState(false);
  const [s, setS] = useState('');
  const [staticInfo] = useGlobalState('static');
  const [workout] = useGlobalState('workout');
  const workouts = Object.keys(staticInfo.workoutInfo)
    .filter((name) => [staticInfo.workoutInfo[name].type.name, 'custom'].includes(workout.type))
    .filter(
      (name) =>
        !Object.keys(staticInfo.others.painInfo)
          .filter((bodyPart) => (workout.pain as any)[bodyPart] as boolean)
          .map((bodyPart) => staticInfo.others.painInfo[bodyPart])
          .reduce((a, b) => [...a, ...b], [])
          .filter((name) => !workout.unbannedWorkouts.includes(name))
          .includes(name),
    )
    .map((name) => ({
      name,
      ...staticInfo.workoutInfo[name],
    }));
  const fuse = new Fuse(workouts, { keys: ['name'], threshold: 0.5 });
  const filteredWorkouts = s ? fuse.search(s) : workouts;
  return (
    <>
      <div
        className={`search-container${active ? ' active' : ''}`}
        id={`search-container-${searchId}`}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            position: 'relative',
          }}
        >
          <label htmlFor={`search-${searchId}`}>{label}</label>
          <input
            value={s}
            type="text"
            id={`search-${searchId}`}
            onChange={(e) => {
              setS(e.target.value);
            }}
            autoFocus
            style={useStyles(sansSerifFont, {
              border: 'none',
              padding: '1rem .5rem .2rem .5rem',
              fontSize: '1.1rem',
              borderRadius: '4px',
              width: '300px',
              maxWidth: 'calc(100vw - 3rem)',
              marginBottom: '.4rem',
            })}
            onFocus={() => {
              setActive(true);
            }}
            onBlur={(e) => {
              if (!e.target.value) setActive(false);
            }}
          />
        </div>
      </div>
      <WorkoutAlbum workouts={filteredWorkouts} setDialog={setDialog} setSelected={setSelected} />
    </>
  );
};

interface DialogProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
}
interface Props extends RouteComponentProps {}

const AddWorkout: FunctionComponent<Props> = ({ history, location }) => {
  const initialState = {
    name: '',
    reps: 15,
    sets: 4,
    time: 100,
    hidden: false,
  };
  const [, setSelected] = useState<WorkoutPlan>(initialState);
  const [dialog, s] = useState<DialogProps>({
    show: false,
    title: '',
    children: (
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <Slider
          title="Replications"
          integer
          onChange={(reps) => {
            setSelected((ss: WorkoutPlan) => ({
              ...ss,
              reps,
            }));
          }}
          min={5}
          defaultVal={initialState.reps}
          max={20}
        />
        <Slider
          integer
          onChange={(sets) => {
            setSelected((ss: WorkoutPlan) => ({
              ...ss,
              sets,
            }));
          }}
          title="Sets"
          min={1}
          defaultVal={initialState.sets}
          max={10}
        />
        <Slider
          integer
          onChange={(time) => {
            setSelected((ss: WorkoutPlan) => ({
              ...ss,
              time,
            }));
          }}
          title="Time Per Set"
          min={30}
          defaultVal={initialState.time}
          max={160}
          gap={5}
          unit="seconds"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 'calc(100% + 1.6rem)',
            marginLeft: '-0.8rem',
            marginBottom: '-0.7rem',
          }}
        >
          <div>
            <DialogTextButton
              text="cancel"
              onClick={() => {
                setDialog({ show: false });
              }}
            />
          </div>
          <div>
            <DialogTextButton
              text="add"
              bold
              onClick={() => {
                setSelected((ss: WorkoutPlan) => {
                  addWorkout(ss);
                  return ss;
                });
                setDialog({ show: false });
                history.goBack();
              }}
            />
          </div>
        </div>
      </div>
    ) as React.ReactNode,
  });
  const setDialog = (newDialog: Partial<DialogProps>) => {
    s((d) => ({
      ...d,
      ...newDialog,
    }));
  };

  return (
    <Route
      path="/workout/edit/add"
      location={{
        ...location,
        pathname: untilNthIndex(location.pathname, '/', 4),
      }}
      render={() => (
        <div className="pop-content">
          <Prompt
            when={dialog.show}
            message={(location) => {
              if (location.pathname === '/workout/edit') {
                setDialog({
                  show: false,
                });
                return false;
              }
              return true;
            }}
          />
          <div className="content" style={{ backgroundColor: COLOR_BACKGROUND }}>
            <h1 className="heading">
              <BackButton onClick={history.goBack} />
              <span>Add Workout</span>
            </h1>
            <WorkoutSearch label="Search Workout" setDialog={setDialog} setSelected={setSelected} />
          </div>
          <Dialog
            show={dialog.show}
            title={dialog.title}
            onClose={() =>
              setDialog({
                show: false,
              })
            }
          >
            {dialog.children}
          </Dialog>
        </div>
      )}
    />
  );
};

export default withRouter(AddWorkout);
