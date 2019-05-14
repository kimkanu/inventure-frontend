import React, { FunctionComponent } from 'react';
import Firebase, { FirebaseContext } from './Firebase';
import { useAsyncEffect, unique } from '../utils';
import { setWorkoutInfo, setWorkoutImage, setStaticImages, setPainInfo } from '../stores/static';
import { toggleLoading, LoadingData } from '../stores/loading';
import { BodyPart } from '../stores/workout';

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
          try {
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
            const base64Flag = (() => {
              switch (true) {
                case imagePath.endsWith('.jpg'):
                case imagePath.endsWith('.jpeg'):
                  return 'data:image/jpeg;base64,';
                case imagePath.endsWith('.gif'):
                  return 'data:image/gif;base64,';
                case imagePath.endsWith('.png'):
                  return 'data:image/png;base64,';
                case imagePath.endsWith('.svg'):
                  return 'data:image/svg+xml;base64,';
                default:
                  return '';
              }
            })();
            const imageStr = arrayBufferToBase64(buffer);
            const base64Image = base64Flag + imageStr;
            localStorage.setItem(`workoutInfo/${imagePath}`, base64Image);
            return { name, image: base64Image };
          } catch (e) {
            console.error(e);
            return { name };
          }
        })
        .map((x) => x()),
    )
      .then((list) => unique(list, (x, y) => x.name === y.name))
      .then((list) => {
        if (isSubscribed) {
          console.log('workout info loaded');
          setWorkoutImage(list);
          toggleLoading(LoadingData.WorkoutInfo);
        }
      });
    return () => {
      isSubscribed = false;
    };
  }, []);

  useAsyncEffect(async () => {
    let isSubscribed = true;

    const databaseResponse = await firebase.database.ref('staticInfo/images').once('value');
    const imageData = databaseResponse.val() as { name: string; imagePath: string }[];
    setStaticImages(imageData);

    Promise.all(
      imageData
        .map(({ imagePath, name }) => async () => {
          try {
            const local = localStorage.getItem(`images/${imagePath}`);
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
            const base64Flag = (() => {
              switch (true) {
                case imagePath.endsWith('.jpg'):
                case imagePath.endsWith('.jpeg'):
                  return 'data:image/jpeg;base64,';
                case imagePath.endsWith('.gif'):
                  return 'data:image/gif;base64,';
                case imagePath.endsWith('.png'):
                  return 'data:image/png;base64,';
                case imagePath.endsWith('.svg'):
                  return 'data:image/svg+xml;base64,';
                default:
                  return '';
              }
            })();
            const imageStr = arrayBufferToBase64(buffer);
            const base64Image = base64Flag + imageStr;
            localStorage.setItem(`images/${imagePath}`, base64Image);
            return { name, image: base64Image };
          } catch (e) {
            console.error(e);
            return { name };
          }
        })
        .map((x) => x()),
    )
      .then((list) => unique(list, (x, y) => x.name === y.name))
      .then((list) => {
        if (isSubscribed) {
          console.log('static images loaded');
          setStaticImages(list);
          toggleLoading(LoadingData.Images);
        }
      });
    return () => {
      isSubscribed = false;
    };
  }, []);

  useAsyncEffect(async () => {
    const databaseResponse = await firebase.database.ref('staticInfo/painInfo').once('value');
    const painInfo = databaseResponse.val() as { [bodyPart in BodyPart]: string[] };
    setPainInfo(painInfo);
    console.log('pain info loaded');
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
