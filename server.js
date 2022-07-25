const express = require('express');
const bodyParser= require('body-parser');
const morgan= require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const fileupload = require("express-fileupload");
const app = express();

// Static Files (we dont need to write public word in the links)
app.use(express.static('public'));

//set listener
dotenv.config();
const port = process.env.API_PORT;
app.listen(port, () => { console.log(`App running on port ${port}`) });

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