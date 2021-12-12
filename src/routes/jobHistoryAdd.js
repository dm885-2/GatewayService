export default function (rapidManager) {
    return {
      type: 'post',
      path: '/jobs',
      auth: true,
      callback: async (req, res) => {
        const d = req.body;
        await rapidManager.publishAndSubscribe('add-job', 'add-job-response', res.locals.sessionID, {
          userID: res.locals.userId,
          solvers: d.solvers,
        }, resp => {
          res.send({
            error: !(resp && !resp.error)
          });
        }, res.locals.userId);
      }
    };
  };
  