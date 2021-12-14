export default function (rapidManager) {
    return {
      type: 'get',
      path: '/jobs',
      auth: true,
      minRequiredRank: 0,
      callback: async (req, res) => {
        let ret = {
          error: true,
        };
        await rapidManager.publishAndSubscribe('job-history', 'job-history-response', res.locals.sessionID, {
          userID: res.locals.userId,
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
