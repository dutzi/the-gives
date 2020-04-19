import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';

if (localStorage.getItem('darkMode') === 'true') {
  const transition = document.body.style.transition;
  document.body.style.transition = '';
  document.body.classList.add('dark');
  setTimeout(() => {
    document.body.style.transition = transition;
  }, 1000);
}

const firebaseConfig = {
  apiKey: 'AIzaSyD_zeFl3CFzGL9pv2IBF3qvIYluwm_EWuI',
  authDomain: 'the-gives.firebaseapp.com',
  databaseURL: 'https://the-gives.firebaseio.com',
  projectId: 'the-gives',
  storageBucket: 'the-gives.appspot.com',
  messagingSenderId: '748685084660',
  appId: '1:748685084660:web:4b495da6af9f59b6b19ba1',
  measurementId: 'G-CWP3XMQF03',
};
// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {}
firebase.analytics();

if (process.env.NODE_ENV === 'development') {
  (window as any).firebase = firebase;
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
