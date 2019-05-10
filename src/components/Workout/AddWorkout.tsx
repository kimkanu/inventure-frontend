import React, { Component, FunctionComponent, useEffect, useState } from 'react';
import BackButton from '../Buttons/BackButton';
import Firebase, { FirebaseContext } from '../Firebase';
import { COLOR_BACKGROUND } from '../../colors';
import { useGlobalState } from '../../stores';
import { Link, Route } from 'react-router-dom';
import { useAsyncEffect, unique } from '../../utils';

interface Props {
  firebase: Firebase;
}

interface WorkoutImageName {
  name: string;
  image: string;
}
interface AlbumProps {
  workouts: WorkoutImageName[];
}

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

const AddWorkoutConsumingFirebase: FunctionComponent<Props> = ({ firebase }) => {
  const [workoutList, setWorkoutList] = useState([] as { image: string; name: string }[]);

  useAsyncEffect(async () => {
    let isSubscribed = true;

    if (location.pathname !== '/workout/edit/add') return;

    const databaseResponse = await firebase.database.ref('staticInfo/workouts').once('value');
    const workoutData = databaseResponse.val() as { imagePath: string; name: string }[];

    const a = Promise.all(
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
        if (isSubscribed) setWorkoutList(list);
      });
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <div className="pop-content">
      <div className="content" style={{ backgroundColor: COLOR_BACKGROUND }}>
        <h1 className="heading">
          <BackButton to={'/workout/edit'} />
          <span>Add Workout</span>
        </h1>
        <WorkoutAlbum workouts={workoutList} />
      </div>
    </div>
  );
};

const AddWorkout: FunctionComponent = () => {
  return (
    <Route
      render={() => (
        <div>
          <Route
            path="/workout/edit/add"
            component={() => (
              <FirebaseContext.Consumer>
                {(firebase) => <AddWorkoutConsumingFirebase firebase={firebase} />}
              </FirebaseContext.Consumer>
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
