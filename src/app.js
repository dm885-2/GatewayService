import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {host, port} from './helpers.js';
import {RapidManager} from './rapid/RapidManager.js';


// Setup rapid river.
const rapidManager = new RapidManager(host);

// Load all different routers.
import indexRouterFunc from './routes/index.js';
const indexRouter = indexRouterFunc(rapidManager);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Define all different routers.
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
console.log(`Listening on ${port}`);
