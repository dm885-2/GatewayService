export default function (rapidManager) {
    return {
      type: 'get',
      path: '/logs',
      auth: true,
      callback: async (req, res) => {
        let ret = {
          error: true,
        };
        await rapidManager.publishAndSubscribe('job-getLogs', 'getLogs-response', res.locals.sessionID, {}, resp => { 
          if (resp) {
            ret.error = false;
            ret.data = resp.data;
          }
  
          res.send(ret);
        }, res.locals.userId);
      }
    };
  };
  
