const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const fileUpload = require('express-fileupload');

const cors = require('cors');
// const passport = require('passport');
const httpStatus = require('http-status');

const file_route = require('./routes/file_route');



// const config = require('./config/config');
// const morgan = require('./config/morgan');
// const { authLimiter } = require('./middlewares/rateLimiter');
// const routes = require('./routes/v1');
// const { errorConverter, errorHandler } = require('./middlewares/error');
// const ApiError = require('./utils/ApiError');

const app = express();


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(fileUpload());

app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());



app.get('/', (req, res) => {
    res.send('chill bro');
});

app.use('/file', file_route);


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);

module.exports = app;