export default function (rapidManager) {
    return {
      type: 'GET',
      path: '/users/:id/clearQueue',
      auth: true,
      minRequiredRank: 1,
      callback: (req, res) => {
        let ret = {
          error: true,
        };
        rapidManager.publishAndSubscribe('job-history', 'job-history-response', res.locals.sessionID, {
          userID: req.params.id,
        }, resp => {
          resp.data.forEach(job => {
            if(job.status < 2)
            {
                rapidManager.publishAndSubscribe('remove-job', 'remove-job-response', res.locals.sessionID, {
                  id: job.id,
                }, () => {}, res.locals.userId);
            }
          });

          ret.error = false;
          ret.message = resp.data.length === 0 ? "No jobs in queue" : "Their queue has been cleared";
          res.send(ret);
        }, res.locals.userId);
      }
    };
  };

