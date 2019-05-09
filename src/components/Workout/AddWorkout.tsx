/*
import React, { Component, FunctionComponent, useEffect } from 'react';
import BackButton from '../Buttons/BackButton';
import Firebase, { FirebaseContext } from '../Firebase';
import { COLOR_BACKGROUND } from '../../colors';
import { WorkoutImageName, useGlobalState, pushWorkoutStaticInfo } from '../../stores';
import { Link, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { untilNthIndex } from '../../utils';

interface Props {
  firebase: Firebase;
  download: boolean;
}

interface AlbumProps {
  workouts: WorkoutImageName[];
}
interface State extends AlbumProps {}

const WorkoutAlbum: FunctionComponent<AlbumProps> = ({ workouts }) => {
  return (
    <div>
      {workouts.map((x, i) => (
        <Link to={`/workout/edit/add/detail?name=${x.name}`} key={i}>
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
        </Link>
      ))}
    </div>
  );
};

function useAsyncEffect(effect: () => Promise<void | (() => void)>, dependencies?: any[]) {
  return useEffect(() => {
    const cleanupPromise = effect();
    return () => {
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, dependencies);
}

const AddWorkoutConsumingFirebase: FunctionComponent<Props> = ({ firebase, download }) => {
  useAsyncEffect(async () => {
    if (!download) return;
    const databaseResponse = await firebase.database.ref('staticInfo/workouts').once('value');
    const workoutData = databaseResponse.val() as { imageUrl: string; name: string }[];

    workoutData.forEach(({ imageUrl, name }) => {
      const local = localStorage.getItem(`staticInfo/${name}`);
      if (local) {
        pushWorkoutStaticInfo(JSON.parse(local));
      } else {
        firebase.storage
          .ref(imageUrl)
          .getDownloadURL()
          .then((url) => {
            fetch(url, {
              method: 'GET',
              headers: {
                origin: '*',
              },
            }).then((response) => {
              response.arrayBuffer().then((buffer) => {
                const base64Flag = 'data:image/png;base64,';
                const imageStr = arrayBufferToBase64(buffer);
                pushWorkoutStaticInfo({
                  name,
                  imageUrl: url,
                  image: base64Flag + imageStr,
                });
              });
            });
          });
      }
    });
  }, []);

  const { workouts } = useGlobalState('staticInfo')[0];
  return (
    <div className="pop-content">
      <div className="content" style={{ backgroundColor: COLOR_BACKGROUND }}>
        <h1 className="heading">
          <BackButton to={'/workout/edit'} />
          <span>Add Workout</span>
        </h1>
        <WorkoutAlbum workouts={workouts} />
      </div>
    </div>
  );
};

const AddWorkout: FunctionComponent = () => {
  const download = useGlobalState('staticInfo')[0].workouts.length === 0;
  return (
    <Route
      render={() => (
        <div>
          <Route
            path="/workout/edit/add"
            component={() => (
              <FirebaseContext.Consumer>
                {(firebase) => (
                  <AddWorkoutConsumingFirebase firebase={firebase} download={download} />
                )}
              </FirebaseContext.Consumer>
            )}
          />
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={untilNthIndex(location.pathname, '/', 5)}
                  timeout={{ enter: 400, exit: 400 }}
                  classNames={'content--pop-dialogue-transition'}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      zIndex: 999999,
                    }}
                  >
                    <Route
                      location={location}
                      path="/workout/edit/add/detail"
                      component={() => (
                        <div className="pop-dialogue">
                          <div className="content" />
                        </div>
                      )}
                    />
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </div>
      )}
    />
  );
};

export default AddWorkout;

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = [].slice.call(new Uint8Array(buffer)) as number[];
  return btoa(bytes.map((b) => String.fromCharCode(b)).reduce((a, b) => a + b));
}

*/

export const a = 3;
