import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';



const firebaseConfig = {
  apiKey: "AIzaSyAZSfBjohbv3-1SdaO91CSHCCNdsF7eI24",
  authDomain: "hobbies-579fb.firebaseapp.com",
  databaseURL: "https://hobbies-579fb.firebaseio.com",
  projectId: "hobbies-579fb",
  storageBucket: "hobbies-579fb.appspot.com",
  messagingSenderId: "861119962491",
  appId: "1:861119962491:web:dbc80138caf04d8e0ef1de",
  measurementId: "G-TS6TCGS04Y"
};

let appSet = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
//-console.log('data',appSet)
let db = appSet.database();
let auth = appSet.auth();

const hobbies = db.ref('hobbies/');

let provider = new firebase.auth.GoogleAuthProvider();

export { hobbies, auth, provider };
