export default function (rapidManager) {
    return {
      type: 'post',
      path: '/jobs',
      auth: true,
      minRequiredRank: 0,
      callback: async (req, res) => {
        const d = req.body;
        await rapidManager.publishAndSubscribe('add-job', 'add-job-response', res.locals.sessionID, {
          userID: res.locals.userId,
          dataset: d.dataset,
          model: d.model,
          solvers: d.solvers,
        }, resp => {
          res.send({
            error: !(resp && !resp.error)
          });
        }, res.locals.userId);
      }
    };
  };
