importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

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

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/firebase-logo.png'
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', event => {
    console.log(event)
    return event;
});
