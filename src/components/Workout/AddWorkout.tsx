import React, { Component, FunctionComponent, useEffect, useState } from 'react';
import BackButton from '../Buttons/BackButton';
import Firebase, { FirebaseContext } from '../Firebase';
import { COLOR_BACKGROUND } from '../../colors';
import { useGlobalState } from '../../stores';
import { Link, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { useAsyncEffect, unique, untilNthIndex } from '../../utils';
import { History, Location } from 'history';
import { ButtonBase } from '@material-ui/core';
import { setNameToImagePath, setNameToImage } from '../../stores/static';
import Dialog from '../Dialog';
import DialogTextButton from '../Dialog/DialogTextButton';

interface Props {
  firebase: Firebase;
  location: Location;
  history: History;
}

interface WorkoutImageName {
  name: string;
  image: string;
}
interface AlbumProps {
  workouts: WorkoutImageName[];
  setDialog: any;
}

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

const AddWorkoutConsumingFirebase: FunctionComponent<Props> = ({ firebase, location, history }) => {
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
    if (newDialog.show && !dialog.show) history.push('/workout/edit/add/c');
    s({
      ...dialog,
      ...newDialog,
    });
  };

  useAsyncEffect(async () => {
    let isSubscribed = true;

    const databaseResponse = await firebase.database.ref('staticInfo/workouts').once('value');
    const workoutData = databaseResponse.val() as { imagePath: string; name: string }[];

    Promise.all(
      workoutData
        .map(({ imagePath, name }) => async () => {
          {
            const local = localStorage.getItem(`workoutInfo/${imagePath}`);
            if (local) {
              return { name, image: local };
            }
            const url = await firebase.storage.ref(imagePath).getDownloadURL();
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                origin: '*',
              },
            });

            const buffer = await response.arrayBuffer();
            const base64Flag = 'data:image/png;base64,';
            const imageStr = arrayBufferToBase64(buffer);
            const base64Image = base64Flag + imageStr;
            localStorage.setItem(`workoutInfo/${imagePath}`, base64Image);
            return { name, image: base64Image };
          }
        })
        .map((x) => x()),
    )
      .then((list) => unique(list, (x, y) => x.name === y.name))
      .then((list) => {
        if (isSubscribed) {
          setNameToImage(list);
        }
      });
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/workout/edit/add') setDialog({ show: false });
    else setDialog({ show: true });
    const origOnPopState = window.onpopstate;

    window.onpopstate = null;

    return () => {
      window.onpopstate = origOnPopState;
    };
  }, [location.pathname]);

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
                    <BackButton to={'/workout/edit'} />
                    <span>Add Workout</span>
                  </h1>
                  <WorkoutAlbum
                    workouts={staticInfo.workoutInfo.nameToImage}
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

interface P extends RouteComponentProps {}
const AddWorkout: FunctionComponent<P> = ({ history, location }) => {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <AddWorkoutConsumingFirebase location={location} history={history} firebase={firebase} />
      )}
    </FirebaseContext.Consumer>
  );
};

export default withRouter(AddWorkout);

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = [].slice.call(new Uint8Array(buffer)) as number[];
  return btoa(bytes.map((b) => String.fromCharCode(b)).reduce((a, b) => a + b));
}
