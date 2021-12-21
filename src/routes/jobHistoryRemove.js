export default function (rapidManager) {
    return {
      type: 'DELETE',
      path: '/jobs/:id',
      auth: true,
      minRequiredRank: 0,
      callback: async (req, res) => {
        await rapidManager.publishAndSubscribe('remove-job', 'remove-job-response', res.locals.sessionID, {
            id: req.params.id,
        }, resp => {
          res.send({
            error: !(resp && !resp.error)
          });
        }, res.locals.userId);
      }
    };
  };
