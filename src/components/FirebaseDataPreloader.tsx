import React, { FunctionComponent } from 'react';
import Firebase, { FirebaseContext } from './Firebase';
import { useAsyncEffect, unique } from '../utils';
import { setWorkoutInfo, setWorkoutImage } from '../stores/static';

interface Props {
  firebase: Firebase;
}

const ConsumingFirebase: FunctionComponent<Props> = ({ firebase }) => {
  useAsyncEffect(async () => {
    let isSubscribed = true;

    const databaseResponse = await firebase.database.ref('staticInfo/workouts').once('value');
    const workoutData = databaseResponse.val() as { imagePath: string; name: string }[];
    setWorkoutInfo(workoutData);

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
          setWorkoutImage(list);
          console.log('data loaded!');
        }
      });
    return () => {
      isSubscribed = false;
    };
  }, []);

  return <></>;
};

const FirebaseDataPreloader: FunctionComponent = () => {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <ConsumingFirebase firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
};

export default FirebaseDataPreloader;

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = [].slice.call(new Uint8Array(buffer)) as number[];
  return btoa(bytes.map((b) => String.fromCharCode(b)).reduce((a, b) => a + b));
}
