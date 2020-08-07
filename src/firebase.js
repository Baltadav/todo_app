import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCmUWcOnkuCBAI2YXmQZ0F6B8jQUt2hnIg",
    authDomain: "todo-app-react-907a6.firebaseapp.com",
    databaseURL: "https://todo-app-react-907a6.firebaseio.com",
    projectId: "todo-app-react-907a6",
    storageBucket: "todo-app-react-907a6.appspot.com",
    messagingSenderId: "926157781085",
    appId: "1:926157781085:web:07c72a95b281bf1113f5b4",
    measurementId: "G-E5JQVP6MFQ"
});

const db = firebaseApp.firestore();

export default db;