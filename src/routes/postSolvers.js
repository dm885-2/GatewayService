export default function (rapidManager) {
  return {
    type: 'post',
    path: '/solvers',
    auth: true,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('add-solver', 'add-solver-response', res.locals.sessionID, {
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
