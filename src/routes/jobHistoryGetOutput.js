export default function (rapidManager) {
    return {
      type: 'get',
      path: '/jobs/:id',
      auth: true,
      minRequiredRank: 0,
      callback: async (req, res) => {
        let ret = {
          error: true,
        };
        await rapidManager.publishAndSubscribe('job-output', 'job-output-response', res.locals.sessionID, {
          id: req.params.id,
        }, resp => {

          if (resp && resp.data) {
            ret.error = false;
            ret.data = resp.data;
          }

          res.send(ret);
        }, res.locals.userId);
      }
    };
  };
