import express from 'express';
const router = express.Router();


export default function (rapidManager) {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
  });

  router.post('/test/:event', function (req, response, next) {
    rapidManager.publishAndSubscribe(req.params.event, `${req.params.event}-callback`, 10, req.body, result => {
      response.send(`respond with a resource: ${JSON.stringify(result)}`);
    });
  });

  return router;
};
