import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const app = firebase.initializeApp({
  apiKey: "AIzaSyD5ZzlULWA5wUxpFKRgewzST3n2bioe6b0",
  authDomain: "eight-channel.firebaseapp.com",
  databaseURL: "https://eight-channel.firebaseio.com",
  messagingSenderId: "1048658842826",
  projectId: "eight-channel",
  storageBucket: "eight-channel.appspot.com",
});

export const auth = app.auth();
export const db = app.firestore();
db.settings({
  timestampsInSnapshots: true
});
