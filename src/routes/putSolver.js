export default function (rapidManager) {
  return {
    type: 'put',
    path: '/solvers/:id',
    auth: true,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('update-solver', 'update-solver-response', res.locals.sessionID, {
        solverId: req.params.id,
        name: req.body.name,
        docker_image: req.body.docker_image
      }, resp => {
        if (resp) {
          ret.error = resp.error;
        }

        res.send(ret);
      });
    }
  };
};
