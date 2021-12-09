export default function (rapidManager) {
  return {
    type: 'delete',
    path: '/solvers/:id',
    auth: true,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('delete-solver', 'delete-solver-response', res.locals.sessionID, {
        solverId: req.params.id
      }, resp => {
        if (resp) {
          ret.error = resp.error;
        }

        res.send(ret);
      });
    }
  };
};
