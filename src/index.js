import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/index.scss';
import './Style/picker.scss';
import './Style/navigation.scss';
import './Style/gauge.scss';
import * as firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyDDH1lVGR8BUl_GJ3LdH9XzpjXPRvcFpvo",
    authDomain: "provotype2.firebaseapp.com",
    databaseURL: "https://provotype2.firebaseio.com",
    projectId: "provotype2",
    storageBucket: "provotype2.appspot.com",
    messagingSenderId: "748907022808",
    appId: "1:748907022808:web:9a7b80c26d4469e0890aad"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />
,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();