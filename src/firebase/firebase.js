/*
firebase.js: The file where all the configuration goes that you 
have seen previously on your Firebase dashboard. In addition, 
Firebase itself will be instantiated in this file.

Can run two projects on firebase one for production one for live
would just need two configs and initialise based on NODE_ENV
*/

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import * as keys from '../constants/firebaseKeys';

// import our project keys and assign them

const config = {
  apiKey: keys.API_KEY,
  authDomain: keys.AUTH_DOMAIN,
  databaseURL: keys.DATABASE_URL,
  projectId: keys.PROJECT_ID,
  storageBucket: keys.STORAGE_BUCKET,
  messagingSenderId: keys.MESSAGING_SENDER_ID,
}

// initialise firebase if it isn't already initialised.

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// initialise auth object from firebase
const db = firebase.firestore();
const auth = firebase.auth();

export {
    db,
    auth,
};