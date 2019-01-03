import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7SZebiey7zn_qRM45ot3p-OM9u8fUIQY",
  authDomain: "h2growsystem.firebaseapp.com",
  databaseURL: "https://h2growsystem.firebaseio.com",
  projectId: "h2growsystem",
  storageBucket: "h2growsystem.appspot.com",
  messagingSenderId: "1094600036265"
};
firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({timestampsInSnapshots: true});

export default db;