importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

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
