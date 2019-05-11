import React, { Component, FunctionComponent, useEffect, useState } from 'react';
import BackButton from '../Buttons/BackButton';
import Firebase, { FirebaseContext } from '../Firebase';
import { COLOR_BACKGROUND } from '../../colors';
import { useGlobalState } from '../../stores';
import { Link, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { useAsyncEffect, unique, untilNthIndex } from '../../utils';
import { ButtonBase } from '@material-ui/core';
import { setNameToImagePath, setNameToImage } from '../../stores/static';
import Dialog from '../Dialog';
import DialogTextButton from '../Dialog/DialogTextButton';

interface DialogProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
}
const AddWorkoutDialog: FunctionComponent<DialogProps> = (dialog) => {
  return (
    <Dialog show={dialog.show} title={dialog.title}>
      {dialog.children}
    </Dialog>
  );
};

interface WorkoutImageName {
  name: string;
  image: string;
}
interface AlbumProps {
  workouts: WorkoutImageName[];
  setDialog: any;
}
const WorkoutAlbum: FunctionComponent<AlbumProps> = ({ workouts, setDialog }) => {
  return (
    <div>
      {workouts.map((x, i) => (
        <ButtonBase
          onClick={() => {
            setDialog({ show: true });
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

const WorkoutSearch: FunctionComponent = () => {
  return (
    <div>
      <input type="text" onChange={(x) => console.log(x.target.value)} />
    </div>
  );
};
const workoutFilter = (x: any) => true;

interface Props extends RouteComponentProps {}
const AddWorkout: FunctionComponent<Props> = ({ history, location }) => {
  const [staticInfo] = useGlobalState('static');

  const [dialog, s] = useState<DialogProps>({
    show: false,
    title: 'Discard changes?',
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
                console.log('button2');
              }}
            />
            <DialogTextButton
              text="save"
              bold
              onClick={() => {
                console.log('button3');
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
            component={() => (
              <div className="pop-content">
                <div className="content" style={{ backgroundColor: COLOR_BACKGROUND }}>
                  <h1 className="heading">
                    <BackButton onClick={history.goBack} />
                    <span>Add Workout</span>
                  </h1>
                  <WorkoutSearch />
                  <WorkoutAlbum
                    workouts={staticInfo.workoutInfo.nameToImage.filter(workoutFilter)}
                    setDialog={setDialog}
                  />
                  <AddWorkoutDialog show={dialog.show} title={dialog.title}>
                    {dialog.children}
                  </AddWorkoutDialog>
                </div>
              </div>
            )}
          />
        </div>
      )}
    />
  );
};

export default withRouter(AddWorkout);
