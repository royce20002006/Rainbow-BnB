const express = require("express");
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { enviroment } = require('./config');
const isProduction = enviroment === 'production';

const app = express();

//morgan for logging requests and responses
app.use(morgan('dev'));

//parse cookies
app.use(cookieParser());

// parse json req bodies
app.use(express.json());

// cors middleware for dev
if (!isProduction) {
    app.use(cors());
};

// variety of headers to better secure
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
})
);

// set csurf token and create a token method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
);
//use routes
app.use(routes);


//export app
module.exports = app;