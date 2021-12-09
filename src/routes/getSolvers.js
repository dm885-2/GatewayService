export default function (rapidManager) {
  return {
    type: 'get',
    path: '/solvers',
    auth: true,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('list-solvers', 'list-solvers-response', res.locals.sessionID, {}, resp => {
        if (resp && resp.solvers) {
          ret = resp.solvers;
        }

        res.send(ret);
      });
    }
  };
};
