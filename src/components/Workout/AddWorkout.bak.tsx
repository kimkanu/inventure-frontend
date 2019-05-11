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
import { Link, Route, RouteComponentProps, withRouter, Prompt } from 'react-router-dom';
import { untilNthIndex, randomString } from '../../utils';
import { ButtonBase } from '@material-ui/core';
import Dialog from '../Dialog';
import DialogTextButton from '../Dialog/DialogTextButton';
import { useStyles, shadow, sansSerifFont } from '../../styles';
import { WorkoutInfo } from '../../stores/static';
import { updateSearchInput } from '../../stores/workout';
import Fuse from 'fuse.js';

const id = randomString(8);

interface WorkoutImageName {
  name: string;
  image: string;
}
interface AlbumProps {
  workouts: ({ name: string } & WorkoutInfo)[];
  setDialog: any;
}

const WorkoutAlbum: FunctionComponent<AlbumProps> = ({ workouts, setDialog }) => {
  const setWorkout = (x: WorkoutImageName) => {};
  return (
    <div>
      {workouts.map((x, i) => (
        <ButtonBase
          onClick={() => {
            updateSearchInput((document.getElementById(`search-${id}`) as HTMLInputElement).value);
            setDialog({ show: true, title: x.name });
          }}
          key={i}
        >
          <div
            style={{
              width: '156px',
              height: '156px',
              background: 'linear-gradient(#fff,#ccc)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span>{x.name}</span>
            <img
              src={x.image}
              style={{
                width: '128px',
                height: '128px',
              }}
            />
          </div>
        </ButtonBase>
      ))}
    </div>
  );
};

interface SearchProps {
  label: string;
  setDialog: any;
}

const WorkoutSearch: FunctionComponent<SearchProps> = ({ label, setDialog }) => {
  const [active, setActive] = useState(!!useGlobalState('workout')[0].searchInput);
  const [s, setS] = useState(useGlobalState('workout')[0].searchInput);
  const [staticInfo] = useGlobalState('static');
  const workouts = Object.keys(staticInfo.workoutInfo).map((name) => ({
    name,
    ...staticInfo.workoutInfo[name],
  }));
  const fuse = new Fuse(workouts, { keys: ['name'] });
  const filteredWorkouts = s ? fuse.search(s) : workouts;
  return (
    <>
      <div className={`search-container${active ? ' active' : ''}`} id={`search-container-${id}`}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            position: 'relative',
          }}
        >
          <label htmlFor={`search-${id}`}>{label}</label>
          <input
            value={s}
            type="text"
            id={`search-${id}`}
            style={useStyles(sansSerifFont, {
              border: 'none',
              padding: '1rem .5rem .2rem .5rem',
              fontSize: '1.1rem',
              borderRadius: '4px',
              width: '300px',
              maxWidth: 'calc(100vw - 3rem)',
              marginBottom: '.4rem',
            })}
          />
        </div>
      </div>
      <WorkoutAlbum workouts={filteredWorkouts} setDialog={setDialog} />
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
  const [dialog, s] = useState<DialogProps>({
    show: false,
    title: '',
    children: (
      <>
        <p>There are unsaved changes. Do you want to save them?</p>
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
              text="discard"
              onClick={() => {
                console.log('button1');
              }}
            />
          </div>
          <div>
            <DialogTextButton
              text="cancel"
              onClick={() => {
                setDialog({ show: false });
              }}
            />
            <DialogTextButton
              text="save"
              bold
              onClick={() => {
                setDialog({ show: false });
                history.goBack();
              }}
            />
          </div>
        </div>
      </>
    ) as React.ReactNode,
  });
  const setDialog = (newDialog: Partial<DialogProps>) => {
    s({
      ...dialog,
      ...newDialog,
    });
  };

  return (
    <Route
      location={{
        ...location,
        pathname: untilNthIndex(location.pathname, '/', 4),
      }}
      render={() => (
        <div>
          <Route
            path="/workout/edit/add"
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
                  <WorkoutSearch label="Search" setDialog={setDialog} />
                </div>
              </div>
            )}
          />
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
