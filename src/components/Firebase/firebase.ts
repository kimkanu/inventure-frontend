import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
class Firebase {
  database: firebase.database.Database;
  storage: firebase.storage.Storage;

  constructor() {
    firebase.initializeApp(config);
    this.database = firebase.database();
    this.storage = firebase.storage();
  }
}

export default Firebase;
