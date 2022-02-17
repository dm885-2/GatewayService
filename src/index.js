import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import uid from 'uid-safe';
import cors from 'cors';

const index = express();
index.use(cors());
index.options('*', cors())

import {getTokenData, host, port} from './helpers.js';
import RapidManager from './rapid/RapidManager.js';
import routes from './routes/index.js';


// Setup rapid river.
const rapidManager = new RapidManager(host);



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
  let token = req.headers.authorization;
  if (token && token.includes('Bearer ')) {
    res.locals.jwtToken = token.split('Bearer ')[1];
  }
  next();
});

// Define all different routers.
routes(rapidManager).forEach(route => index[route.type.toLowerCase()](route.path, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    res.send('Hello World!');
  }
  const tokenData = await getTokenData(res.locals.jwtToken);
  if (!route.auth || tokenData) {
    if (!route.auth || tokenData.rank >= route.minRequiredRank) {
      res.locals.userId = tokenData.uid ?? 0;
      await route.callback(req, res);
    } else {
      // User has insufficient rights for this route.
      res.status(403).send('Forbidden');
    }
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
