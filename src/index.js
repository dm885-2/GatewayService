import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {host, port} from './helpers.js';
import RapidManager from './rapid/RapidManager.js';
import routes from './routes/index.js';


// Setup rapid river.
const rapidManager = new RapidManager(host);

const index = express();

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({extended: false}));
index.use(cookieParser());

// Define all different routers.
routes(rapidManager).forEach(route => index[route.type](route.path, async (req, res) => {
  if (!route.auth) {
    route.callback(req, res);
  } else {
    // Route requires authentication but user is not authenticated.
    res.status(401).send('Unauthorized');
  }
}));

// catch 404 and forward to error handler
index.use(function (req, res, next) {
  next(createError(404));
});

// error handler
index.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

index.listen(port);
console.log(`Listening on ${port}`);
