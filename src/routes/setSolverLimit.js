export default function (rapidManager) {
    return {
      type: 'PUT',
      path: '/users/:id/resourceLimit/:amount',
      auth: true,
      minRequiredRank: 1,
      callback: async (req, res) => {
        let ret = {
          error: true,
        };
        await rapidManager.publishAndSubscribe('set-solver-limit', 'set-solver-limit-response', res.locals.sessionID, {
            id: req.params.id,
            value: req.params.amount,
        }, resp => {
          if (resp && !resp.error) {
            ret.error = false;
          }
          res.send(ret);
        }, res.locals.userId);
      }
    };
  };

