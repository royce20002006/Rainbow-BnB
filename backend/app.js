const express = require("express");
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const { enviroment } = require('./config');
const isProduction = enviroment === 'production';



const app = express();

//morgan for logging requests and responses
app.use(morgan('dev'));

//parse cookiesssss
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

//not found handling middleware
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

//error handling middleware

//process sequelize validation errors
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

// error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);

    if (isProduction) {
        res.json({
            message: err.message,
            errors: err.errors
        })
    } else {
        res.json({
            title: isProduction ? null : err.title || 'Server Error',
            message: err.message,
            errors: err.errors,
            stack: isProduction ? null : err.stack
        });

    }
});


//export app
module.exports = app;