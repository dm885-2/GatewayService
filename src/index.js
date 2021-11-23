import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {host, port} from './helpers.js';
import RapidManager from './rapid/RapidManager.js';
import routes from './routes/index.js';
import uid from 'uid-safe';


// Setup rapid river.
const rapidManager = new RapidManager(host);

const index = express();

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({extended: false}));
index.use(cookieParser());

// Session ID middleware.
// Create new session ID and put it in a HTTP Only Cookie if no session ID exists yet.
index.use(async (req, res, next) => {
  let token = req.cookies.session;
  if (!token) {
    token = await uid(18);
    res.cookie('session', token, {maxAge: 900000, httpOnly: true});
  }
  res.locals.sessionID = token;
  next();
});

// Auth middleware.
// Get the JWT token out of the authorization header if this header was included in the request.
index.use((req, res, next) => {
  let token = req.headers.Authorization;
  if (token && token.includes('Bearer ')) {
    res.locals.jwtToken = token.split('Bearer ')[1];
  }
  next();
});

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
  res.send(err.message);
});

index.listen(port);
console.log(`Listening on ${port}`);
