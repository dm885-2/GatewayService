export default function (rapidManager) {
  return {
    type: 'post',
    path: '/wildcard/:event',
    auth: false,
    callback: (req, response) => {
      rapidManager.publishAndSubscribe(req.params.event, `${req.params.event}-callback`, response.locals.sessionID, req.body, result => {
        response.send(`respond with a resource: ${JSON.stringify(result)}`);
      });
    }
  };
}
