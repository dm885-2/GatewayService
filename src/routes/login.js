export default function (rapidManager) {
  return {
    type: 'post',
    path: '/auth/login',
    auth: false,
    minRequiredRank: 0,
    callback: async (req, res) => {
      let ret = {
        error: true,
      };
      await rapidManager.publishAndSubscribe('signIn', 'signIn-response', res.locals.sessionID, {
        username: req.body.username ?? '',
        password: req.body.password ?? '',
      }, resp => {
        if (resp && resp.token) {
          ret.userRank = resp.rank;
          ret.refreshToken = resp.token;
          ret.error = false;
        }

        res.send(ret);
      }, res.locals.userId);
    }
  };
};
