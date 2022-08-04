import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyBDK-kv2wdlDfauHScdAJM3GISbd_se1-o",
    authDomain: "react-crud-3660f.firebaseapp.com",
    projectId: "react-crud-3660f",
    storageBucket: "react-crud-3660f.appspot.com",
    messagingSenderId: "354245974343",
    appId: "1:354245974343:web:f97ceb5502a53726b0d462",
    measurementId: "G-8BHE3PT06K"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

// next block of code goes here

export const requestFirebaseNotificationPermission = () =>
    new Promise((resolve, reject) => {
        messaging
            .requestPermission()
            .then(() => messaging.getToken())
            .then((firebaseToken) => {
                resolve(firebaseToken);
            })
            .catch((err) => {
                reject(err);
            });
    });

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });