// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAbiIBs16w1xT-7jnepaN2DvWu2t_6E7yg",
  authDomain: "tic-tac-toe-88718.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-88718-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-88718",
  storageBucket: "tic-tac-toe-88718.appspot.com",
  messagingSenderId: "340009264879",
  appId: "1:340009264879:web:736ffd492e69b550f9dd1a",
  measurementId: "G-P9FD1WCHF3"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Initialize Realtime Database
const database = getDatabase(app);

export { auth, database };
