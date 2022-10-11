const admin = require('firebase-admin')
const serviceAccount=require('../../react-crud-3660f-firebase-adminsdk-jru6a-e32e981e56.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'your-database-url-here'
});

module.exports.admin = admin.messaging();