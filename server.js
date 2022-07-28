const express = require('express');
const bodyParser= require('body-parser');
const morgan= require('morgan');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const fileupload = require("express-fileupload");
const app = express();
const server = require('http').Server(app);     //always require on top
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const socketHelper=require('./app/helpers/socketHelper')

// Static Files (we dont need to write public word in the links)
app.use(express.static('public'));

//set listener
const port = process.env.API_PORT;
server.listen(port, () => { console.log(`App running on port ${port}`) });

let interval;
io.on('connection', socket => {
    console.log(`socket is connected`)

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    });

    if (interval) {
        clearInterval(interval);
    }

    interval= setInterval(async () =>{
        const data= await socketHelper.tickers()

        io.emit('crypto-prices', data)
        console.log('emitted from server!')
    }, 5000)
});

//set in all files
app.set('io', io);

//DB connection
require('./config/db');

//morgan (it is middleware that saves request logs. For development mode. see on console it will show http requests)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

/*Security Headers*/
app.use(helmet())
/*Resource Sharing*/
app.use(cors())
/*JSON Input Handling*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*file uploading*/
app.use(fileupload())

// import the routes
app.use('/api', require('./app/routes'));

module.exports = app