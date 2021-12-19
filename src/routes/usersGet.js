export default function (rapidManager) {
    return {
      type: 'GET',
      path: '/users',
      auth: true,
      minRequiredRank: 1,
      callback: async (req, res) => {
        let ret = {
          error: true,
        };
        await rapidManager.publishAndSubscribe('getUsers', 'getUsers-response', res.locals.sessionID, {}, resp => {
          if (resp) {
            ret.error = false;
            ret.data = resp.data;
          }

          res.send(ret);
        }, res.locals.userId);
      }
    };
  };

