import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
    apiKey: process.env.REACT_APP_YOUR_API_KEY,
    authDomain: process.env.REACT_APP_YOUR_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_YOUR_PROJECT_ID,
    storageBucket: process.env.REACT_APP_YOUR_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_YOUR_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_YOUR_APP_ID,
    measurementId: process.env.REACT_APP_YOUR_MEASUREMENT_ID
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