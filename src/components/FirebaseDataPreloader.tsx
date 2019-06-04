import React, { FunctionComponent, useEffect } from 'react';
import Firebase, { FirebaseContext } from './Firebase';
import to, { useAsyncEffect, unique } from '../utils';
import { setWorkoutInfo, setWorkoutImage, setStaticImages, setOthersInfo } from '../stores/static';
import { toggleLoading, LoadingData } from '../stores/loading';
import { BodyPart } from '../stores/workout';
import { useGlobalState } from '../stores';
import { calculateLevel, UserProps, saveUsers } from '../stores/auth';

interface Props {
  firebase: Firebase;
}

const ConsumingFirebase: FunctionComponent<Props> = ({ firebase }) => {
  const [staticInfo] = useGlobalState('static');
  const [auth] = useGlobalState('auth');
  const [loading] = useGlobalState('loading');

  useAsyncEffect(async () => {
    let isSubscribed = true;

    const databaseResponse = await firebase.database.ref('staticInfo/workouts').once('value');
    const workoutData = databaseResponse.val() as {
      imagePath: string;
      name: string;
      type: { name: string };
      youtube: string;
      instruction?: string;
    }[];
    console.log(workoutData);
    setWorkoutInfo(workoutData);

    setWorkoutImage(
      Object.keys({ ...localStorage })
        .filter((s) => s.startsWith('workoutInfo/'))
        .map((localStorageKey) => {
          return {
            name: localStorageKey
              .replace('workoutInfo/', '')
              .replace(/\-/g, ' ')
              .replace('.png', ''),
            image: localStorage.getItem(localStorageKey) || undefined,
          };
        }),
    );

    Promise.all(
      workoutData
        .map(({ imagePath, name, youtube }) => async () => {
          try {
            const local = localStorage.getItem(`workoutInfo/${imagePath}`);
            if (local) {
              return { name, youtube, image: local };
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
            return { name, youtube, image: base64Image };
          } catch (e) {
            console.error(e);
            return { name, youtube };
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
    let isSubscribed = true;
    const databaseResponse = await firebase.database.ref('staticInfo/others').once('value');
    const others = databaseResponse.val();
    if (isSubscribed) setOthersInfo(others);
    console.log('others info loaded');
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    console.log('level', (staticInfo.others.levels || []).length);
    if (staticInfo.others.levels) {
      calculateLevel({ staticInfo, points: auth.points });
    }
  }, [(staticInfo.others.levels || []).length, auth.points, loading[LoadingData.UsersInfo]]);

  useAsyncEffect(async () => {
    let isSubscribed = true;
    const response = await firebase.database.ref('/users').once('value');
    const responseVal = response.val() as {
      [id: string]: UserProps;
    };

    Promise.all(
      Object.keys(responseVal)
        .map((id) => async () => {
          const [, downloadURL] = await to(
            firebase.storage.ref(responseVal[id].profileImagePath).getDownloadURL(),
          );
          return [id, downloadURL || undefined] as [string, string | undefined];
        })
        .map((x) => x()),
    )
      .then((list) =>
        list.map(([id, profileImagePath]) => ({
          id,
          ...responseVal[id],
          profileImagePath,
        })),
      )
      .then((usersArray) => {
        if (isSubscribed) {
          saveUsers(usersArray);
          toggleLoading(LoadingData.UsersInfo);
          console.log('users info loaded');
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
