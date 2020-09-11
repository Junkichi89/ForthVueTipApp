import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
// import store from './store';

const config = {
  apiKey: "AIzaSyClFOEbhzqOu63tS9RN-ifXSS-UYBUqVd8",
  authDomain: "throwing-penny.firebaseapp.com",
  databaseURL: "https://throwing-penny.firebaseio.com",
  projectId: "throwing-penny",
  storageBucket: "throwing-penny.appspot.com",
  messagingSenderId: "1095294566337",
  appId: "1:1095294566337:web:646ab2e859c3fd60f67940"
};



export default {
  init() {
    firebase.initializeApp(config);
  },
  }