export default function (rapidManager) {
  return {
    type: 'get',
    path: '/solvers',
    auth: true,
    minRequiredRank: 0,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('list-solvers', 'list-solvers-response', res.locals.sessionID, {}, resp => {
        if (resp && resp.solvers) {
          ret.error = false;
          ret.data = resp.solvers;
        }

        res.send(ret);
      }, res.locals.userId);
    }
  };
};
