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
        await rapidManager.publishAndSubscribe('job-ouput', 'job-ouput-response', res.locals.sessionID, {
          id: req.params.id,
        }, resp => {

          if (resp) {
            ret.error = false;
            ret.data = resp.data;
          }

          res.send(ret);
        }, res.locals.userId);
      }
    };
  };
