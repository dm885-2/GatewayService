export default function (rapidManager) {
  return {
    type: 'delete',
    path: '/users/:id',
    auth: true,
    minRequiredRank: 1,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('delete-user', 'delete-user-response', res.locals.sessionID, {
        id: req.params.id
      }, resp => {
        if (resp) {
          ret.error = resp.error;
        }

        res.send(ret);
      }, res.locals.userId);
    }
  };
};
