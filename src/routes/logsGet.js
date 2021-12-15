export default function (rapidManager) {
    return {
      type: 'get',
      path: '/logs',
      auth: true,
      minRequiredRank: 1,
      callback: async (req, res) => {
        let ret = {
          error: true,
        };
        await rapidManager.publishAndSubscribe('getLogs', 'getLogs-response', res.locals.sessionID, {}, resp => {
          if (resp) {
            ret.error = false;
            ret.data = resp.data;
          }

          res.send(ret);
        }, res.locals.userId);
      }
    };
  };

